import { gettext } from 'i18n'
const deviceInfo = hmSetting.getDeviceInfo()
const { width, height, screenShape } = deviceInfo

import * as fs from './../utils/fs'

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

        const radioGroup = hmUI.createWidget(hmUI.widget.RADIO_GROUP, {
            x: px(margin),
            y: px(buttonHeight + margin),
            w: px(width),
            h: px(height),
            select_src: 'selected.png',
            unselect_src: 'unselected.png',
            check_func: (group, index, checked) => {
                if (checked) {
                    fs.writeKeyBoardMultiTimeout(timeoutOptions[index])
                    getApp()._options.globalData.multiClickTimeout = timeoutOptions[index]
                }
            }
        })

        let radioButtons = [];

        for (let index = 0; index < timeoutOptions.length; index++) {
            radioButtons.push(radioGroup.createWidget(hmUI.widget.STATE_BUTTON, {
                x: px(0),
                y: px((margin + buttonHeight) * index),
                w: px(buttonWidth),
                h: px(buttonHeight)
            }))
            const optionLabel = hmUI.createWidget(hmUI.widget.TEXT, {
                x: px(margin + buttonWidth),
                y: px(buttonHeight + margin / 2 + (buttonHeight + margin) * index),
                w: px(width - (margin * 2 + buttonWidth)),
                h: px(buttonHeight),
                color: 0xffffff,
                text_size: px(24),
                align_h: hmUI.align.LEFT,
                align_v: hmUI.align.CENTER_V,
                text_style: hmUI.text_style.NONE,
                text: timeoutOptions[index] + 'ms'
            })
        }
        //logger.log('multiClickTimeout',multiClickTimeout)
        //logger.log('timeoutOptions',timeoutOptions)
        const timeOutIndex = timeoutOptions.findIndex(item => item == multiClickTimeout)
        //logger.log('timeOutIndex',timeOutIndex)
        radioGroup.setProperty(hmUI.prop.INIT, radioButtons[timeOutIndex])
    }
})