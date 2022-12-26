import './shared/device-polyfill'
import { MessageBuilder } from './shared/message'

// need to pass in the appId
const appId = 28740
const messageBuilder = new MessageBuilder({ appId })

App({
  globalData: {
    messageBuilder: messageBuilder,
  },
  onCreate(options) {
    // console.log('app on create invoke')
    hmApp.setScreenKeep(true);
    // establish connection
    messageBuilder.connect()
  },

  onDestroy(options) {
    // console.log('app on destroy invoke')
    
    messageBuilder.disConnect()
  }
})