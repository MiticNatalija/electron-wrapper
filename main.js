const {app, BrowserWindow, ipcMain, globalShortcut} = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

let win

if (require('electron-squirrel-startup')) return; //app.quit()


app.on('ready', _ => {
    win = new BrowserWindow({
    width: 800,
    height: 600,
    kiosk: true
    });

    //const menu = Menu.buildFromTemplate([]);
   // Menu.setApplicationMenu(menu);
   // win.loadURL(path.resolve(process.argv0));    // npm run start ---http://localhost:4200/
    win.loadFile('index.html');  

     globalShortcut.register('Control+Shift+D', () => {
        win.webContents.toggleDevTools();
    });
    globalShortcut.register('Control+Shift+K', () =>{
        win.kiosk = !win.kiosk;
    });
    globalShortcut.register('Control+Shift+R', () =>{
        app.relaunch();
        app.exit();
    });

    win.once('ready-to-show', () => {
      autoUpdater.checkForUpdatesAndNotify();
    });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// app.on('activate', function () {
//   if (mainWindow === null) {
//     createWindow();
//   }
// });

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('update-available', () => {
  win.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  win.webContents.send('update_downloaded');
});
ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});