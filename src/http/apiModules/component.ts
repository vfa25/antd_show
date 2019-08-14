export default {
    blocks: {
        post: {
            url: '/blocks/:id',
            method: 'put'
        },
        get: {
            url: '/blocks/:id',
            method: 'get'
        }
    },
    categorys: {
        url: '/categorys',
        method: 'get'
    },
    components: {
        url: '/components',
        method: 'get'
    },
    search: {
        url: '/search',
        method: 'get'
    }
}
