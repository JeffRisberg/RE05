module.exports = {
    entry: './app/timer.jsx', output: {
        publicPath: 'js/',
        path: __dirname + '/js/', filename: 'bundle.js'
    },
    devtool: '#sourcemap',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/, loaders: []
            } ]
    } }