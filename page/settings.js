import { gettext } from 'i18n'
const deviceInfo = hmSetting.getDeviceInfo()
const { width, height, screenShape } = deviceInfo

import * as ui from '../utils/ui'

const logger = DeviceRuntimeCore.HmLogger.getLogger('settings')

//const width = 336;
//const height = 380;
const buttonWidth = 50;
const buttonWidthMargin = 102;
const buttonHeight = 50;
const margin = 15;

const menuItems = [
    {
        description: gettext('doubleClickSpeed'),
        icon: 'ic_gesture_50px.png',
        page: 'page/doubleclick',
        callback: function() {hmApp.gotoPage({ file: 'page/doubleclick' })},
        title: false
    },
    {
        description: gettext('keyboardType'),
        icon: 'ic_apps_50px.png',
        page: 'page/keyboardtype',
        callback: function() {hmApp.gotoPage({ file: 'page/keyboardtype' })},
        title: false
    },
    {
        description: gettext('more'),
        icon: 'ic_lamp_50px.png',
        page: 'page/more',
        callback: function() {hmApp.gotoPage({ file: 'page/more' })},
        title: false
    },
]

Page({
    build() {
        hmUI.updateStatusBarTitle(gettext('settings'));

        ui.createMenuList(menuItems);
    }
})