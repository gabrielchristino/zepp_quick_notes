const { messageBuilder } = getApp()._options.globalData
const logger = DeviceRuntimeCore.HmLogger.getLogger('demo')


const width = 336;
const height = 380;
const buttonWidth = 100;
const buttonWidthMargin = 102;
const buttonHeight = 60;
const buttonHeightMargin = 62;
const margin = 15;

let quickReply = []; // ['Manda mensagem', 'Oi!😁', 'Já te retorno 😁']
const emojis = ['😍', '😂', '😘', '😱', '♥', '😁', '😎', '🙈', '👍', '😢', '🙏', '😇', '😴', '👀', '😋'];
const letters = [[',', '.', ' ', '?'], ['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i'], ['j', 'k', 'l'], ['m', 'n', 'o'], ['p', 'q', 'r', 's'], ['t', 'u', 'v'], ['w', 'x', 'y', 'z']];

let lastButton = 0;
let lastClick = 0;
let currentLetterIndex = 0;

let currentLetter = '';
let lastLetter = '';
let text = '';

let displayText;
let displayCurrentLetter;
let quickReplyButtons = [];

let dialogSendConfirm;

let cycleImageTextList;

updateCurrentLetter = function () {
  displayCurrentLetter.setProperty(hmUI.prop.MORE, {
    text: currentLetter
  })
}

updateText = function () {
  displayText.setProperty(hmUI.prop.MORE, {
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

getALetter = function (buttonLetters, currentButton) {
  let nowClick = Date.now();
  if (nowClick - lastClick < 1000) {
    if (lastButton == currentButton) {
      currentLetterIndex++;
      if (currentLetterIndex == buttonLetters.length) {
        currentLetterIndex = 0;
      }
    } else {
      text += lastLetter;
      currentLetterIndex = 0;
    }
  } else {
    text += lastLetter;
    currentLetterIndex = 0;
  }

  updateText();

  currentLetter = buttonLetters[currentLetterIndex];

  updateCurrentLetter();

  lastLetter = currentLetter;

  lastButton = currentButton;
  lastClick = nowClick;
}

getAEmoji = function (emoji) {
  currentLetter = emoji;

  updateCurrentLetter();

  text += lastLetter;
  lastLetter = currentLetter;

  updateText();
  hmUI.scrollToPage(1, true);
}

backspaceText = function () {
  if (lastLetter == '') {
    const withEmojis = /\p{Extended_Pictographic}/u
    if (withEmojis.test(text.slice(-2))) {
      text = text.slice(0, -1);
    }
    text = text.slice(0, -1);
  }

  lastLetter = '';
  currentLetter = '';

  updateCurrentLetter();

  updateText();
}

udapteQuickReply = function () {
  hmUI.deleteWidget(cycleImageTextList);
  messageBuilder.request({
    method: 'GET_NOTES',
    params: {
      text
    }
  }).then(data => {
    let { text } = data
    if (text && text.slice(-1).indexOf("/") > -1) {
      text = text.slice(0, -1)
    }
    quickReply = text && text.length > 0 ? text.split('/') : [];
    let dataArray = [];
    if (quickReply && quickReply.length > 0) {
      for (let i = 0; i < quickReply.length; i++) {
        dataArray.push({ text: quickReply[i] });
      }
      cycleImageTextList = hmUI.createWidget(hmUI.widget.CYCLE_IMAGE_TEXT_LIST, {
        x: width * 2 + margin,
        y: 50,
        w: width - margin * 2,
        h: dataArray.length * 50 > height - 65 ? height - 65 : dataArray.length * 50,
        data_array: dataArray,
        data_size: dataArray.length,
        item_height: 50,
        item_text_color: 0xffffff,
        item_text_size: 30,
        item_click_func: (cycleList, index) => {
          initDialogDeleteANote(index, dataArray[index].text);
        }
      })
      cycleImageTextList.setProperty(hmUI.prop.LIST_TOP, { index: 0 })
    } else {
      hmUI.deleteWidget(cycleImageTextList);
      cycleImageTextList = hmUI.createWidget(hmUI.widget.BUTTON, {
        x: width * 2 + margin,
        y: height - 15 - buttonHeightMargin,
        text: 'Create a note first',
        text_size: 30,
        w: width - margin * 2,
        h: buttonHeight,
        radius: 5,
        normal_color: 0x555555,
        press_color: 0x888888,
        click_func: () => {
          hmUI.scrollToPage(1, true);
        }
      })
    }
  })
}

initDialogSend = function () {
  dialogSendConfirm = hmUI.createDialog({
    title: text,
    auto_hide: true,
    click_linster: ({ type }) => {
      if (type == 1) {
        messageBuilder.request({
          method: 'ADD_NOTE',
          params: {
            text
          }
        }).then(data => {
          udapteQuickReply();
        })
        text = '';
        lastLetter = '';
        currentLetter = '';

        updateCurrentLetter();
        updateText();
      }
    }
  })
  dialogSendConfirm.show(true)
}

initDialogAbout = function () {
  dialogSendConfirm = hmUI.createDialog({
    title: 'Quick notes by Gabriel Christino',
    auto_hide: true,
    click_linster: ({ type }) => {
      hmUI.scrollToPage(1, true);
    }
  })
  dialogSendConfirm.show(true)
}

initDialogDeleteANote = function (index, textReminder) {
  dialogDeleteAllConfirm = hmUI.createDialog({
    title: 'Delete this note? \n' + textReminder,
    auto_hide: true,
    click_linster: ({ type }) => {
      if (type == 1) {
        // send a message to Side Service
        messageBuilder.request({
          method: 'DELETE_A_NOTE',
          params: {
            text: index
          }
        }).then(data => {
          udapteQuickReply();
        })
        text = '';
        lastLetter = '';
        currentLetter = '';

        updateCurrentLetter();
        updateText();

        hmUI.scrollToPage(1, true);
      }
    }
  })
  dialogDeleteAllConfirm.show(true)
}

initDialogDeleteAll = function () {
  dialogDeleteAllConfirm = hmUI.createDialog({
    title: 'Delete all notes?',
    auto_hide: true,
    click_linster: ({ type }) => {
      if (type == 1) {
        // send a message to Side Service
        messageBuilder.request({
          method: 'DELETE_ALL_NOTES',
          params: {
            text: ''
          }
        }).then(data => {
          udapteQuickReply();
        })
        text = '';
        lastLetter = '';
        currentLetter = '';

        updateCurrentLetter();
        updateText();

        hmUI.scrollToPage(1, true);
      }
    }
  })
  dialogDeleteAllConfirm.show(true)
}

sendMessage = function () {
  text += lastLetter;
  lastLetter = '';
  currentLetter = '';

  updateCurrentLetter();

  updateText();

  initDialogSend()
}

removeAllNotes = function () {
  text += lastLetter;
  lastLetter = '';
  currentLetter = '';

  updateCurrentLetter();
  updateText();

  initDialogDeleteAll()
}

Page({
  build() {
    lastClick = Date.now();

    hmApp.setScreenKeep(true);

    hmUI.setScrollView(true, px(width), 4, false);

    // receive a message from the Side Service
    messageBuilder.on('call', ({ payload: buf }) => {
      // call the messageBuilder.buf2Json method to convert the buffer to a JS JSON object
      const data = messageBuilder.buf2Json(buf);
      let { text } = data
      quickReply = text && text.length > 0 ? text.split('/') : [];

      udapteQuickReply();
    })



    displayText = hmUI.createWidget(hmUI.widget.TEXT, {
      x: width,
      y: 50,
      w: width,
      h: 60,
      color: 0xffffff,
      text_size: 36,
      align_h: hmUI.align.LEFT,
      align_v: hmUI.align.TOP,
      text_style: hmUI.text_style.NONE,
      text
    })

    displayCurrentLetter = hmUI.createWidget(hmUI.widget.TEXT, {
      x: width,
      y: height - 15 - 4 * buttonHeightMargin,
      w: width,
      h: buttonHeight,
      color: 0xffffff,
      text_size: 30,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text
    })

    const okButton = hmUI.createWidget(hmUI.widget.BUTTON, {
      x: margin + width,
      y: height - 15 - 4 * buttonHeightMargin,
      text: 'ok',
      text_size: 30,
      w: buttonWidth,
      h: buttonHeight,
      radius: 5,
      normal_color: 0x555555,
      press_color: 0x888888,
      click_func: () => {
        sendMessage()
      }
    })

    const backspace = hmUI.createWidget(hmUI.widget.BUTTON, {
      x: width * 2 - margin - buttonWidth,
      y: height - 15 - 4 * buttonHeightMargin,
      text: '<',
      text_size: 30,
      w: buttonWidth,
      h: buttonHeight,
      radius: 5,
      normal_color: 0x555555,
      press_color: 0x888888,
      click_func: () => {
        backspaceText()
      }
    })

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 3; j++) {
        hmUI.createWidget(hmUI.widget.BUTTON, {
          x: j * buttonWidthMargin + 15,
          y: height - (5 - i) * buttonHeightMargin,
          text: emojis[i * 3 + j],
          text_size: 38,
          w: buttonWidth,
          h: buttonHeight,
          radius: 5,
          normal_color: 0x555555,
          press_color: 0x888888,
          click_func: () => {
            getAEmoji(emojis[i * 3 + j])
          }
        })
      }
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        hmUI.createWidget(hmUI.widget.BUTTON, {
          x: j * buttonWidthMargin + width + margin,
          y: height - 15 - (3 - i) * buttonHeightMargin,
          text: getLettersToDisplay(letters[i * 3 + j]),
          text_size: 30,
          w: buttonWidth,
          h: buttonHeight,
          radius: 5,
          normal_color: 0x555555,
          press_color: 0x888888,
          click_func: () => {
            getALetter(letters[i * 3 + j], i * 3 + j)
          }
        })
      }
    }

    udapteQuickReply();

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: width * 3 + margin,
      y: height - 15 - buttonHeightMargin,
      text: 'Remove all notes',
      text_size: 30,
      w: width - margin * 2,
      h: buttonHeight,
      radius: 5,
      normal_color: 0x555555,
      press_color: 0x888888,
      click_func: () => {
        removeAllNotes();
      }
    })

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: width * 3 + margin,
      y: height - 15 - 2 * buttonHeightMargin,
      text: 'About',
      text_size: 30,
      w: width - margin * 2,
      h: buttonHeight,
      radius: 5,
      normal_color: 0x555555,
      press_color: 0x888888,
      click_func: () => {
        initDialogAbout();
      }
    })

  }
})
