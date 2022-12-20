const {app, BrowserWindow, ipcMain, globalShortcut, Notification} = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

let win

if (require('electron-squirrel-startup')) return; //app.quit()
const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process v1.2.7'

function showNotification () {
  let not = new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY });
  not.show();
}

function sendStatusToWindow(text) {
  win.webContents.send('message', text);
}
autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
});
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded');
  autoUpdater.quitAndInstall();  
});

app.on('ready', _ => {
    win = new BrowserWindow({
    width: 800,
    height: 600,
    kiosk: false,
    webPreferences:{
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname,'preload.js')
    }
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

    globalShortcut.register('Control+Shift+N', () =>{
      showNotification();
  });

    autoUpdater.checkForUpdatesAndNotify();
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

// ipcMain.on('app_version', (event) => {
//   event.sender.send('app_version', { version: app.getVersion() });
// });

// autoUpdater.on('update-available', () => {
//   showNotification();
//   win.webContents.send('update_available');
// });
// autoUpdater.on('update-downloaded', () => {
//   win.webContents.send('update_downloaded');
// });

// ipcMain.on('restart_app', () => {
//   autoUpdater.quitAndInstall();
// });