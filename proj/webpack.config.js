var webpack = require('webpack');
var path = require("path");
module.exports = {
    entry: [
        'react-hot-loader/patch',
        './src/index.tsx'     
    ],
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "/dist"),
        publicPath: "/dist/",        
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    devServer: {
        port: 9000,
        hot: true
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, 
                loaders: ['react-hot-loader/webpack', "awesome-typescript-loader"], 
                include: path.join(__dirname, 'src'),
                exclude: path.resolve(__dirname, 'node_modules')
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify('development')
            }
          }),

    ]
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
};