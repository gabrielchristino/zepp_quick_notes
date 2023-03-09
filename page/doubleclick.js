import { gettext } from 'i18n'

const deviceInfo = hmSetting.getDeviceInfo()
const { width, height, screenShape } = deviceInfo

import * as fs from './../utils/fs'
import * as ui from '../utils/ui'

const logger = DeviceRuntimeCore.HmLogger.getLogger('settings')

const buttonWidth = px(64);
const buttonHeight = px(50);
const margin = px(15);

const timeoutOptions = [250, 500, 750, 1000];

let multiClickTimeout = 1000;

Page({
    build() {
        hmUI.updateStatusBarTitle(gettext('doubleClickTimeout'));

        multiClickTimeout = fs.readKeyBoardMultiTimeout();
        const timeOutIndex = timeoutOptions.indexOf(Number(multiClickTimeout))

        ui.createCheckList(
            timeoutOptions,
            timeOutIndex,
            function (index) {
                fs.writeKeyBoardMultiTimeout(timeoutOptions[index])
                getApp()._options.globalData.multiClickTimeout = timeoutOptions[index]
            }
        )
    }
})