module.exports.run = (client, message, args) => {
	const minimum = Number(args[0]);
	const maximum = Number(args[1]);
	if(args.length !== 2) {
		return message.channel.send("Please enter TWO numbers after the command.");
		
	}
	else if(isNaN(minimum) || isNaN(maximum)) {
		return message.channel.send("Please enter two NUMBERS after the command.");
		
	}
	else if(minimum >= maximum) {
		return message.channel.send("Please enter the minumum first and then the maximum.");
		
	} else {
		const randomNumber = Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
		message.channel.send(randomNumber);
	}
};

module.exports.help = {
	name: "rng"
};