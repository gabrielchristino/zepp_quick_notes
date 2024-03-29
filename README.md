# <img src="screenshots/icon.png" width="40" height="40"> Quick notes

A mini app for Zepp OS 1.0 for create quick annotations directly on watch with a T9 keyboard.

## Quick start to a Quick note

When you open the app and no note is created, you'll see this page

<img src="screenshots/en_US/firstpage.png" width="200" height="200">

<br>

To start, click on <span style="border-radius: 50%; background-color: #0986D4; width: 20px; height: 20px; display: inline-block; text-align: center"><img src="assets/336x384-gts-4-mini/ic_add_50px.png" width="20" height="20"></span> blue button, you'll see a simple T9 keyboard. To write a note, tap 'n' times a key until the letter you want appear.


<img src="screenshots/en_US/keyboard.png" width="200" height="200">
<img src="screenshots/en_US/numberkeyboard.png" width="200" height="200">

**Tip**: To enter space, tap 3 times the first key <span style="border-radius: 5%; background-color: #333333; width: 40px; height: 20px; display: inline-block; text-align: center">***,. ?***</span> or you can click the <span style="border-radius: 5%; background-color: #333333; width: 40px; height: 20px; display: inline-block; text-align: center">**␣**</span> button.

**Tip**: Slide from the right to see numbers, more characters and emojis.

**Tip**: To backspace a wrong letter, click on the red button <span style="border-radius: 5%; background-color: #AD3C23; width: 40px; height: 20px; display: inline-block; text-align: center"><img src="assets/336x384-gts-4-mini/ic_delete_64.png" width="20" height="20"></span>

**Tip**: When you've finished, click on the blue button <span style="border-radius: 5%; background-color: #0986D4; width: 40px; height: 20px; display: inline-block; text-align: center"><img src="assets/336x384-gts-4-mini/ic_confirm_52px.png" width="20" height="20"></span>, and your note will be created.

<br>

<img src="screenshots/en_US/noteslist.png" width="200" height="200">

On this screen, you can access the settings by clicking on the gear button <span style="border-radius: 100%; background-color: #333333; width: 20px; height: 20px; display: inline-block; text-align: center"><img src="assets/336x384-gts-4-mini/ic_sys_32px.png" width="20" height="20"></span>

Create a new note, clicking on the add button <span style="border-radius: 50%; background-color: #0986D4; width: 20px; height: 20px; display: inline-block; text-align: center"><img src="assets/336x384-gts-4-mini/ic_add_50px.png" width="20" height="20"></span>

And delete all notes, clicking on the top trash button <span style="border-radius: 50%; background-color: #AD3C23; width: 20px; height: 20px; display: inline-block; text-align: center"><img src="assets/336x384-gts-4-mini/ic_del_50px.png" width="20" height="20"></span>

To delete a specific note, click on the respective trash button <span style="border-radius: 5%; background-color: #AD3C23; width: 20px; height: 20px; display: inline-block; text-align: center"><img src="assets/336x384-gts-4-mini/ic_del_50px.png" width="20" height="20"></span>, at the right of the note.

Double-click a note to edit it.

<br>

## Settings

<img src="screenshots/en_US/settings.png" width="200" height="200">
<img src="screenshots/en_US/timeout.png" width="200" height="200">
<img src="screenshots/en_US/keyboardtype.png" width="200" height="200">
<img src="screenshots/en_US/more.png" width="200" height="200">
<img src="screenshots/en_US/more2.png" width="200" height="200">
<img src="screenshots/en_US/more3.png" width="200" height="200">

<br>

In the settings page you can set the double-click speed, change the keyboard type, read the Hints and About me :D
1. The double-click is the max time required to define if you're multi-clicking a button.

2. Now you have 3 types of keyboards:

    <img src="screenshots/en_US/keyboard.png" width="100" height="100">

    - **T9 Keyboard** : the first and classical one.

    <br>

    <img src="screenshots/en_US/keyboardfull.png" width="100" height="100">

    - **Extended keyboard** : a QWERTY one to quick type any letter.

    <br>

    <img src="screenshots/en_US/keyboardsplit.png" width="100" height="100">
    <img src="screenshots/en_US/keyboardsplit2.png" width="100" height="100">

    - **Split keyboard**: a QWERTY one but in 2 screens for big letters, easy to see and type.

## Add notes on your phone

Now you can add notes directly on the Settings page in the Zepp app, and it'll synchronize on your watch.

When you first open, you'll see this page.

<img src="screenshots/en_US/phoneside_nonotes.png" width="200" height="200">
<img src="screenshots/en_US/phoneside_addnote.png" width="200" height="200">
<img src="screenshots/en_US/phoneside_noteslist.png" width="200" height="200">

<br>

Click on <span style="border-radius: 5px; background-color: #0986D4; height: 20px; padding: 5px; display: inline-block; text-align: center">Add a note</span> to create a note.

Click on <span style="border-radius: 5px; background-color: #AD3C23; height: 20px; padding: 5px; display: inline-block; text-align: center">Remove all?</span> to delete all notes at once.

Click on <span style="border-radius: 5px; background-color: #AD3C23; height: 20px; padding: 5px; display: inline-block; text-align: center">delete</span> to delete a specific note.


<br>

## The code

1. **page** directory you can view the screens of the project.

    - **nonotes.js** is the page when there is no note created.

    - **keyboard.js** is the page containing the keyboard, to created a new note.

    - **index.js** contains the notes list and some buttons.

    - **settings.js** the menu to the setting options.

    - **more.js** some hints and about me :D

    - **doubleclick.js** where you can change the double-click timeout.

    - **i18n** contains the translations to others languages, more will be added in the future.

2. **assets** there are all the icons and images used in the project.

3. **shared** the are the commons from ZeppOS, like Filesystem, Message builder, Logger and more.

4. **utils** I created some things to simplify the code, like Constants and UI components.

5. **app-side** Here is the communication between the watch and your phone.

6. **setting** This is the phone side notes list.
<br><br>
# Buy me a coffee

Help me to keep going!

https://www.buymeacoffee.com/gabrielchris