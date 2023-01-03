import * as fs from './../utils/fs'
import * as ui from '../utils/ui'

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

let multiClickTimeout = 1000;

let dialogAbout;

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

initDialogDeleteANote = function (indexToDelete, textReminder) {
  dialogDeleteAllConfirm = hmUI.createDialog({
    title: 'Delete this note? \n' + textReminder,
    auto_hide: true,
    click_linster: ({ type }) => {
      if (type == 1) {
        fs.removeItemTodoList(indexToDelete)
        udapteNotesList();
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
        fs.deleteTodoList();
        udapteNotesList();
      }
    }
  })
  dialogDeleteAllConfirm.show(true)
}

showtopBar = function (dataArray) {
  if (dataArray && dataArray.length > 0) {

    const buttonsItens = [
      {
        color: 0xAD3C23,
        icon: 'ic_del_32px.png',
        callback:  function() {
          initDialogDeleteAll()
        }
      },
      {
        color: 0x0986D4,
        icon: 'ic_add_32px.png',
        callback: function() {
            getApp()._options.globalData.currentText = '';
            hmApp.gotoPage({ file: 'page/keyboard' });
        }
      },
      {
        color: 0x333333,
        icon: 'ic_sys_32px.png',
        callback: function() {
          hmApp.gotoPage({ file: 'page/settings' });
        }
      },
    ]

    ui.createTopBar(buttonsItens);

  } else {
    topBarComponent.setProperty(hmUI.prop.VISIBLE, false);
  }
}

doubleClickToEditItem = function (indexToDelete, textReminder) {
  let nowClick = Date.now();
  if (nowClick - lastClick < multiClickTimeout) {
    if (lastButton == indexToDelete) {
      fs.removeItemTodoList(indexToDelete)
      getApp()._options.globalData.currentText = textReminder;
      hmApp.gotoPage({ file: 'page/keyboard' });
    }
  }

  lastButton = indexToDelete;
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

loadNotesListAndShow = function () {
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
  notesList = fs.readTodoList();
  loadNotesListAndShow();
}

getMultiClickTimeout = function () {
  multiClickTimeout = fs.readKeyBoardMultiTimeout();
}

setGestureEvent = function () {
  hmApp.registerGestureEvent(function (event) {
    switch (event) {
      case hmApp.gesture.LEFT:
        hmApp.gotoPage({ file: 'page/settings' })
        break
      default:
        break
    }
    return false
  })
}

Page({
  build() {
    hmUI.setScrollView(false);
    hmUI.updateStatusBarTitle('Quick notes');
    getMultiClickTimeout();
    setGestureEvent();
    udapteNotesList();
  }
})
