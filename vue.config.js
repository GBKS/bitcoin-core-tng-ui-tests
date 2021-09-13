module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Bitcoin Core TNG UI tests";
                args[0].description = "UI tests. Just for fun. To make things more real and feel them out.";
                args[0].locale = "en_US";
                return args;
            })
    }
}