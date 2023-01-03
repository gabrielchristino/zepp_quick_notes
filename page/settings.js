import * as ui from '../utils/ui'

const logger = DeviceRuntimeCore.HmLogger.getLogger('settings')

const width = 336;
const height = 380;
const buttonWidth = 50;
const buttonWidthMargin = 102;
const buttonHeight = 50;
const margin = 15;

const menuItems = [
    {
        description: 'Double-click speed',
        icon: 'ic_gesture_50px.png',
        page: 'page/doubleclick',
        title: false
    },
    {
        description: 'More',
        icon: 'ic_lamp_50px.png',
        page: 'page/more',
        title: false
    },
]

Page({
    build() {
        hmUI.updateStatusBarTitle('Settings');

        ui.createMenuList(menuItems);
    }
})