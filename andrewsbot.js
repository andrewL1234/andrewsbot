const Discord = require('discord.js');

const client = new Discord.Client();

 

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => {
       const messageArray = message.content.split(' ');
       const command = messageArray[0];
       const args = messageArray.slice(1);
       if (command === 'random') {

           if(args.length !== 2) {
               return message.channel.send("Please enter TWO numbers after the command.");

           }
           const minimum = parseInt(args[0], 10);
           const maximum = parseInt(args[1], 10);
           else if(isNaN(minimum) || isNaN(maximum)) {
               return message.channel.send("Please enter two NUMBERS after the command.");

           }
           else if(minimum >= maximum) {
               return message.channel.send("Please enter the minumum first and then the maximum.");

           } else {
               const randomNumber = Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
               message.channel.send(randomNumber);
           }
       } 
    if(command === 'ping') {
        return message.reply('pong');
    }
    

});


client.login(process.env.BOT_TOKEN);
