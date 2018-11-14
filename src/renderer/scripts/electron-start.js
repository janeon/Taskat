/* electron-start.js
 *
 * This is the file that starts up the Electron process, which in turn 
 * loads our react app.  
 */

 // ipcMain allows us to communicate accross renderer and main processes. 
const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// This is how we access the file system. 
const Store = require('electron-store');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.

    mainWindow = new BrowserWindow({
        width: 800, 
        height: 600, 
    });

    // If we have set the ELECTRON_START_URL (meaning we ran 'npm run dev')
    // then use the local host, otherwise navigate to the index.html
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../../build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    // and load the index.html of the app.
    mainWindow.loadURL(startUrl);

    const store = new Store();
    store.set('unicorn', '🦄');
    console.log(store.get('unicorn'));
    //=> '🦄'
    // Use dot-notation to access nested properties
    store.set('foo.bar', true);
    console.log(store.get('foo'));
    //=> {bar: true}
    store.delete('unicorn');
    console.log(store.get('unicorn'));
    
    // Open the DevTools.
    //mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

/*
 * I followed this to set this up 
 * 
 * https://medium.freecodecamp.org/building-an-electron-application-with-create-react-app-97945861647c
 */
