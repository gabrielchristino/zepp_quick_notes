import './shared/device-polyfill'

App({
  globalData: {
    currentText: '',
    multiClickTimeout: 1000,
    keyboardTypeSelected: 0,
    keyboardType: ['t9Keyboard', 'extendedKeyboard', 'extendedKeyboard2'],
  },
  onCreate(options) {
    hmApp.setScreenKeep(true);
  },

  onDestroy(options) {
  }
})