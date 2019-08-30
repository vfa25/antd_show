# Antd 主页展示

## 简介

这是一个学习项目。fork from [ant-design](https://github.com/ant-design/ant-design) 。

## 搭建

该项目使用了[Create React App](https://github.com/facebook/create-react-app)以快速搭建。

且不再额外定制TsLint规则，参考[#6871](https://github.com/facebook/create-react-app/issues/6871)。

⚠️ TSLint will be deprecated some time in 2019. See this issue for more details: [Roadmap: TSLint → ESLint](https://github.com/palantir/tslint/issues/4534)。

## 线上优化

从渲染15s到2s，nginx + cdn（未做SSR），附nginx。

```nginx
upstream django {
    server 127.0.0.1:port;
}
server {
    listen       80;
    server_name  www.vfa25.cn;
    return 302 https://$server_name$request_uri;
}
server {
    listen 443 ssl http2;
    server_name *.vfa25.cn;

    charset     utf-8;

    error_log  logs/443-error.log;

    # max upload size
    client_max_body_size 75M;

    # 如果不是 https 协议，重定向到 https，同时带上所有参数
    if ($host ~* "^vfa25.cn$") {
        rewrite ^/(.*)$ https://www.vfa25.cn/ permanent;
        # 也可以直接重写到新的 https 地址
        # return 301 https://$server_name$request_uri;
        # rewrite ^(.*) https://$host$1 permanent;
        # rewrite ^ https://$host$request_uri?permanent;
    }
    ssl on;
    ssl_certificate xxx; # 证书文件
    ssl_certificate_key xxx; # 私钥文件
    ssl_session_timeout 5m;
    ssl_protocols xxx; # 使用的协议
    ssl_ciphers xxx; #配置加密套件
    ssl_prefer_server_ciphers on;

    # http2_push_preload    on;
    # add_header Link "</style.css>; as=style; rel=preload, </main.js>; as=script; rel=preload, </image.jpg>; as=image; rel=preload";

    # Gzip Compression
    gzip on;
    gzip_comp_level 6;
    gzip_vary on;
    gzip_min_length  1000;
    gzip_proxied any;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_buffers 16 8k;

    #  location ^~ /antd/ {
    #    http2_push /assets/logo-antd.svg;
    #    http2_push /assets/logo-element.svg;
    #    http2_push /enterprise-antd/favicon.ico;
    #    alias   /www/enterprise-antd/production/current/build/;
    #    autoindex   on;
    #  }

    location ^~ /static/ {
        alias   /www/django_web_server/static/;
        autoindex   on;
    }

    location ^~ /media/ {
        alias   /www/django_web_server/media/;
        autoindex   on;
    }

    location ^~ /api/ {
        rewrite  ^/api/(.*)$ /$1 break;
        uwsgi_pass  django;
        include     uwsgi_params;
    }

    location ^~ /assets/ {
        proxy_pass http://cdn.vfa25.cn;
    }

    location ^~ /antd/ {
        proxy_pass https://cdn.vfa25.cn/;
    }

    location / {
        uwsgi_pass  django;
        include     uwsgi_params;
    }
}
```

## 本地调试

我希望在该项目目录下引入其他项目`JS文件`目录（如Hooks基础组件目录）

1. 包引入

    - 修改访问路径方式。修改webpack配置：`注释掉模块作用域插件：react-dev-utils/ModuleScopePlugin`，`增加resolve别名resolve.alias`，`修改TS配置字段baseUrl和paths`。
    - 拷贝到node_modules方式。[拷贝脚本](https://github.com/vfa25/ts_hooks_antd/blob/master/copyDirToHomepage.sh)
2. 解决配置1带来的`You might have mismatching versions of React and the renderer (such as React DOM)`多包共存冲突（`node_modules`模块寻址原因，module.paths）。

    `resolve.modules数组最前加入：path.resolve(__dirname, '../node_modules')`，参考官网[resolve.modules](https://webpack.js.org/configuration/resolve/#resolvemodules)。
