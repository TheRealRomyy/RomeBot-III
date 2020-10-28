// Import the model "command"
const Command = require("../structure/Commands");

// Create class ping who extend command class
class Ping extends Command {
	constructor (client) {
		super(client, {
			name: "ping",
			aliases: ['latency'],
		});
	};
    
    // Run the command with message and args
	async run (message, args) {

		// Get the client
		const client = this.client;

        // Send to the channel of the message "Pong !" with the bot's ping
        message.channel.send("Pong ! ( " + client.ws.ping + "ms )");
		
	};
};

// Exports the command with name "ping"
module.exports = Ping;