const fs = require('fs')
const path = require('path')
const qiniu = require('qiniu')

const assetsName = 'build'

const noNeedUploadFileList = []

const cdnConfig = require('../app.config').cdn

const {
    ak,
    sk,
    bucket,
} = cdnConfig

const mac = new qiniu.auth.digest.Mac(ak, sk)

const config = new qiniu.conf.Config()
config.zone = qiniu.zone.Zone_z0

const doUpload = (key, file) => {
    const options = {
        scope: bucket + ':' + key,
    }
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()
    const putPolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken = putPolicy.uploadToken(mac)
    return new Promise((resolve, reject) => {
        formUploader.putFile(uploadToken, key, file, putExtra, (err, body, info) => {
            if (err) {
                return reject(err)
            }
            if (info.statusCode === 200) {
                resolve(body)
            } else {
                reject(body)
            }
        })
    })
}

function genFilesList(dirName) {
    let set = []
    if (!fs.existsSync(dirName)) throw new Error("目录不存在");
    fs.readdirSync(dirName).map(value => {
        const assetPath = path.join(dirName, value)
        var stats = fs.statSync(assetPath);
        if (stats.isFile()) {
            let e = assetPath.replace(new RegExp(`.*${assetsName}\/`), '')
            set.push(e)
        }
        if (stats.isDirectory()) {
            set = [...set, ...genFilesList(assetPath)]
        }
    })
    return set
}
const files = genFilesList(path.join(__dirname, `../${assetsName}`))

const uploads = files.map(item => {
    if (noNeedUploadFileList.indexOf(item) === -1) {
        return doUpload(
            item,
            path.join(__dirname, `../${assetsName}`, item)
        )
    } else {
        return Promise.resolve('no need upload file ' + item)
    }
})

Promise.all(uploads).then(resps => {
    console.log('upload success: ', resps)
}).catch(errs => {
    console.log('upload fail: ', errs)
    process.exit(0)
})
