import { gettext } from 'i18n'
const deviceInfo = hmSetting.getDeviceInfo()
const { width, height, screenShape } = deviceInfo

import * as fs from './../utils/fs'

const logger = DeviceRuntimeCore.HmLogger.getLogger('keyboard')

// const width = 336;
// const height = 380;
let buttonWidth = 100;
let buttonWidthMargin = 102;
const buttonHeight = 60;
const buttonHeightMargin = 62;
const groupHeight = 5 * buttonHeightMargin;
const margin = 15;

const emojis = ['😍', '😂', '😘', '😱', '♥', '😁', '😎', '🙈', '👍', '😢', '🙏', '😇', '😴', '👀', '😋'];
const letters = [[',', '.', ' ', '?'], ['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i'], ['j', 'k', 'l'], ['m', 'n', 'o'], ['p', 'q', 'r', 's'], ['t', 'u', 'v'], ['w', 'x', 'y', 'z']];
const numbers = [['1'], ['2'], ['3'], ['4'], ['5'], ['6'], ['7'], ['8'], ['9'], ['0'], ['!', '@', '+', '-'], ['$', '%', '(', ')']];

let currentLetter = '';
let text = '';

let lastButton = 0;
let lastClick = 0;
let currentLetterIndex = 0;

let displayText;
let displayText2;

let dialogSendConfirm;

let multiClickTimeout = 1000;

updateText = function () {
    displayText.setProperty(hmUI.prop.MORE, {
        text
    })
    displayText2.setProperty(hmUI.prop.MORE, {
        text
    })
}

getLettersToDisplay = function (buttonLetters) {
    let displayLetters = '';
    for (let index = 0; index < buttonLetters.length; index++) {
        displayLetters += buttonLetters[index] + ' '
    }
    return displayLetters
}

getALetter = function (buttonLetters, currentButton, timeToDoubleClick = multiClickTimeout) {
    let nowClick = Date.now();
    if (nowClick - lastClick < timeToDoubleClick) {
        if (lastButton == currentButton) {

            const withEmojis = /\p{Extended_Pictographic}/u
            if (withEmojis.test(text.slice(-2))) {
                text = text.slice(0, -1);
            }
            text = text.slice(0, -1);

            currentLetterIndex++;
            if (currentLetterIndex == buttonLetters.length) {
                currentLetterIndex = 0;
            }

            currentLetter = buttonLetters[currentLetterIndex];
            text += currentLetter;
        } else {
            currentLetterIndex = 0;
            currentLetter = buttonLetters[currentLetterIndex];
            text += currentLetter;
        }
    } else {
        currentLetterIndex = 0;
        currentLetter = buttonLetters[currentLetterIndex];
        text += currentLetter;
    }

    updateText();

    lastButton = currentButton;
    lastClick = nowClick;
}

getAEmoji = function (emoji) {
    text += emoji;

    updateText();
    hmUI.scrollToPage(0, true);
}

backspaceText = function () {
    const withEmojis = /\p{Extended_Pictographic}/u
    if (withEmojis.test(text.slice(-2)) && text.slice(-2).indexOf('♥') < 0) {
        text = text.slice(0, -1);
    }
    text = text.slice(0, -1);

    updateText();
}

sendMessage = function () {
    initDialogSend()
}

initDialogSend = function () {
    if (text.length > 0) {
        dialogSendConfirm = hmUI.createDialog({
            title: text,
            auto_hide: true,
            click_linster: ({ type }) => {
                if (type == 1) {
                    fs.writeLastMessage(text);
                    fs.addTodoList(text, true);
                    fs.deleteLastMessage();
                    text = '';
                    updateText();
                    hmApp.reloadPage({ file: 'page/index' });
                }
            }
        })
    } else {
        dialogSendConfirm = hmUI.createDialog({
            title: gettext('noNewNoteCreated'),
            auto_hide: true,
            click_linster: ({ type }) => {
                if (type == 1) {
                    hmApp.gotoPage({ file: 'page/index' });
                }
            }
        })
    }
    dialogSendConfirm.show(true)
}

createEmojiKeyboard = function () {
    const emojiKeyboard = hmUI.createWidget(hmUI.widget.GROUP, {
        x: width * 2,
        y: height - groupHeight - margin,
        w: buttonWidth * 3 + margin * 2,
        h: buttonHeight * 5 + margin * 4,
    })

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 3; j++) {
            emojiKeyboard.createWidget(hmUI.widget.BUTTON, {
                x: j * buttonWidthMargin + margin,
                y: groupHeight - (5 - i) * buttonHeightMargin,
                text: emojis[i * 3 + j],
                text_size: 38,
                w: buttonWidth,
                h: buttonHeight,
                radius: 5,
                normal_color: 0x333333,
                press_color: 0x888888,
                click_func: () => {
                    getAEmoji(emojis[i * 3 + j])
                }
            })
        }
    }
}

createNumberKeyboard = function () {
    displayText2 = hmUI.createWidget(hmUI.widget.TEXT, {
        x: (width * 1) + 30,
        y: 1,
        w: width - 60,
        h: 120,
        color: 0xffffff,
        text_size: 36,
        align_h: hmUI.align.LEFT,
        align_v: hmUI.align.TOP,
        text_style: hmUI.text_style.CHAR_WRAP,
        text
    })

    const numbersKeyboard = hmUI.createWidget(hmUI.widget.GROUP, {
        x: (width * 1),
        y: height - groupHeight - margin,
        w: buttonWidth * 3 + margin * 2,
        h: buttonHeight * 5 + margin * 4,
    })

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            numbersKeyboard.createWidget(hmUI.widget.BUTTON, {
                x: j * buttonWidthMargin + margin,
                y: groupHeight - (4 - i) * buttonHeightMargin,
                text: getLettersToDisplay(numbers[i * 3 + j]),
                text_size: 30,
                w: buttonWidth,
                h: buttonHeight,
                radius: 5,
                normal_color: 0x333333,
                press_color: 0x888888,
                click_func: () => {
                    getALetter(numbers[i * 3 + j], i * 3 + j, numbers[i * 3 + j].length > 1 ? multiClickTimeout : -1)
                }
            })
        }
    }
}

createKeyboard = function () {
    displayText = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 30,
        y: 1,
        w: width - 60,
        h: 120,
        color: 0xffffff,
        text_size: 30,
        align_h: hmUI.align.LEFT,
        align_v: hmUI.align.TOP,
        text_style: hmUI.text_style.CHAR_WRAP,
        text
    })

    const okButton = hmUI.createWidget(hmUI.widget.GROUP, {
        x: (width * 0) + margin,
        y: height - margin - 4 * buttonHeightMargin,
        w: buttonWidth,
        h: buttonHeight,
    })

    okButton.createWidget(hmUI.widget.BUTTON, {
        x: 0,
        y: 0,
        w: buttonWidth,
        h: buttonHeight,
        normal_color: 0x0986D4,
        press_color: 0x0986D4,
        radius: 5,
    })

    okButton.createWidget(hmUI.widget.BUTTON, {
        x: 0,
        y: 0,
        w: buttonWidth,
        h: buttonHeight,
        normal_src: 'ic_confirm_52px.png',
        press_src: 'ic_confirm_52px.png',
        click_func: () => {
            sendMessage()
        }
    })

    const backspace = hmUI.createWidget(hmUI.widget.GROUP, {
        x: 2 * buttonWidthMargin + margin,
        y: height - margin - 4 * buttonHeightMargin,
        w: buttonWidth,
        h: buttonHeight,
    })

    backspace.createWidget(hmUI.widget.BUTTON, {
        x: 0,
        y: 0,
        w: buttonWidth,
        h: buttonHeight,
        normal_color: 0xAD3C23,
        press_color: 0xD14221,
        radius: 5,
    })

    backspace.createWidget(hmUI.widget.BUTTON, {
        x: 0,
        y: 0,
        w: buttonWidth,
        h: buttonHeight,
        normal_src: 'ic_delete_64.png',
        press_src: 'ic_delete_64.png',
        click_func: () => {
            backspaceText()
        }
    })

    const lettersKeyboard = hmUI.createWidget(hmUI.widget.GROUP, {
        x: (width * 0),
        y: height - groupHeight - margin,
        w: buttonWidth * 3 + margin * 2,
        h: buttonHeight * 5 + margin * 4,
    })

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            lettersKeyboard.createWidget(hmUI.widget.BUTTON, {
                x: j * buttonWidthMargin + margin,
                y: groupHeight - (3 - i) * buttonHeightMargin,
                text: getLettersToDisplay(letters[i * 3 + j]),
                text_size: 30,
                w: buttonWidth,
                h: buttonHeight,
                radius: 5,
                normal_color: 0x333333,
                press_color: 0x888888,
                click_func: () => {
                    getALetter(letters[i * 3 + j], i * 3 + j)
                }
            })
        }
    }
}

Page({
    build() {
        hmApp.unregisterGestureEvent();
        hmUI.setStatusBarVisible(false);

        lastClick = Date.now();

        hmUI.setScrollView(true, (width), 3, false);

        multiClickTimeout = fs.readKeyBoardMultiTimeout();

        // logger.log('multiClickTimeout key', multiClickTimeout)

        buttonWidth = (width - margin * 2) / 3;
        buttonWidthMargin = buttonWidth + 2;

        createKeyboard();

        createNumberKeyboard();

        createEmojiKeyboard();

        text = getApp()._options.globalData.currentText + fs.readLastMessage();
        updateText();
    },
    onDestroy() {
        fs.writeLastMessage(text);
    }
})
