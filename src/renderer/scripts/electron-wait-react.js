/* electron-wait-react.js 
 *
 * This is only relevant to the development phase. 
 *  
 * This is a script that waits for the React dev server to start 
 * before it starts Electron.
 */

const net = require('net');
const port = process.env.PORT ? (process.env.PORT - 100) : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => client.connect({port: port}, () => {
        client.end();
        if(!startedElectron) {
            console.log('starting electron');
            startedElectron = true;
            const exec = require('child_process').exec;
            exec('npm run electron');
        }
    }
);

tryConnection();

client.on('error', (error) => {
    setTimeout(tryConnection, 1000);
});

/*
 * I got this from here: 
 * 
 * https://medium.freecodecamp.org/building-an-electron-application-with-create-react-app-97945861647c
 */
