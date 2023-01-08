import { gettext } from 'i18n'

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
        description: gettext('hints'),
        icon: '',
        page: '',
        title: true
    },
    {
        description: gettext('doubleClickToEdit'),
        icon: 'ic_gesture_50px.png',
        page: '',
        title: false
    },
    {
        description: gettext('about'),
        icon: '',
        page: '',
        title: true
    },
    {
        description: gettext('createdBy'),
        icon: 'ic_rest_50px.png',
        page: '',
        title: false
    },
    {
        description: gettext('github'),
        icon: 'github.png',
        page: '',
        title: false
    },
]

Page({
    build() {
        hmUI.updateStatusBarTitle(gettext('more'));
        ui.createMenuList(menuItems);
    }
})