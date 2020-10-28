// Import path
const path = require("path");

// Create the class Command 
module.exports = class Command {
	constructor(client, {
		name = null,
		dirname = false,
		aliases = new Array(),
	})
	{
        // Create a constant "category"
		const category = (dirname ? dirname.split(path.sep)[parseInt(dirname.split(path.sep).length-1, 10)] : "Other");
        
        // Get client
        this.client = client;
        
        // Get the .help
        this.help = { name, category, aliases };
	}
};