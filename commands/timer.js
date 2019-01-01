module.exports.run = async (client, message, args) => {
	const t = Number(args[0]);

	if(!t) return message.channel.send("Enter the time after the command in seconds");
	else if(t > 1800) return message.channel.send("Enter a time in seconds after the command. The maximum is 1800 seconds.");
	else if(isNaN(t)) return message.channel.send("Enter the seconds in numbers.");

	message.channel.send(`Setting a timer for ${t} seconds`).then(message => {message.delete(t*1000)});
	setTimeout(() => message.reply("Your timer has ended."), t * 1000);
};

module.exports.help = {
	name: "timer"
};