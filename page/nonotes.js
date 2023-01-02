const logger = DeviceRuntimeCore.HmLogger.getLogger('no-notes')

const width = 336;
const height = 380;
const buttonWidth = 100;
const buttonWidthMargin = 102;
const buttonHeight = 60;
const buttonHeightMargin = 62;
const groupHeight = 5 * buttonHeightMargin;
const margin = 15;

let buttonStartAddANewNote;

showNoNotesMessage = function () {
  const displayText = hmUI.createWidget(hmUI.widget.TEXT, {
    x: (width * 0) + margin,
    y: 50,
    w: width - margin * 2,
    h: height - buttonHeight - 50 - 80,
    color: 0xffffff,
    text_size: 30,
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.WRAP,
    char_space: 0,
    line_space: 0,
    text: "hello! you have no notes created yet"
  })

  const settingsInfo = hmUI.createWidget(hmUI.widget.TEXT, {
    x: (width * 0) + margin,
    y: height - buttonHeight * 2 - 50,
    w: width - margin * 2,
    h: 80,
    color: 0xb2b2b2,
    text_size: 24,
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.WRAP,
    char_space: 0,
    line_space: 0,
    text: "Swipe from the right to settings"
  })

  buttonStartAddANewNote = hmUI.createWidget(hmUI.widget.BUTTON, {
    x: margin,
    y: height - margin - buttonHeightMargin,
    text: 'create first note',
    text_size: 30,
    w: width - margin * 2,
    h: buttonHeight,
    radius: buttonHeight / 2,
    normal_color: 0x333333,
    press_color: 0x888888,
    click_func: () => {
      hmApp.gotoPage({ file: 'page/keyboard' })
    }
  })
}

Page({
  build() {
    hmUI.updateStatusBarTitle('Quick notes');
    setGestureEvent();
    showNoNotesMessage();
  }
})