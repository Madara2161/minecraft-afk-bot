#! /usr/bin/env node

const mf = require('mineflayer');
const readline = require('readline');

const config = require('./config.json');
let quitting = false;

let num = 0;
let interval = null;
let eating = false;
let eatingslot;
let options = {
    host: config.server.address,
    port: config.server.port,
    username: config.user.username,
    password: (process.argv[2] ? process.argv[2] : config.user.pass)
};

if (!process.argv[2] && !config.user.pass) {
    console.log("bot.js - AFK bot");
    console.log("Usage : ./start.sh OU node bot.js");
    return;
}

let bot = mf.createBot(options);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    console.log(username + ": " + message);
});

bot.on('error', function(err) {
    console.log('Error: ' + err.errno);
    if (err.code === undefined) {
        console.log('Incorrect identifier, server inaccessible, or other undefined error');
    }
    console.log('Reconnecting in 60 seconds, Ctrl+C to cancel');
    quitting = true; // Set quitting flag when encountering an error
});

bot.on('end', () => {
    if (quitting) {
        setTimeout(() => {
            console.log('Reconnecting...');
            bot = mf.createBot(options); // Reconnect the bot
        }, 60000); // Reconnect after 60 seconds
        quitting = false; // Reset the quitting flag
    }
});

bot.on('login', () => {
    console.log("| Connection");
});

bot.on('spawn', () => {
    console.log("| Connected");
    if (config.toggle.sneakbydefault) bot.setControlState("sneak", true);
});

// Other event handlers and functionality...

rl.on("line", input =>{
    // Command handling logic...
});

function autofunc() {
    // Autoclick function logic...
}

console.log('Reconnecting in 60 seconds, Ctrl+C to cancel');
