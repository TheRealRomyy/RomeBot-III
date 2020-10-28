// Import the file "RomeBot"
const RomeBot = require("./structure/RomeBot");

// Create the client in this constructor
const client = new RomeBot();

// Init our client (function create in RomeBot.js)
client.init();

// Login the bot with the config token
client.login(client.config.token);