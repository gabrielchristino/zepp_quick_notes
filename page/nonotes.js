import { gettext } from 'i18n'
const deviceInfo = hmSetting.getDeviceInfo()
const { width, height, screenShape } = deviceInfo

const logger = DeviceRuntimeCore.HmLogger.getLogger('no-notes')

//const width = 336;
//const height = 380;
const buttonWidth = 100;
const buttonWidthMargin = 102;
const buttonHeight = 60;
const buttonHeightMargin = 62;
const groupHeight = 5 * buttonHeightMargin;
const margin = 15;

let buttonStartAddANewNote;

let keyboardSelected = '';

showNoNotesMessage = function () {
  const displayText = hmUI.createWidget(hmUI.widget.TEXT, {
    x: (width - (width - margin * 2)) / 2,
    y: 30,
    w: width - margin * 2,
    h: height - buttonHeight - 50 - 80,
    color: 0xffffff,
    text_size: 30,
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.WRAP,
    char_space: 0,
    line_space: 0,
    text: gettext('noNotesCreated')
  })

  const settingsInfo = hmUI.createWidget(hmUI.widget.TEXT, {
    x: (width - (width - margin * 2)) / 2,
    y: height - buttonHeight * 2 - 80,
    w: width - margin * 2,
    h: 80,
    color: 0xb2b2b2,
    text_size: 24,
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.WRAP,
    char_space: 0,
    line_space: 0,
    text: gettext('swipeRightToSettings')
  })

  buttonStartAddANewNote = hmUI.createWidget(hmUI.widget.BUTTON, {
    x: (width - (width - margin * 2)) / 2,
    y: height - margin - buttonHeightMargin - 30,
    text: gettext('createFirstNote'),
    text_size: 30,
    w: width - margin * 2,
    h: buttonHeight,
    radius: buttonHeight / 2,
    normal_color: 0x333333,
    press_color: 0x888888,
    click_func: () => {
      hmApp.gotoPage({ file: `page/${keyboardSelected}` })
    }
  })
}

Page({
  build() {
    let indexKeyboard = getApp()._options.globalData.keyboardTypeSelected;
    indexKeyboard = indexKeyboard > 1 ? 1 : indexKeyboard;
    keyboardSelected = getApp()._options.globalData.keyboardType[indexKeyboard];

    hmUI.setScrollView(false);

    hmUI.updateStatusBarTitle(gettext('quickNotes'));
    setGestureEvent();
    showNoNotesMessage();
  }
})