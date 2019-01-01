//const Discord = require('C:\\Users\\Fly\\node_modules\\discord.js');
const Discord = require('discord.js');
const client = new Discord.Client();
//requires the bot prefix and token from seperate files
//const botPrefix = require('./botprefix.json');
//const botToken = require('./bottoken.json');

//const xp = require('./xp.json');

//command handler
client.commands = new Discord.Collection();
const fs = require("fs");
fs.readdir('./commands/', (err, files) => {
	if(err) console.log(err);
 
	//split the file name by "."(testing.js -> ["testing", "js"] and if the last element is "js", it gets added
	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(files.length <= 0) {
		console.log("There are no commands in this folder.");
		return;
	}
	console.log(`Loading ${jsfiles.length} files`);
	//goes through the files, requires each one, and sets it in the commands map, name as key and file as value
	jsfiles.forEach((f, i) => {
		let getFile = require(`./commands/${f}`)
		console.log(`File ${i+1}: ${f}`);
		client.commands.set(getFile.help.name, getFile);
	});
}); 


client.on('ready' , () => {
	console.log("Andrew's bot is online!");
});

client.on('message', async message => {
	if(message.channel.type === "dm") return;
	if(message.author.bot) return;
	
	let prefix = "~";
	let messageArray = message.content.split(" ");
	let args = messageArray.slice(1);
	let command = messageArray[0];

	if(!command.startsWith(prefix)) return;

	let cmd = client.commands.get(command.slice(prefix.length));


	if(cmd) cmd.run(client, message, args);
});


client.login(process.env.BOT_TOKEN);
