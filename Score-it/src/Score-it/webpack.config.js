const path = require('path');
const scriptsPath = path.join(__dirname, 'scripts');

module.exports = {
    entry: './scripts/main.jsx',
    output: {
        path: path.join(__dirname, 'wwwroot/scripts'),
        publicPath: '/scripts/',
        filename: 'bundle.js'
    },

    devtool: 'source-map',

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel?presets[]=es2015']
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loaders: ['babel?presets[]=react,presets[]=es2015']
            }
        ]
    },
    resolve: {
        root: [scriptsPath],
        modulesDirectories: ['node_modules', 'shared_modules', 'shared_components']
    }
};
