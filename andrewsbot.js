const Discord = require('C:\\Users\\Fly\\node_modules\\discord.js');
const client = new Discord.Client();
//requires the bot prefix and token from seperate files
const botPrefix = require('./botprefix.json');
const botToken = require('./bottoken.json');

const xp = require('./xp.json');

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

	// let xpAdd = Math.floor(Math.random() * (20 - 5 + 1) + 5)
	// if(!xp[message.author.id]) {
	// 	xp[message.author.id] = {
	// 		xp: 0,
	// 		level: 0,
	// 		stars: 0,
	// 		tier: 0
	// 	}
	// }
	//adds random xp from 5-20 on message
	// xp[message.author.id].xp += xpAdd;
	//current properties of the message author
	// let curxp = xp[message.author.id].xp;
	// let curlvl = xp[message.author.id].level;
	// let curstars = xp[message.author.id].stars;
	// let curtier = xp[message.author.id].tier;
	//upcoming levels, stars and tiers of message author
	// let nxtLvl = xp[message.author.id].level + 1;
	// let nxtLvlXP = (nxtLvl * 5) * (nxtLvl + 1);
	// let nxtstarlvls = (curstars * 5 + 5);
	// let nxttierlvls = (curtier * 10 + 10);
	// if(false) {	
	// 	//checks for level up
	// 	if(curxp >= nxtLvlXP) {

	// 		xp[message.author.id].level = nxtLvl;
	// 		xp[message.author.id].xp = curxp - nxtLvlXP;
	// 		nxtLvl = xp[message.author.id].level + 1;
	// 		let levelupEmbed = new Discord.RichEmbed()
	// 		.setDescription("🎉Level Up!🎉")
	// 		.setColor("#09e835")
	// 		.addField("Current Level", curlvl + 1, true)
	// 		.addField("XP needed for next level", (nxtLvl * 5)*(nxtLvl + 1), true);
	// 		//waits for message to be deleted until checking to add star
	// 		message.channel.send(levelupEmbed).then(message => {message.delete(5000)});
			
	// 		//checks to add star
	// 		if(xp[message.author.id].level >= nxtstarlvls) {
	// 			xp[message.author.id].stars += 1;

	// 			let starEmbed = new Discord.RichEmbed()
	// 			.setDescription("⭐You got a star!⭐")
	// 			.setColor("#f6ff00")
	// 			.addField("Stars", curstars + 1);
	// 			setTimeout(() => {
	// 				message.channel.send(starEmbed).then(message => {message.delete(5000)})
	// 			}, 6000);
	// 			if(xp[message.author.id].level >= nxttierlvls) {
	// 				xp[message.author.id].tier += 1;

	// 				let tierEmbed = new Discord.RichEmbed()
	// 				.setDescription("⬆️You reached the next tier!⬆️")
	// 				.setColor("#1500ba")
	// 				.setFooter("YOU ARE NOW BEING RESET");

	// 				setTimeout(() => {
	// 					message.channel.send(tierEmbed).then(message => {message.delete(5000)})
	// 				}, 12000);

	// 				setTimeout(() => {
	// 					message.reply("You have been reset");
	// 				}, 18000);

	// 				xp[message.author.id].xp = 0;
	// 				xp[message.author.id].level = 0;
	// 				xp[message.author.id].stars = 0;
	// 			}
	// 		}
	// 	}
	// 	fs.writeFile('./xp.json', JSON.stringify(xp), (err) => {
	// 		if(err) console.log(err)
	// 	});
	// }
	let prefix = botPrefix.prefix;
	let messageArray = message.content.split(" ");
	let args = messageArray.slice(1);
	let command = messageArray[0];

	if(!command.startsWith(prefix)) return;

	let cmd = client.commands.get(command.slice(prefix.length));


	if(cmd) cmd.run(client, message, args);
});


client.login(botToken.token);
