module.exports = {
    webpack(config) {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader'
        })
        config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm'
        return config
    },
    future: {
        webpack5: false
    }
}