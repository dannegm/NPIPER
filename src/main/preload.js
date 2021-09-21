const { contextBridge, ipcRenderer } = require('electron');

const validChannels = [
    // breakline
    'async::code@change',
    'async::code@executed',
    'window@close',
    'window@minimize',
    'window@maximize',
    'window@fullScreen',
];

contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        on(channel, func) {
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        },
        once(channel, func) {
            if (validChannels.includes(channel)) {
                ipcRenderer.once(channel, (event, ...args) => func(...args));
            }
        },
    },
});
