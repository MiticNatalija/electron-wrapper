// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//     setTitle: (title) => ipcRenderer.send('set-title', title)
// });

const {
    contextBridge,
    ipcRenderer
} = require("electron");

console.log("In preload.js");
ipcRenderer.on("event1", (a, b) => {});
console.log(`Added event successfully in preload? ${Object.keys(ipcRenderer._events).length === 1 ? "Yes" : "No"}`);

contextBridge.exposeInMainWorld(
    "electron", {
        ipcRenderer: ipcRenderer
    }
);