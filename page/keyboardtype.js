import { gettext } from 'i18n'
const deviceInfo = hmSetting.getDeviceInfo()
const { width, height, screenShape } = deviceInfo

import * as fs from '../utils/fs'
import * as ui from '../utils/ui'

const logger = DeviceRuntimeCore.HmLogger.getLogger('settings')

const buttonWidth = px(64);
const buttonHeight = px(50);
const margin = px(15);

let keyboardTypeList = [];

let keyboardTypeSelected = '';

Page({
    build() {
        hmUI.updateStatusBarTitle(gettext('keyboardType'));

        keyboardTypeList = getApp()._options.globalData.keyboardType;
        keyboardTypeSelected = fs.readKeyBoardType();

        ui.createCheckList(
            keyboardTypeList,
            keyboardTypeSelected,
            function (index) {
                fs.writeKeyBoardType(index)
            }
        )
    }
})