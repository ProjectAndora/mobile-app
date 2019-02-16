const env = require('./env')

module.exports = function(api) {
  api.cache(true)
  return {
    presets: [env === 'expo' ? 'babel-preset-expo' : 'module:metro-react-native-babel-preset'],
    plugins: [
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          root: ['.'],
          alias: {
            'app': './app',
            'assets': './assets',
          },
        },
      ],
    ],
  }
}
