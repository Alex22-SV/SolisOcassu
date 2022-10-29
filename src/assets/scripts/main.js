const serverReference = document.getElementById("serverIdInput");
const form = document.getElementById("featuresForm");
const startServerBtn = document.getElementById("startServerBtn");
const stopServerBtn = document.getElementById("stopServerBtn");
const restartServerBtn = document.getElementById("restartServerBtn");
const getServerLogBtn = document.getElementById("getServerLogBtn");
const getServerRamBtn = document.getElementById("getServerRamBtn");
const getServerMotdBtn = document.getElementById("getServerMotdBtn");
const results = document.getElementById("results");
const errors = document.getElementById("errors");
const serverURL = 'http://localhost:4001/';



form.addEventListener('submit', e => {
    e.preventDefault();
})

// Start the server
startServerBtn.addEventListener("click", () => {
    if(serverReference.value == ""){
        // show some kind of warning.
        serverIsNullError("start");
        return;
    } else {
        createResultsP("start", serverReference.value);
        sendURL("start", serverReference.value);
    }
});

// Stop the server
stopServerBtn.addEventListener("click", () => {
    if(serverReference.value == ""){
        // show some kind of warning.
        serverIsNullError("stop");
        return;
    } else {
        createResultsP("stop", serverReference.value);
        sendURL("stop", serverReference.value);
    }
});

// Restart the server
restartServerBtn.addEventListener("click", () => {
    if(serverReference.value == ""){
        // show some kind of warning.
        serverIsNullError("restart");
        return;
    } else {
        createResultsP("restart", serverReference.value);
        sendURL("restart", serverReference.value);
    }
});

// Get the server log
getServerLogBtn.addEventListener("click", () => {
    if(serverReference.value == ""){
        // show some kind of warning.
        serverIsNullError("getserverlog");
        return;
    } else {
        createResultsP("getlog", serverReference.value);
        sendURL("getlog", serverReference.value);
    }
});

// Get the server RAM
getServerRamBtn.addEventListener("click", () => {
    if(serverReference.value == ""){
        // show some kind of warning.}
        serverIsNullError("getserverram");
        return;
    } else {
        createResultsP("getram", serverReference.value);
        sendURL("getram", serverReference.value);
    }
});
getServerMotdBtn.addEventListener("click", () => {
    if(serverReference.value == ""){
        // show some kind of warning.}
        serverIsNullError("getservermotd");
        return;
    } else {
        createResultsP("getmotd", serverReference.value);
        sendURL("getmotd", serverReference.value);
    }
});

function sendURL(option, serverReference){
    window.location.href = `${serverURL}${option}?server=${serverReference}`;
}

function createResultsP(action, server){
    const paragraph = document.createElement('p');
    paragraph.classList.add('result');
    
    if(action == "start"){
        paragraph.innerHTML = `We will try to start the server <b>${server}</b> !`;
    } else if(action == "stop"){
        paragraph.innerHTML = `We will try to stop the server <b>${server}</b> !`;
    } else if(action == "restart"){
        paragraph.innerHTML = `We will try to restart the server <b>${server}</b> !`;
    } else if (action == "getlog"){
        paragraph.innerHTML = `We will try to give you the server log of <b>${server}</b>!`;
    } else if (action == "getram") {
        paragraph.innerHTML = `We will try to give you the server RAM of <b>${server}</b>!`;
    } else if (action == "getmotd") {
        paragraph.innerHTML = `We will try to give you the server MOTD of <b>${server}</b>!`;
    }
    results.appendChild(paragraph);
}

function createErrorP(reason, action) {
    const errorsParagraph = document.createElement('p');
    errorsParagraph.classList.add('error');
    if(reason == "nullserver") {
        switch (action) {
            case "start":
                errorsParagraph.innerHTML = `You tried to start your server, but you did not add a server address, name or ID.`;
                break;
            case "stop":
                errorsParagraph.innerHTML = `You tried to stop your server, but you did not add a server address, name or ID.`;   
                break;
            case "restart":
                errorsParagraph.innerHTML = `You tried to restart your server, but you did not add a server address, name or ID.`;
                break;   
            case "getserverlog":
                errorsParagraph.innerHTML = `You tried to get your server log, but you did not add a server address, name or ID.`; 
                break;
            case "getserverram":
                errorsParagraph.innerHTML = `You tried to get your server RAM, but you did not add a server address, name or ID.`;
                break;      
            case "getservermotd": 
                errorsParagraph.innerHTML = `You tried to get your server MOTD, but you did not add a server address, name or ID.`;
                break;    
            default: 
                return; 
        }
           
        
    }
    errors.append(errorsParagraph);

}
// Throw error when user does not type the server reference
function serverIsNullError(action){
    createErrorP("nullserver", action);
}