import * as fs from './../utils/fs'

const logger = DeviceRuntimeCore.HmLogger.getLogger('settings')

const width = 336;
const height = 380;
const buttonWidth = 50;
const buttonWidthMargin = 102;
const buttonHeight = 50;
const margin = 15;

const timeoutOptions = [250, 500, 750, 1000];

let multiClickTimeout = 1000;

Page({
    build() {
        hmUI.updateStatusBarTitle('Settings');
        multiClickTimeout = fs.readKeyBoardMultiTimeout();
        const imgIcon = hmUI.createWidget(hmUI.widget.IMG, {
            x: margin,
            y: buttonHeight + margin,
            src: 'ic_gesture_50px.png'
        })

        const titleSettingsPage = hmUI.createWidget(hmUI.widget.TEXT, {
            x: margin + buttonWidth,
            y: buttonHeight + margin,
            w: width - (margin + buttonWidth * 2),
            h: buttonHeight,
            color: 0xffffff,
            text_size: px(24),
            align_h: hmUI.align.LEFT,
            align_v: hmUI.align.CENTER_V,
            text_style: hmUI.text_style.NONE,
            text: 'Double-click speed'
        })

        const imgArrow = hmUI.createWidget(hmUI.widget.IMG, {
            x: width - buttonHeight - margin,
            y: buttonHeight + margin + 2,
            src: 'ic_right_arrow.png'
        })

        imgIcon.addEventListener(hmUI.event.CLICK_DOWN, function (info) {
            hmApp.gotoPage({ file: 'page/doubleclick' })
        })

        titleSettingsPage.addEventListener(hmUI.event.CLICK_DOWN, function (info) {
            hmApp.gotoPage({ file: 'page/doubleclick' })
        })

        imgArrow.addEventListener(hmUI.event.CLICK_DOWN, function (info) {
            hmApp.gotoPage({ file: 'page/doubleclick' })
        })
    }
})