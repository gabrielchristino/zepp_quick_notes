import './shared/device-polyfill'

App({
  globalData: {
    currentText: '',
  },
  onCreate(options) {
    hmApp.setScreenKeep(true);
  },

  onDestroy(options) {
  }
})