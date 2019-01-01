const Discord = module.require("C:\\Users\\Fly\\node_modules\\discord.js");
const lvlSystem = module.require('../xp.json');
module.exports.run = (client, message, args) => {
	//info gives the information about the user
	if(args.length === 0) {
		let xpEmbed =  new Discord.RichEmbed()
		.setDescription(`XP information of ${message.author}`)
		.setColor("#0b69c1")
		.addField("Tier", `${lvlSystem[message.author.id].tier}`)
		.addField("Stars", `${lvlSystem[message.author.id].stars}`)
		.addField("Level", `${lvlSystem[message.author.id].level}`)
		.addField("Amount of:", `XP: ${lvlSystem[message.author.id].xp}, $: AMOUNT`)
		.addField("XP needed for next level", "XP NEEDED TO NEXT LEVEL")
		.addField("Investments", "XP: PLACEHOLDER, $: PLACEHOLDER")
		.addField("Perk", "PERK")
		.addField("Multiplier", "MULTIPLIER");
		
		message.channel.send(xpEmbed);
		return;
	}
	else if(args.length === 1) {
		//~userinfo @user, info of that user
		let userRequired = message.mentions.users.first();
		if(!userRequired) return message.channel.send("Please specify who's information you want to view");
		if(!lvlSystem[userRequired.id]) {
			lvlSystem[userRequired.id] = {
				xp: 0,
				level: 0,
				stars: 0,
				tier: 0
			}
		}

		let requiredxpEmbed =  new Discord.RichEmbed()
		.setDescription(`XP information of ${userRequired}`)
		.setColor("#0b69c1")
		.addField("Tier", `${lvlSystem[userRequired.id].tier}`)
		.addField("Stars", `${lvlSystem[userRequired.id].stars}`)
		.addField("Level", `${lvlSystem[userRequired.id].level}`)
		.addField("Amounts:", `XP: ${lvlSystem[userRequired.id].xp}, $: AMOUNT`)
		.addField("XP needed for next level", "XP NEEDED TO NEXT LEVEL")
		.addField("Investments", "XP: PLACEHOLDER, $: PLACEHOLDER")
		.addField("Perk", "PERK")
		.addField("Multiplier", "MULTIPLIER")
		.setFooter(`Information requested by ${message.author.username}`, message.author.displayAvatarURL);


		message.channel.send(requiredxpEmbed);
		return;
	} else {
		//more than two args after ~userinfo, produces error
		message.channel.send("Please enter \"~userinfo\" to view your stats or enter a member after to view their stats.");
		return;
	}
};

module.exports.help = {
	name: "userinfo"
};