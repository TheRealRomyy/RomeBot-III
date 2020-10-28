// Import the model "command"
const Command = require("../structure/Commands");

// Create class args who extend command class
class Args extends Command {
	constructor (client) {
		super(client, {
			name: "args",
			aliases: [''],
		});
	};
    
    // Run the command with message and args
	async run (message, args) {

		// Get the client
		const client = this.client;

        // If there is no args 0 send to the channel : "There is no args !"
        if(!args[0]) return message.channel.send("There is no args !")

        /* Send to the channel : "Your first arg is:" with the first args 
        and "Your args were :" with all args (with the discord markdown) */
        message.channel.send("__Your first arg is:__ **" + args[0] + "** \n__Your args were:__ **" + args.join(" ") + "**");
		
	};
};

// Exports the command with name "args"
module.exports = Args;