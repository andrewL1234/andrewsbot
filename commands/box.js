const Discord = module.require("C:\\Users\\Fly\\node_modules\\discord.js");
const boxes = module.require('../boxes.json');
const fs = module.require('fs');
module.exports.run = (client, message, args) => {
	if(!boxes[message.author.id]) {
		boxes[message.author.id] = {
			Bad: 0,
			Good: 0,
			Great: 0,
			Amazing: 0,
			Best: 0,
			Legendary: 0,
			Super: 0
		}
	}
	if(args.length === 0) {
		//~box - views current boxes
		let boxEmbed = new Discord.RichEmbed()
		.setDescription(`Boxes of ${message.author}`)
		.setColor("#f2c926")
		.addField("Bad:", boxes[message.author.id].Bad)
		.addField("Good:", boxes[message.author.id].Good)
		.addField("Great:", boxes[message.author.id].Great)
		.addField("Amazing:", boxes[message.author.id].Amazing)
		.addField("Best:", boxes[message.author.id].Best)
		.addField("Legendary", boxes[message.author.id].Legendary)
		.addField("Super:", boxes[message.author.id].Super)

		return message.channel.send(boxEmbed);
	} 
	else if(args.length === 1) {
		if(args[0] === "get") {
			const currentDay = new Date();
			if(currentDay.getDay() !== 4 && currentDay.getDay() !== 0) return message.channel.send("Boxes are only available on Thursday and Sunday!");
			//~box get - opens a box
			let type;
			let color;
			let determineType = Math.random();
			if(determineType < 0.3){
				type = "Bad";
				color = "#788b8c";
				boxes[message.author.id].Bad += 1;
			}
			else if(determineType < 0.6){
				type = "Good";
				color = "#08f400";
				boxes[message.author.id].Good += 1;
			}
			else if(determineType < 0.8){
				type = "Great";
				color = "#00cbf4";
				boxes[message.author.id].Great += 1;
			}
			else if(determineType < 0.92){
				type = "Amazing";
				color = "#3800f4";	
				boxes[message.author.id].Amazing += 1;
			}
			else if(determineType < 0.97){
				type = "Best";
				color = "#ff0202";
				boxes[message.author.id].Best += 1;
			}
			else if(determineType < 0.9975){
				type = "Legendary";
				color = "#efef02";
				boxes[message.author.id].Legendary += 1;
			}
			else{
				type = "Super";
				color = "#e802e8";
				boxes[message.author.id].Super += 1;
			}
			fs.writeFile('./boxes.json', JSON.stringify(boxes), err => {
				console.log(err);
			})
			let boxtypeEmbed = new Discord.RichEmbed()
			.setTitle(`**${type} box**`)
			.setFooter(`Recieved by ${message.author.username}`, message.author.displayAvatarURL)
			.setColor(color);

			return message.channel.send(boxtypeEmbed);
		}
		else if(args[0] === "open") {
			
		}
		else if(args[0] === "help") {
			//~box help - shows box types
			let boxHelp = new Discord.RichEmbed()
			.setTitle("BOX HELP")
			.setColor("#f2c926")
			.addField("Getting boxes", "Given every Thursday and Sunday")
			.addField("View boxes", "\"~box\" - see the boxes you currently have, and mention someone after to see their boxes")
			.addField("Get Boxes(on Thursday and Sunday", "\"~box get\" - recieves a box")
			.addField("Box types", "\"~box types\" - see all the box types and their information")
			.setFooter(`Box help requested by ${message.author.username}`, message.author.displayAvatarURL);

		  	return message.channel.send(boxHelp);
		}
		else if(args[0] === "types") {
			//~box types - box types
			let boxTypes = new Discord.RichEmbed()
			.setTitle("BOX TYPES")
			.setColor("#f2c926")
			.addField("Bad", "Bad Crate: 30% chance, gives 1-5 xp")
			.addField("Good", "Good Crate: 30% chance, gives 6-15 xp & $1-$3")
			.addField("Great", "Great Crate: 20% chance, gives 16-30 xp, $4-$10 & 1/4 chance of x2 multiplier for 1 day")
			.addField("Amazing", "Amazing Crate: 12% chance, gives 31-60 xp, $11-$20 & 1/3 chance of x3 multiplier for 2 days")
			.addField("Best", "Best Crate: 5% chance, gives 61-100 xp, $21-$35 & 1/3 chance of x4 multiplier for 3 days")
			.addField("Legendary", "Legendary Crate: 2.75% chance, gives 101-200 xp, $36-$50 & and 1/3 chance of x5 multiplier for 4 days")
			.addField("Super", "Super Crate: 0.25% chance, gives ??? xp, $???, ??? multiplier, instant ???, and ???")

			return message.channel.send(boxTypes);
		}
		else if(args[0].slice(1).startsWith("@")) {
			//~box @user - current boxes of mentioned user
			let requiredUser = message.mentions.users.first();
			if(!requiredUser) return message.channel.send("Please specify who's information you want to view.");
			if(!boxes[requiredUser.id]){
				boxes[requiredUser.id] = {
					Bad: 0,
					Good: 0,
					Great: 0,
					Amazing: 0,
					Best: 0,
					Legendary: 0,
					Super: 0
				}
			}

			let requiredEmbed = new Discord.RichEmbed()
			.setDescription(`Boxes of ${requiredUser}`)
			.setColor("#f2c926")
			.addField("Bad:", boxes[requiredUser.id].Bad)
			.addField("Good:", boxes[requiredUser.id].Good)
			.addField("Great:", boxes[requiredUser.id].Great)
			.addField("Amazing:", boxes[requiredUser.id].Amazing)
			.addField("Best:", boxes[requiredUser.id].Best)
			.addField("Legendary", boxes[requiredUser.id].Legendary)
			.addField("Super:", boxes[requiredUser.id].Super)
			.setFooter(`Information requested by ${message.author.username}`, message.author.displayAvatarURL);

			return message.channel.send(requiredEmbed);
		} else {
			return message.channel.send("Type\"~box help\" to see commands");
		}
	} else {
		return message.channel.send("Type\"~box help\" to see commands");
	}
}

module.exports.help = {
	name: "box"
}