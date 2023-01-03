const width = 336;
const height = 380;
const buttonWidth = 50;
const buttonWidthMargin = 102;
const buttonHeight = 50;
const margin = 15;
const buttonWidthMini = 60;
const buttonHeighMini = 60;
const topBarY = 50;

/* parameters to create a menu list
const menuItems = [
    {
        description: 'Double-click speed',
        icon: 'ic_gesture_50px.png',
        page: 'page/doubleclick'
    }
]
*/
export function createMenuList(menuItems) {
    let heightButton = (buttonHeight + margin);
    for (let index = 0; index < menuItems.length; index++) {
        const textSize = menuItems[index].title ? px(36) : px(24);
        const itemWidth = menuItems[index].title ? width - (margin * 2) : menuItems[index].page != '' ? width - (margin + buttonWidth * 2) : width - (margin + buttonWidth);
        const medidas = hmUI.getTextLayout(menuItems[index].description, {
            text_size: textSize,
            text_width: itemWidth,
            wrapped: 1
        })
        const itemHeight = medidas.height > 50 ? medidas.height : 50;
        const itemAlign = menuItems[index].title ? hmUI.align.CENTER_H : hmUI.align.LEFT;

        const imgIcon = hmUI.createWidget(hmUI.widget.IMG, {
            x: margin,
            y: heightButton,
            src: menuItems[index].icon
        })

        const titleSettingsPage = hmUI.createWidget(hmUI.widget.TEXT, {
            x: menuItems[index].title ? margin : margin + buttonWidth,
            y: heightButton,
            w: itemWidth,
            h: itemHeight,
            color: 0xffffff,
            text_size: textSize,
            align_h: itemAlign,
            align_v: hmUI.align.CENTER_V,
            text_style: hmUI.text_style.WRAP,
            text: menuItems[index].description
        })

        if (menuItems[index].page != '') {
            const imgArrow = hmUI.createWidget(hmUI.widget.IMG, {
                x: width - buttonHeight - margin,
                y: heightButton + 2,
                src: 'ic_right_arrow.png'
            })
            imgIcon.addEventListener(hmUI.event.CLICK_DOWN, function (info) {
                hmApp.gotoPage({ file: menuItems[index].page })
            })

            titleSettingsPage.addEventListener(hmUI.event.CLICK_DOWN, function (info) {
                hmApp.gotoPage({ file: menuItems[index].page })
            })

            imgArrow.addEventListener(hmUI.event.CLICK_DOWN, function (info) {
                hmApp.gotoPage({ file: menuItems[index].page })
            })
        }

        heightButton += medidas.height + margin * 2;
    }
    const endOfScreen = hmUI.createWidget(hmUI.widget.TEXT, {
        x: margin,
        y: heightButton,
        w: (width - margin * 2),
        h: 50,
        text: '',
        text_size: 0,
    })
}

/* parameters to create a top bar
const buttonsItens = [
    {
        color: 0x333333,
        icon: 'ic_sys_32px.png',
        callback:  function() {
          console.log('')
        }
    }
]
*/
export function createTopBar(buttonsItens) {
    for (let index = 0; index < buttonsItens.length; index++) {

        topBarComponent = hmUI.createWidget(hmUI.widget.GROUP, {
            x: width / 2 - ((buttonWidthMini + margin) * buttonsItens.length - margin) / 2,
            y: topBarY,
            w: (buttonWidthMini + margin) * buttonsItens.length,
            h: buttonHeighMini,
        })

        topBarComponent.createWidget(hmUI.widget.BUTTON, {
            x: (buttonWidthMini + margin) * index,
            y: 0,
            w: buttonWidthMini,
            h: buttonHeighMini,
            normal_color: buttonsItens[index].color,
            press_color: buttonsItens[index].color,
            radius: buttonHeighMini / 2,
        })

        topBarComponent.createWidget(hmUI.widget.BUTTON, {
            x: (buttonWidthMini + margin) * index,
            y: 0,
            w: buttonWidthMini,
            h: buttonHeighMini,
            normal_src: buttonsItens[index].icon,
            press_src: buttonsItens[index].icon,
            click_func: () => {
                buttonsItens[index].callback();
            }
        })
    }
}