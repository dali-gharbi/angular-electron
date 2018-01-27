import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';

// import node from 'node-loader!./file.node';
// import keybd_event from 'keybd_event.node';
let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

if (serve) {
  require('electron-reload')(__dirname, {
  });
}

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  //Definindo centro da tela principal
  let bounds = screen.getPrimaryDisplay().bounds;
  let x = bounds.x + ((bounds.width - 350) / 2);
  let y = bounds.y + ((bounds.height - 500) / 2);
  // Create the browser window.
  win = new BrowserWindow({
    x: x,
    y: y,
    width: 350,
    height: 500,
    center: true,
    frame: false
  });

  // and load the index.html of the app.
  win.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  if (serve) {
    win.webContents.openDevTools();
    // const keybd_event = require('keybd_event');
    // keybd_event((msg) => {
    //   console.log(msg);
    //   // Prints: 'hello world'
    // });
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q

    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
