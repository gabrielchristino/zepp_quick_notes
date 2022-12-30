import './shared/device-polyfill'
import { MessageBuilder } from './shared/message'

// need to pass in the appId
const appId = 28740
const messageBuilder = new MessageBuilder({ appId })

App({
  globalData: {
    messageBuilder: messageBuilder,
    currentText: '',
    multiClickTimeout: 1000
  },
  onCreate(options) {
    hmApp.setScreenKeep(true);
    // establish connection
    try {
      messageBuilder.connect()
    } catch (e) {
      messageBuilder.disConnect()
      messageBuilder.connect()
    }
  },

  onDestroy(options) {
    messageBuilder.disConnect()
  }
})