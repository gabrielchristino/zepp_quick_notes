import { gettext } from 'i18n'
const deviceInfo = hmSetting.getDeviceInfo()
const { width, height, screenShape } = deviceInfo

import * as fs from '../utils/fs'
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
        description: gettext('hints'),
        icon: '',
        page: '',
        callback: function() {},
        title: true
    },
    {
        description: gettext('doubleClickToEdit'),
        icon: 'ic_gesture_50px.png',
        page: '',
        callback: function() {},
        title: false
    },
    {
        description: gettext('spaceButton'),
        icon: 'ic_space_50.png',
        page: '',
        callback: function() {},
        title: false
    },
    {
        description: gettext('keyboardInfo1'),
        icon: 'ic_apps_50px.png',
        page: '',
        callback: function() {},
        title: false
    },
    {
        description: gettext('keyboardInfo2'),
        icon: '',
        page: '',
        callback: function() {},
        title: false
    },
    {
        description: gettext('keyboardInfo3'),
        icon: '',
        page: '',
        callback: function() {},
        title: false
    },
    {
        description: gettext('keyboardInfo4'),
        icon: '',
        page: '',
        callback: function() {},
        title: false
    },
    {
        description: gettext('about'),
        icon: '',
        page: '',
        callback: function() {},
        title: true
    },
    {
        description: gettext('createdBy'),
        icon: 'me.png',
        page: '',
        callback: function() {},
        title: false
    },
    {
        description: gettext('buycoffee'),
        icon: 'ic_rest_50px.png',
        page: '',
        callback: function() {},
        title: false
    },
    {
        description: gettext('github'),
        icon: 'github.png',
        page: '',
        callback: function() {},
        title: false
    },
]

Page({
    build() {
        hmUI.updateStatusBarTitle(gettext('more'));
        ui.createMenuList(menuItems);
    }
})