import { gettext } from 'i18n'
import * as fs from './../utils/fs'
import * as ui from '../utils/ui'

const deviceInfo = hmSetting.getDeviceInfo()
const { width, height, screenShape } = deviceInfo

const logger = DeviceRuntimeCore.HmLogger.getLogger('demo')
const { messageBuilder } = getApp()._options.globalData

const buttonWidthMini = 60;
const buttonHeighMini = 60;
const margin = 16;
const topBarY = 65;

let notesList = [];
let dataArray = [];

let multiClickTimeout = 1000;

let scrollListItems = [];
let topBarComponent;

let lastButton = 0;
let lastClick = 0;

let keyboardSelected = '';

initDialogDeleteANote = function (indexToDelete, textReminder) {
  dialogDeleteAllConfirm = hmUI.createDialog({
    title: `${gettext('deleteThisNote')}\n${textReminder}`,
    auto_hide: true,
    click_linster: ({ type }) => {
      if (type == 1) {
        fs.removeItemTodoList(indexToDelete, textReminder);
        notesList.splice(indexToDelete, 1);

        fs.addDelList(textReminder);

        udapteNotesList();
      }
    }
  })
  dialogDeleteAllConfirm.show(true)
}

initDialogDeleteAll = function () {
  dialogDeleteAllConfirm = hmUI.createDialog({
    title: gettext('deleteAllNotes'),
    auto_hide: true,
    click_linster: ({ type }) => {
      if (type == 1) {
        fs.delList(fs.readDelList());
        fs.deleteTodoList();
        notesList = [];

        udapteNotesList();
      }
    }
  })
  dialogDeleteAllConfirm.show(true)
}

showtopBar = function () {
  const buttonsItens = [
    {
      color: 0xAD3C23,
      icon: 'ic_del_32px.png',
      callback: function () {
        initDialogDeleteAll()
      }
    },
    {
      color: 0x0986D4,
      icon: 'ic_add_32px.png',
      callback: function () {
        fs.writeLastMessage('');
        hmApp.gotoPage({ file: `page/${keyboardSelected}` });
      }
    },
    {
      color: 0x333333,
      icon: 'ic_sys_32px.png',
      callback: function () {
        hmApp.gotoPage({ file: 'page/settings' });
      }
    },
    {
      color: 0x333333,
      icon: 'ic_refresh_32px.png',
      callback: function () {
        hmApp.reloadPage({ url: 'page/index' });
      }
    },
  ]

  ui.createTopBar(buttonsItens);
}

doubleClickToEditItem = function (indexToDelete, textReminder) {
  let nowClick = Date.now();
  if (nowClick - lastClick < multiClickTimeout) {
    if (lastButton == indexToDelete) {
      fs.writeLastMessage(textReminder);
      fs.removeItemTodoList(indexToDelete, textReminder);
      fs.addDelList(textReminder);

      notesList.splice(indexToDelete, 1);

      hmApp.gotoPage({ file: `page/${keyboardSelected}` });
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
  if (dataArray && dataArray.length > 0) {
    for (let index = 0; index < dataArray.length; index++) {
      const medidas = hmUI.getTextLayout(dataArray[index].savedNotesStr, {
        text_size: px(30),
        text_width: px(width - buttonWidthMini - margin * 2),
        wrapped: 1
      })

      const rowData = hmUI.createWidget(hmUI.widget.BUTTON, {
        x: px(0),
        y: px(heightButton),
        w: px(width - buttonWidthMini - margin),
        h: px(medidas.height + margin),
        normal_color: 0x333333,
        press_color: 0x888888,
        radius: 16,
      })

      const displayText = hmUI.createWidget(hmUI.widget.TEXT, {
        x: px(margin),
        y: px(heightButton),
        w: px(width - buttonWidthMini - margin * 2),
        h: px(medidas.height + margin),
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
        x: px(width - buttonWidthMini),
        y: px(heightButton),
        w: px(buttonWidthMini),
        h: px(medidas.height + margin),
        normal_color: 0xAD3C23,
        press_color: 0xD14221,
        radius: 16,
      })

      const rowDelButtonImg = hmUI.createWidget(hmUI.widget.BUTTON, {
        x: px(width - buttonWidthMini),
        y: px(heightButton),
        w: px(buttonWidthMini),
        h: px(medidas.height + margin),
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
      x: px(margin),
      y: px(yMargin + (heightButton + margin) * dataArray.length),
      w: px((width - margin * 2)),
      h: px(heightButton),
      text: '',
      text_size: 0,
    })
    let rowItem = [];
    rowItem.push(endOfScreen);
    scrollListItems.push(rowItem);
  } else {
    const displayText = hmUI.createWidget(hmUI.widget.TEXT, {
      x: (width - (width - margin * 2)) / 2,
      y: 0,
      w: width - margin * 2,
      h: height,
      color: 0xffffff,
      text_size: 30,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.WRAP,
      char_space: 0,
      line_space: 0,
      text: gettext('noNotesCreated')
    })
    let rowItem = [];
    rowItem.push(displayText);
    scrollListItems.push(rowItem);
  }
  showtopBar();
  hmUI.scrollToPage(0, false);
}

loadNotesListAndShow = function () {
  // if there is some note, list on screen
  dataArray = [];
  if (notesList && notesList.length > 0) {
    notesList.forEach(item => {
      dataArray.push({ savedNotesStr: item, img_src: '/ic_del_32px.png' });
    })
  }
  showNotesList(dataArray);
}

udapteNotesList = function () {
  notesList = fs.readTodoList()

  loadNotesListAndShow();

  messageBuilder
    .request({
      method: 'GET_NOTES'
    })
    .then(({ result }) => {
      var newNoteList = [...notesList, ...result]
      newNoteList = [...new Set(newNoteList)];

      var delList = fs.readDelList();

      newNoteList = newNoteList.filter( elem => delList.indexOf(elem) < 0 )

      messageBuilder
        .request({
          method: 'ADD_NOTES',
          params: { new_items: newNoteList }
        })
        .then(({ result }) => {
          fs.deleteDelList();
        })
        .catch((res) => { })

      notesList = newNoteList;
      fs.addList(notesList);
      
      loadNotesListAndShow();
    })
    .catch((res) => { })
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
  onInit() {
    messageBuilder.on('call', ({ payload: buf }) => {
      const data = messageBuilder.buf2Json(buf)

      if (data.key == 'noteIndexDelete') {
        fs.removeItemTodoList(data.key, data.itemToDelete);
      }

      udapteNotesList();
    })
  },
  build() {
    let indexKeyboard = fs.readKeyBoardType();
    indexKeyboard = indexKeyboard > 1 ? 1 : indexKeyboard;
    keyboardSelected = getApp()._options.globalData.keyboardType[indexKeyboard];

    hmUI.setScrollView(false);
    hmUI.updateStatusBarTitle(gettext('quickNotes'));
    getMultiClickTimeout();
    setGestureEvent();
    udapteNotesList();
  }
})
