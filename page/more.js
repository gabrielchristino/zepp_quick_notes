import * as fs from '../utils/fs'
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
        description: 'Hints',
        icon: '',
        page: '',
        title: true
    },
    {
        description: 'Double-click a note to edit it',
        icon: 'ic_gesture_50px.png',
        page: '',
        title: false
    },
    {
        description: 'About',
        icon: '',
        page: '',
        title: true
    },
    {
        description: 'Created by Gabriel Christino',
        icon: 'ic_rest_50px.png',
        page: '',
        title: false
    },
    {
        description: 'GitHub gabrielchristino',
        icon: 'github.png',
        page: '',
        title: false
    },
]

Page({
    build() {
        hmUI.updateStatusBarTitle('More');
        ui.createMenuList(menuItems);
    }
})