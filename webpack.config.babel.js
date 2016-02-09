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
    loaders: [{
      test: getSourceRegExp('js'),
      loader: 'babel'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: require.resolve('as-hue-command'),
      loaders: [
        'expose?ashue',
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

export default function getSourceRegExp(ext, modules = ['as-hue-command', 'rxjs-es']) {
  // Convert possible string value to array.
  ext = [].concat(ext);

  return new RegExp(
    `^(?:(?!.*(node_modules))|(?:.*(?:\\1)\\/(?:${modules.join('|')})\\/(?!.*node_modules))).*\\.(?:${ext.join('|')})$`
  );
}
