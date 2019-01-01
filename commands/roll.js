function generateDiceResult(d, s) {
	const min = 1;
	const max = s;
	let sum = 0;
	let result;
	let results = [];
	for(let i = 1; i <= d; i ++) {
		result = Math.floor(Math.random() * (max - min + 1) + min)
		sum += result;
		results.push(result);
	}
	// console.log(sum);
	// console.log(results);
	// console.log(sum, results);
	return sum;
}

function serverOwnerHackedDice(d, s) {
	const min = Math.ceil(s / 1.5);
	const max = s;
	let sum = 0;
	for(let i = 1; i <= d; i ++) {
		sum += Math.floor(Math.random() * (max - min + 1) + min);
	}

	return sum;
}

function ballDice(d, s) {
	const min = 1;
	const max = s;
	let sum = 0;
	let result;
	let results = [];
	for(let i = 1; i <= d; i ++) {
		result = Math.random() * (max - min + 1) + min
		sum += result;
	}
	return sum;
}
const Discord = module.require("C:\\Users\\Fly\\node_modules\\discord.js");
module.exports.run = (client, message, args) => {
	const maxDice = 500;
	const maxSides = 100;
	const defaultSides = 6;
	const modifiers = ["o", "b"];
	if(args.length === 0) {
		//nothing after command, informs user how to roll
		return message.channel.send("Specify the amount of dice you want to roll after the command. Maximum is 150 dice");
	}
	else if(args.length === 1) {
		if(args[0] === "help") {
			const rollHelpEmbed = new Discord.RichEmbed()
			.setTitle("Roll Help")
			.setColor("#adb3bc")
			.addField("Amount", "To roll specify the amount of dice after the command")
			.addField("Sides", "You can also change the sides of the dice after the amount is specified")
			.addField("Modifier", "Modifiers can be used after the amount of dice or the amount of sides")
			return message.channel.send(rollHelpEmbed);
		}
		//amount of dice
		const numDiceRolled = Number(args[0]);
		if(isNaN(numDiceRolled)) return message.channel.send("Enter the amount of dice you want to roll after the command with a number");
		if(numDiceRolled > maxDice) return message.channel.send(`The maximum amount of dice you can roll is ${maxDice}, and the max sides is ${maxSides}`);
		return message.channel.send(`**Result:** ${generateDiceResult(numDiceRolled, defaultSides)}`);
	}
	else if(args.length === 2) {
		//amount of dice and sides
		//when the second key in array does not contain any letters, only words
		if(args[1].match(/[a-z]/) === null) {
			const numDiceRolled = Number(args[0]);
			const sides = Number(args[1]);
			if(isNaN(numDiceRolled) || isNaN(sides)) return message.channel.send("Enter the amount of dice and sides you want to roll after the command with a number");
			if(numDiceRolled > maxDice || sides > maxSides) return message.channel.send(`The maximum amount of dice you can roll is ${maxDice}, and the max sides is ${maxSides}`);
			if(sides <= 3) return message.channel.send("There has to be at least 4 sides in the dice");
			return message.channel.send(`**Result:** ${generateDiceResult(numDiceRolled, defaultSides)}`);
		} 
		//amount of dice and modifier
		//when the second key in the array has a length of 1 and is not a number
		else if(args[1].match(/^\d/) === null && args[1].length === 1) {
			const numDiceRolled = Number(args[0]);
			const modifier = args[1];
			if(modifier === "o") {
				if(!message.member.hasPermission("MANAGE_GUILD")) {
					return message.channel.send("Only the owner of this server can use this modifier!");
				}
				if(isNaN(numDiceRolled)) return message.channel.send("Enter the amount of dice you want to roll after the command with a number");
				if(numDiceRolled > maxDice) return message.channel.send(`The maximum amount of dice you can roll is ${maxDice}, and the max sides is ${maxSides}`);
				return message.channel.send(`**Result:** ${serverOwnerHackedDice(numDiceRolled, defaultSides)}`);
			} 
			else if(modifier === "b"){
				if(isNaN(numDiceRolled)) return message.channel.send("Enter the amount of dice you want to roll after the command with a number");
				if(numDiceRolled > maxDice) return message.channel.send(`The maximum amount of dice you can roll is ${maxDice}, and the max sides is ${maxSides}`);
				return message.channel.send(`**Result:** ${ballDice(numDiceRolled, defaultSides)}`);
			} else {
				return message.channel.send("That is not an available modifier");
			}
		} else {
			return message.channel.send("After the amount of dice, add the sides or a modifier")
		}
	}
	else if(args.length === 3) {
		let modifier = args[2];
		//amount of dice, sides, and modifier
		if(modifier === "o") {
			if(!message.member.hasPermission("MANAGE_GUILD")) {
				return message.channel.send("Only the owner of this server can use this modifier!");
			}
			const numDiceRolled = Number(args[0]);
			const sides = Number(args[1]);
			if(isNaN(numDiceRolled) || isNaN(sides)) return message.channel.send("Enter the amount of dice and sides you want to roll after the command with a number");
			if(numDiceRolled > maxDice || sides > maxSides) return message.channel.send(`The maximum amount of dice you can roll is ${maxDice}, and the max sides is ${maxSides}`);
			if(sides <= 3) return message.channel.send("There has to be at least 4 sides in the dice");
			return message.channel.send(serverOwnerHackedDice(numDiceRolled, sides));
		} else if(modifier === "b"){
			if(isNaN(numDiceRolled) || isNaN(sides)) return message.channel.send("Enter the amount of dice and sides you want to roll after the command with a number");
			if(numDiceRolled > maxDice || sides > maxSides) return message.channel.send(`The maximum amount of dice you can roll is ${maxDice}, and the max sides is ${maxSides}`);
			if(sides <= 3) return message.channel.send("There has to be at least 4 sides in the dice");
			return message.channel.send(ballDice(numDiceRolled, sides));
		} else {
			return message.channel.send("That is not an available modifier");
		}
	}
	else {
		return message.channel.send("Use ~roll help to see how to use this command.")
	}
}

module.exports.help = {
	name: "roll"
}