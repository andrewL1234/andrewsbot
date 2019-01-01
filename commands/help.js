const Discord = module.require("C:\\Users\\Fly\\node_modules\\discord.js");
const fs = module.require("fs");
let jsfiles;
const cmdDescriptions = {
	"box": "Opens a box",
	"help": "Bot help",
	"onlineusers": "Gets the amount of online users",
	"risk": "Risk xp",
	"rng": "Random Number Generator",
	"roll": "Roll dice",
	"rps": "Rock, paper, scissors",
	"timer": "Set a timer",
	"userinfo": "Get the info of an user"
}
fs.readdir('./commands/', (err, files) => {
	if (err) console.log(err);

	jsfiles = files.filter(f => f.split(".").pop() === "js");
})
module.exports.run = (client, message, args) => {
	const helpEmbed = new Discord.RichEmbed()
	.setTitle("Bot Help")
	.setColor("#3afbff")
	.addField("**Prefix**", "**~**")

	let times = 0;
	while(times < jsfiles.length) {
		let command = jsfiles[times].split(".")[0];
		helpEmbed.addField(`**${command}**`, `\`${cmdDescriptions[command]}\``);
		times++;
	}

	return message.channel.send(helpEmbed);
}

module.exports.help = {
	name: "help"
};