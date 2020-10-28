// Import discord.js
const Discord = require("discord.js");

// Import fs
const fs = require("fs");

// Create RomeBot class
class RomeBot extends Discord.Client {

	constructor (options) {
		super(options);
		this.config = require("../config"); // Load the config file
		this.commands = new Discord.Collection(); // Create new commands collection
		this.aliases = new Discord.Collection(); // Create new command aliases collection
	};

	// Create an function loadCommand
	loadCommand(commandPath, commandName) {
        // Try to:
		try {

            // Get the file
            const file = new(require(`.${commandPath}/${commandName}`))(this);
            
            // Check if the file is init 
            if(file.init) file.init(this);

            // Set in the collection "commands" the file and his name
            this.commands.set(file.help.name, file);

            // For each aliases
            file.help.aliases.forEach(alias => { 
            
            // Set in the collection aliases
            this.aliases.set(alias, file.help.name);
            });
			return false;
		} catch (e) {
            // If error send "Unbalte to load command: commandName: error"
			return "Unable to load command " + commandName + ":" + e;
		};
    };
    
    init = async () => {

        // Read all files in the "commands" file
        fs.readdir("./commands/", (err, files) => {

            // If there is an error log it and stop the code
            if(err) return console.log(err);

            // Get all files who end with ".js"
            let jsfile = files.filter(f => f.split(".").pop() === "js");

            // If there is no commands log "There is no commands !"
            if(jsfile.length <= 0) return console.error("There is no commands !")
            
            // For each "jsfile"
            jsfile.forEach((f, i) =>{
                // Get the file
                let file = require(`../commands/${f}`);

                // Log "Commands: file was succesfully loaded"
                console.log(`Commands: ${f} was succesfully loaded !`);

                // Load the command
                this.loadCommand("./commands",f);
            });
        });

        // Read all files in the "events" file
        fs.readdir("./events/", (err, files) => {

            // If there is an error log it and stop the code
            if(err) return console.log(err);

            // Get all files who end with ".js"
            let jsfile = files.filter(f => f.split(".").pop() === "js");

            // If there is no events log "There is no events !"
            if(jsfile.length <= 0) return console.error("There is no events !")
            
            // For each "jsfile"
            jsfile.forEach((file) =>{
                
                // Get the file
                const event = new(require(`../events/${file}`))(this);

                // Get the name of the event
                const eventName = file.split(".")[0];

                // Log "Events: file was succesfully loaded"
                console.log(`Events: ${file} was succesfully loaded !`);

                // Run the event when he is call
                this.on(eventName, (...args) => event.run(...args));

                // Delete cache
                delete require.cache[require.resolve(`../events/${file}`)];
            });
        });
    };
};

module.exports = RomeBot;