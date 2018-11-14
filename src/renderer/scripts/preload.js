/*
 * This is a bit of a hack to get around the fact that electron and webpack aren't allowing 
 * electron-store to write to files (it is leaving the 'fs' module undefined).
 */

const { ipcRenderer }  = require('electron');

window.ipcRenderer = ipcRenderer;

console.log(ipcRenderer);