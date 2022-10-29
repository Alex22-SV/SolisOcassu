const express = require('express');
const cors = require('cors');
const app = express();
const API_KEY = "";
const {Client} = require('exaroton');
const exarotonClient = new Client(API_KEY);

async function manageServer(action, serverReference){
    let serverLists = await exarotonClient.getServers();
    let server = serverLists.find(server => server.name === serverReference || server.id === serverReference || server.address === serverReference);
    if(action == "start"){
        try {
            await server.start();
        } catch(e) {
            console.error(e);
        }
    } else if(action == "stop"){
        try {
            await server.stop();
        } catch(e) {
            console.error(e);
        }
    } else if(action == "restart"){
        try {
            await server.restart();
        } catch(e) {
            console.error(e);
        }
    } else if(action == "getlog"){
        try {
            let log = await server.shareLogs();
            return log;

        } catch(e) {
            console.error(e);
        }    
    } else if(action == "getram"){
        try {
            let ram = await server.getRAM();
            console.log(ram);
            return ram;
        } catch(e) {
            console.error(e);
        }   
    } else if(action == "getmotd"){
        try {
            let motd = await server.getMOTD();
            return motd;
        } catch(e) {
            console.error(e);
        }   
    } else {
        console.log("Invalid action");
    }
}

app.use(cors());
app.listen(4001, () => {
    console.log('Server with port 4001 successfully started.');
});

app.get('/start', (req,res) => {
    manageServer("start", req.query.server);
});

app.get('/stop', (req,res) => {
    manageServer("stop", req.query.server);
    res.send('Stopping the server ' + req.query.server);
});

app.get('/restart', (req,res) => {
    manageServer("restart", req.query.server);
    res.send('Restarting the server ' + req.query.server);
});
app.get('/getlog', (req,res) => {
    res.send(manageServer("getlog", req.query.server));
    res.send('Getting server ' + req.query.server + ' log');
});
app.get('/getram', (req,res) => {
    res.send('Getting server ' + req.query.server + ' RAM');
    let ram = manageServer("getram", req.query.server);
    console.log(ram);
    return ram;
});
app.get('/getmotd', (req,res) => {
    manageServer("getmotd", req.query.server);
    res.send('Getting server ' + req.query.server + ' MOTD');
})