module.exports.run = (client, message, args) => {
	let riskChannel = message.guild.channels.find(section => section.name === 'xp-risking');
	if(!riskChannel) return message.channel.send("There is no xp risking channel");
	if(message.channel.name !== riskChannel.name) return message.channel.send("Risk xp in #xp-risking");

	if(args.length === 0) return message.channel.send("Add the amount of xp you want to risk after the command");
	else if(args.length === 1) {
		if(!isNaN(Number(args[0]))) {
			let xpRisked = Number(args[0]);
			if(xpRisked >= 100) {
				let randomNum = Math.floor(Math.random() * 5 + 1);
				if(randomNum <= 2) return message.channel.send(`**Success!** You recieved **${xpRisked}** xp`);
				else return message.channel.send(`You **lost ${xpRisked}** xp. Better luck next time.`);
			}
			else if(xpRisked < 100) {
				let randomNum = Math.floor(Math.random() * 20 + 1);
				if(randomNum <= 9) return message.channel.send(`**Success!** You recieved **${xpRisked}** xp`);
				else return message.channel.send(`You **lost ${xpRisked}** xp. Better luck next time.`);
			}
		} else {
			return message.channel.send("After the command, enter the amount of xp you want to risk.")
		}
	}
}
module.exports.help = {
	name: "risk"
}