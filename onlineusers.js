module.exports.run = (client, message, args) => {
	//get array of id
	//run through them and test their status
	let testUser = message.mentions.users.first();
	let testUser2 = message.mentions.users;
	if(!testUser) return;
	console.log(testUser);
	console.log(testUser.presence.status);
	console.log(testUser2);
	const guildMembers = message.guild.members;
	console.log(guildMembers.first());
}

module.exports.help = {
	name: "onlineusers"
}