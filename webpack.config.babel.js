/* eslint-env node */
import {resolve} from 'path';

export default {
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: '#source-map',
  module: {
    // One of `request`s deps has a bad module definiton, breaking bundle.
    // https://github.com/webpack/webpack/issues/138
    noParse: /node_modules\/json-schema\/lib\/validate\.js/,
    loaders: [{
      test: getSourceRegExp('js'),
      loader: 'babel'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: require.resolve('as-hue-command'),
      loaders: [
        'expose?connect',
        'babel'
      ]
    }]
  },
  resolveLoader: {
    root: resolve(__dirname, 'node_modules')
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};

export default function getSourceRegExp(ext, modules = ['as-hue-command', 'rxjs-es', 'lodash-es']) {
  // Convert possible string value to array.
  ext = [].concat(ext);

  return new RegExp(
    `^(?:(?!.*(node_modules))|(?:.*(?:\\1)\\/(?:${modules.join('|')})\\/(?!.*node_modules))).*\\.(?:${ext.join('|')})$`
  );
}
