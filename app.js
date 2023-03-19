import './shared/device-polyfill'
import { MessageBuilder } from './shared/message'

const appDevicePort = 20
const appSidePort = 0
const appId = 1015585
const messageBuilder = new MessageBuilder({
  appId
})

App({
  globalData: {
    messageBuilder: messageBuilder,
    currentText: '',
    keyboardType: ['t9Keyboard', 'extendedKeyboard', 'extendedKeyboard2'],
  },
  onCreate(options) {
    hmApp.setScreenKeep(true);
    messageBuilder.connect();
  },

  onDestroy(options) {
    messageBuilder.disConnect();
  }
})