module.exports.run = (client, message, args) => {
	if(args.length === 0) {
		const availableResponses = ["r", "p", "s", "rock", "paper", "scissors"];
		const filter = m => {
			m.content = availableResponses[0];
		}
		message.channel.awaitMessages(filter, { time: 10000, error: ['time'] })
		.then(console.log("hi"))
		.catch(console.log("error"));

		message.channel.send("You have 10 seconds to respond.");
	}
	if(args.length === 1) {
		if(args[0] === "help") {
			return message.channel.send("After using the command, enter __rock__, __paper__, or __scissors__.")
		} 
		else { return message.channel.send("Use __**~rps help**__ to get started"); }
	}

}

module.exports.help = {
	name: "rps"
}