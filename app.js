import './shared/device-polyfill'

App({
  globalData: {
    currentText: '',
    keyboardType: ['t9Keyboard', 'extendedKeyboard', 'extendedKeyboard2'],
  },
  onCreate(options) {
    hmApp.setScreenKeep(true);
  },

  onDestroy(options) {
  }
})