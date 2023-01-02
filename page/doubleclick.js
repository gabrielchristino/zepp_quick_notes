import * as fs from './../utils/fs'

const logger = DeviceRuntimeCore.HmLogger.getLogger('settings')

const width = 336;
const height = 380;
const buttonWidth = 64;
const buttonWidthMargin = 102;
const buttonHeight = 50;
const margin = 15;

const timeoutOptions = [250, 500, 750, 1000];

let multiClickTimeout = 1000;

Page({
    build() {
        hmUI.updateStatusBarTitle('Double click timeout');
        multiClickTimeout = fs.readKeyBoardMultiTimeout();

        const radioGroup = hmUI.createWidget(hmUI.widget.RADIO_GROUP, {
            x: margin,
            y: buttonHeight + margin,
            w: width,
            h: height,
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
                x: 0,
                y: (margin + buttonHeight) * index,
                w: buttonWidth,
                h: buttonHeight
            }))
            const optionLabel = hmUI.createWidget(hmUI.widget.TEXT, {
                x: margin + buttonWidth,
                y: buttonHeight + margin / 2 + (buttonHeight + margin) * index,
                w: width - (margin * 2 + buttonWidth),
                h: buttonHeight,
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