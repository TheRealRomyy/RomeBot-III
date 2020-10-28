// Get the event "message"
module.exports = class {
    constructor(client) {
        
        // Get the client
        this.client = client;
    }

    // Run the event
    async run(message) {

        // create a variable client who is the client
        const client = this.client;
        
        // Check if the bot is mentioned
        if(message.content === `<@!${client.user.id}>`) {

            // Send in the channel "Hello" with the name of the user (with discord markdown)
            message.channel.send("Hello **" + message.author.tag + "** !");

        };  

        // Check if the message not start with the prefix : "?" who is in config
        if(!message.content.startsWith(client.config.prefix)) return;

        // Check if the message author is a bot
        if(message.author.bot) return;

        // Check if the channel type is not DM
        if(message.channel.type === "dm") return;

        // Get the args, the commandName and the cmd (in collections)
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
        const cmd = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
        
        // If there is a command with name / aliases
        if(cmd) {

        // run the cmd
        cmd.run(message, args);

        // log : "Command executed: name of the command By: author"
        console.log("Command executed: " + cmd.help.name + " By: " + message.author.tag)

        } else {
            // Else stop the code
            return;
        ;}
    };
};