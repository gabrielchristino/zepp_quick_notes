const { messageBuilder } = getApp()._options.globalData
const logger = DeviceRuntimeCore.HmLogger.getLogger('demo')


const width = 336;
const height = 380;
const buttonWidth = 100;
const buttonWidthMini = 60;
const buttonHeight = 110;
const buttonHeighMini = 60;
const margin = 16;
const groupHeight = 5 * (buttonHeight + margin);
const topBarY = 50;

let notesList = [];

let dataArray = [];

let dialogAbout;
let dialogError;

let scrollList;
let scrollListItems = [];
let topBarComponent;

let lastButton = 0;
let lastClick = 0;

initDialogAbout = function () {
  dialogAbout = hmUI.createDialog({
    title: 'Quick notes by Gabriel Christino',
    auto_hide: true,
    click_linster: ({ type }) => {
      hmUI.scrollToPage(1, true);
    }
  })
  dialogAbout.show(true)
}

initDialogError = function () {
  dialogError = hmUI.createDialog({
    title: 'Sorry, an error occurred! Close the app and try again later;',
    auto_hide: true,
    click_linster: ({ type }) => {
      hmApp.exit();
    }
  })
  dialogError.show(true)
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
            savedNotesStr: index
          }
        }).then(data => {
          udapteNotesList();
        })
          .catch((res) => {
            initDialogError();
          })
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
            savedNotesStr: ''
          }
        }).then(data => {
          udapteNotesList();
        })
          .catch((res) => {
            initDialogError();
          })
      }
    }
  })
  dialogDeleteAllConfirm.show(true)
}

removeAllNotes = function () {
  initDialogDeleteAll()
}

showtopBar = function (dataArray) {
  if (dataArray && dataArray.length > 0) {

    topBarComponent = hmUI.createWidget(hmUI.widget.GROUP, {
      x: (width * 0) + (width / 2) - buttonWidthMini - (margin / 2),
      y: topBarY,
      w: buttonWidthMini * 2 + margin,
      h: buttonHeighMini,
    })

    topBarComponent.createWidget(hmUI.widget.BUTTON, {
      x: 0,
      y: 0,
      w: buttonWidthMini,
      h: buttonHeighMini,
      normal_color: 0xAD3C23,
      press_color: 0xD14221,
      radius: buttonHeighMini / 2,
    })

    topBarComponent.createWidget(hmUI.widget.BUTTON, {
      x: 0,
      y: 0,
      w: buttonWidthMini,
      h: buttonHeighMini,
      normal_src: 'ic_del_32px.png',
      press_src: 'ic_del_32px.png',
      click_func: () => {
    
        removeAllNotes();
      }
    })

    topBarComponent.createWidget(hmUI.widget.BUTTON, {
      x: buttonWidthMini + margin,
      y: 0,
      w: buttonWidthMini,
      h: buttonHeighMini,
      normal_color: 0x0986D4,
      press_color: 0x0986D4,
      radius: buttonHeighMini / 2,
    })

    topBarComponent.createWidget(hmUI.widget.BUTTON, {
      x: buttonWidthMini + margin,
      y: 0,
      w: buttonWidthMini,
      h: buttonHeighMini,
      normal_src: 'ic_add_32px.png',
      press_src: 'ic_add_32px.png',
      click_func: () => {
    
        hmApp.gotoPage({ file: 'page/keyboard' });
      }
    })

  } else {
    topBarComponent.setProperty(hmUI.prop.VISIBLE, false);
  }
}

doubleClickToEditItem = function (index, textReminder) {
  let nowClick = Date.now();
  if (nowClick - lastClick < 1000) {
    if (lastButton == index) {
      messageBuilder.request({
        method: 'DELETE_A_NOTE',
        params: {
          savedNotesStr: index
        }
      }).then(data => {
        getApp()._options.globalData.currentText = textReminder;
        hmApp.gotoPage({ file: 'page/keyboard' });
      })
        .catch((res) => {
          initDialogError();
        })
    }
  }

  lastButton = index;
  lastClick = nowClick;
}

showNotesList = function (dataArray) {


  for (let index = 0; index < scrollListItems.length; index++) {
    hmUI.deleteWidget(scrollListItems[index][0]);
    if (index !== scrollListItems.length - 1) {
      hmUI.deleteWidget(scrollListItems[index][1]);
      hmUI.deleteWidget(scrollListItems[index][2]);
      hmUI.deleteWidget(scrollListItems[index][3]);
    }
  }


  const yMargin = topBarY + buttonHeighMini + margin;

  let heightButton = yMargin;

  for (let index = 0; index < dataArray.length; index++) {

    const medidas = hmUI.getTextLayout(dataArray[index].savedNotesStr, {
      text_size: 30,
      text_width: width - buttonWidthMini - margin * 2,
      wrapped: 1
    })

    const rowData = hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 0,
      y: heightButton,
      w: width - buttonWidthMini - margin,
      h: medidas.height + margin,
      normal_color: 0x333333,
      press_color: 0x888888,
      radius: 16,
    })

    const displayText = hmUI.createWidget(hmUI.widget.TEXT, {
      x: margin,
      y: heightButton,
      w: width - buttonWidthMini - margin * 2,
      h: medidas.height + margin,
      color: 0xffffff,
      text_size: 30,
      align_h: hmUI.align.LEFT,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.WRAP,
      char_space: 0,
      line_space: 0,
      text: dataArray[index].savedNotesStr,
    })
    displayText.addEventListener(hmUI.event.CLICK_DOWN, function (info) {
      doubleClickToEditItem(index, dataArray[index].savedNotesStr);
    })

    const rowDelButton = hmUI.createWidget(hmUI.widget.BUTTON, {
      x: width - buttonWidthMini,
      y: heightButton,
      w: buttonWidthMini,
      h: medidas.height + margin,
      normal_color: 0xAD3C23,
      press_color: 0xD14221,
      radius: 16,
    })

    const rowDelButtonImg = hmUI.createWidget(hmUI.widget.BUTTON, {
      x: width - buttonWidthMini,
      y: heightButton,
      w: buttonWidthMini,
      h: medidas.height + margin,
      normal_src: 'ic_del_32px.png',
      press_src: 'ic_del_32px.png',
      click_func: () => {
        initDialogDeleteANote(index, dataArray[index].savedNotesStr);
      }
    })
    let rowItem = [];
    rowItem.push(rowData, rowDelButton, rowDelButtonImg, displayText);
    scrollListItems.push(rowItem);

    heightButton += medidas.height + margin * 2;

  }

  const endOfScreen = hmUI.createWidget(hmUI.widget.TEXT, {
    x: margin,
    y: yMargin + (heightButton + margin) * dataArray.length,
    w: (width - margin * 2),
    h: heightButton,
    text: '',
    text_size: 0,
  })
  let rowItem = [];
  rowItem.push(endOfScreen);
  scrollListItems.push(rowItem);



  showtopBar(dataArray);
  hmUI.scrollToPage(0, false);
}

loadNotesListAndShow = function (data) {

  let { savedNotesStr } = data

  if (savedNotesStr && savedNotesStr.slice(-1).indexOf("/") > -1) {
    savedNotesStr = savedNotesStr.slice(0, -1)
  }
  notesList = savedNotesStr && savedNotesStr.length > 0 ? savedNotesStr.split('/') : [];

  if (notesList && notesList.length > 0) {

    dataArray = [];
    for (let i = 0; i < notesList.length; i++) {
      dataArray.push({ savedNotesStr: notesList[i], img_src: '/ic_del_32px.png' });
    }



    showNotesList(dataArray);

  } else {
    hmApp.gotoPage({ file: 'page/nonotes' })
  }
}

udapteNotesList = function () {

  
  let testemsg
  try {
    testemsg = messageBuilder.request({
      method: 'GET_NOTES',
      params: {
        savedNotesStr: ''
      }
    })
  } catch (e) {
    
    initDialogError();
  }
  testemsg.then(data => {
    
    loadNotesListAndShow(data);
    getApp()._options.globalData.currentText = '';
  })
    .catch((res) => {
      
      initDialogError();
    })

}

getMultiClickTimeout = function () {
  messageBuilder.request({
    method: 'GET_KBD_MTCLK_TOUT',
    params: {
      multiClickTimeout: 1000
    }
  }).then(data => {
    getApp()._options.globalData.multiClickTimeout = data.multiClickTimeout;
  })
    .catch((res) => {
      initDialogError();
    })
}

Page({
  build() {
    hmUI.setScrollView(false);
    // receive a message from the Side Service
    messageBuilder.on('call', ({ payload: buf }) => {
      // call the messageBuilder.buf2Json method to convert the buffer to a JS JSON object
      const data = messageBuilder.buf2Json(buf);
      let { savedNotesStr } = data
      notesList = savedNotesStr && savedNotesStr.length > 0 ? savedNotesStr.split('/') : [];

      udapteNotesList();
    })

    udapteNotesList();
  }
})
