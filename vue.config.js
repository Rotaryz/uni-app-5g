module.exports = {
    css: {
        loaderOptions: {
            // 给 stylus-loader 传递选项
            stylus: {
                import: [
                    '~@/design/variable.styl',
                    '~@/design/base.styl',
                    '~@/design/mixin.styl'
                ]
            }
        }
    }
}
