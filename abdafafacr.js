const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
const client = new Discord.Client();
const request = require('request')
const yt = require('ytdl-core');
const ccolor = require('chalk');
const chalk = require('chalk');
const express = require('express');
const app = express();
const superagent = require('superagent');
const port = process.env.PORT || 5930;
const pastebinAPI = require('pastebin-js');
const { PAGINATED_ITEMS } = process.env;
const sql = require("sqlite");
const pastebin = new pastebinAPI("0acedde648b311cfdda511acdf3ae94c");


app.get("/", function (req, res) {
    res.send("Welcome to the port of cyclone discord bot, hosted by Ali Maazin Hassan. 5930")
});

app.listen(port);

client.on('ready', () => {
    console.log(ccolor.bgBlack.green(`I am ready! serving in ${client.guilds.size} servers!`));
    console.log(ccolor.bgBlack.green('press ctrl + c to shut me down'));
    client.user.setGame(`~help | ${client.guilds.size} servers!`)
    client.user.setStatus('online')    
});

client.on('messageReactionAdd', (messageReaction, user) => {
    let guild = messageReaction.message.guild;
    let message = messageReaction.message.cleanContent;
    let botChannel = guild.channels.find("name", "cyclone");
    if (user === client.user) return;
    if (!botChannel) return;
    botChannel.send("", {embed: {
        color: 0x00ffff,
        fields: [
            {
                name: "**_Reaction Added_**",
                value: `${user.username} reacted to a message with contents ${message}, with a ${messageReaction.emoji.name}`
            }

        ],
        timestamp: new Date(),
        footer: {
            icon_url: client.user.avatarURL,
            text: 'created by Cyclone'
        }
    }}).catch(console.error);
});

client.on('messageReactionRemove', (messageReaction, user) => {
    let guild = messageReaction.message.guild;
    let message = messageReaction.message.cleanContent;
    let botChannel = guild.channels.find("name", "cyclone");
    if (!botChannel) return;
    botChannel.send("", {embed: {
        color: 0x00ffff,
        fields: [
            {
                name: "**_Reaction Removed_**",
                value: `${user.username} removed his reaction on a message with contents ${message}, with a ${messageReaction.emoji.name}`
            }

        ],
        timestamp: new Date(),
        footer: {
            icon_url: client.user.avatarURL,
            text: 'created by Cyclone'
        }
    }}).catch(console.error);
});

client.on('guildUpdate', (oldGuild, newGuild) => {
	let guild = newGuild;
	let botChannel = guild.channels.find("name", "cyclone");
	if (!botChannel) return;
  		botChannel.send("", {embed: {
  			author: {
  				name: "Server updated",
  				icon_url: guild.iconURL
  			},
			color: 0x00ffff,
			fields: [
				{
					name: "**_Before:_**",
				    value: `**Name:** ${oldGuild.name} \n**Region:** ${oldGuild.region} \n**Icon URL:** ${oldGuild.iconURL}`
				},
				{
					name: "**_After:_**",
					value: `**Name:** ${newGuild.name} \n**Region:** ${newGuild.region} \n**Icon URL:** ${newGuild.iconURL}`
				}

			],
			timestamp: new Date(),
			footer: {
            icon_url: client.user.avatarURL,
            text: 'created by Cyclone'
            }
	        }}).catch(console.error);
});

client.on('messageReactionRemoveAll', message => {
	let guild = message.guild;
	let botChannel = guild.channels.find("name", "cyclone");
	if (!botChannel) return;
  		botChannel.send("", {embed: {
			color: 0x00ffff,
			fields: [
				{
					name: "**_All Reactions Removed_**",
				    value: `All reactions in the message with contents ${message.cleanContent}, was removed`
				}

			],
			timestamp: new Date(),
			footer: {
            icon_url: client.user.avatarURL,
            text: 'created by Cyclone'
            }
	        }}).catch(console.error);
});

client.on('emojiCreate', emoji => {
	let guild = emoji.guild;
	let botChannel = guild.channels.find("name", "cyclone");
	if (!botChannel) return;
  		botChannel.send("", {embed: {
			color: 0x00ffff,
			fields: [
				{
					name: "**_Emoji Created_**",
				    value: `A new emoji called **${emoji.name}** has been created!`
				}

			],
			timestamp: new Date(),
			footer: {
            icon_url: client.user.avatarURL,
            text: 'created by Cyclone'
            }
	        }}).catch(console.error);
});

client.on('emojiDelete', emoji => {
	let guild = emoji.guild;
	let botChannel = guild.channels.find("name", "cyclone");
	if (!botChannel) return;
  		botChannel.send("", {embed: {
			color: 0x00ffff,
			fields: [
				{
					name: "**_Emoji Deleted_**",
				    value: `An emoji called **${emoji.name}** has been deleted!`
				}

			],
			timestamp: new Date(),
			footer: {
            icon_url: client.user.avatarURL,
            text: 'created by Cyclone'
            }
	        }}).catch(console.error);
});

client.on('emojiUpdate', (oldEmoji, newEmoji) => {
	let guild = newEmoji.guild;
	let botChannel = guild.channels.find("name", "cyclone");
	if (!botChannel) return;
  		botChannel.send("", {embed: {
			color: 0x00ffff,
			fields: [
				{
					name: "**_Emoji Update_**",
				    value: `The emoji called **${oldEmoji.name}** has been updated to **${newEmoji.name}**!`
				}

			],
			timestamp: new Date(),
			footer: {
            icon_url: client.user.avatarURL,
            text: 'created by Cyclone'
            }
	        }}).catch(console.error);
});

client.on('roleCreate', role => {
  let guild = role.guild;
  let botChannel = guild.channels.find("name", "cyclone");
  if (!botChannel) return;
  		botChannel.send("", {embed: {
			color: 0x00ffff,
			fields: [
				{
					name: "**_Role created_**",
				    value: `A new role called ${role.name} has been created`
				}

			],
			timestamp: new Date(),
			footer: {
            icon_url: client.user.avatarURL,
            text: 'created by Cyclone'
            }
    }}).catch(console.error);
});

client.on('roleDelete', role => {
  let guild = role.guild;
  let botChannel = guild.channels.find("name", "cyclone");
  if (!botChannel) return;
   		botChannel.send("", {embed: {
			color: 0x00ffff,
			fields: [
				{
					name: "**_Role deleted_**",
				    value: `A new role called ${role.name} has been deleted`
				}

			],
			timestamp: new Date(),
			footer: {
            icon_url: client.user.avatarURL,
            text: 'created by Cyclone'
            }
	        }}).catch(console.error);
});

client.on('messageDelete', msg => {
  let guild = msg.guild;
  let botChannel = guild.channels.find("name", "cyclone");
  if (!botChannel) return;
  botChannel.send("", {embed: {
  			author: {
  				name: msg.author.username,
  				icon_url: msg.author.avatarURL
  			},
			color: 0x00ffff,
			fields: [
				{
					name: "**_Message Deleted_**",
				    value: `**A message by ${msg.author.username}, was deleted from ${msg.channel.name}**\nContent: ${msg.cleanContent}`
				}

			],
			timestamp: new Date(),
			footer: {
            icon_url: client.user.avatarURL,
            text: 'created by Cyclone'
            }
	        }}).catch(console.error);
});

client.on('reconnecting', () => {
  console.log(`Reconnecting at ${new Date()}`);
});

client.on('channelDelete', channel => {
	let guild = channel.guild;
    let botChannel = guild.channels.find("name", "cyclone");
    if (!botChannel) return;
  		botChannel.send("", {embed: {
			color: 0x00ffff,
			fields: [
				{
					name: "**_Channel Deleted_**",
				    value: `A ${channel.type} channel by the name of ${channel.name} was successfully deleted.`
				}

			],
			timestamp: new Date(),
			footer: {
            icon_url: client.user.avatarURL,
            text: 'created by Cyclone'
            }
	        }}).catch(console.error);
});

client.on('channelUpdate', (oldChannel, newChannel) => {
	let guild = newChannel.guild;
    let botChannel = guild.channels.find("name", "cyclone");
    if (!botChannel) return;
  		botChannel.send("", {embed: {
			color: 0x00ffff,
			fields: [
				{
					name: "**_Channel Updated_**",
				    value: `A ${newChannel.type} channel by the name of ${oldChannel.name} was updated to ${newChannel.name}`
				}

			],
			timestamp: new Date(),
			footer: {
            icon_url: client.user.avatarURL,
            text: 'created by Cyclone'
            }
	        }}).catch(console.error);
});

client.on('channelPinsUpdate', (channel, time) => {
	let guild = channel.guild;
    let botChannel = guild.channels.find("name", "cyclone");
    if (!botChannel) return;
  		botChannel.send("", {embed: {
			color: 0x00ffff,
			fields: [
				{
					name: "**_Pins Update_**",
				    value: `The pins for ${channel.name} have been updated at ${time}`
				}

			],
			timestamp: new Date(),
			footer: {
            icon_url: client.user.avatarURL,
            text: 'created by Cyclone'
            }
	        }}).catch(console.error);
});

let points = JSON.parse(fs.readFileSync('./points.json', 'utf8'));
const prefix = '~';

client.on('message', message => {
	var yellow = client.emojis.get("335713485944258571").toString();
	var white = client.emojis.get("335713448488992768").toString();
	var red = client.emojis.get("335713416603893760").toString();
	var purple = client.emojis.get("335713388049203210").toString();
	var pink = client.emojis.get("335713355987812353").toString();
	var green = client.emojis.get("335713317622513665").toString();
	var blue = client.emojis.get("335713293773701120").toString();
	var black = client.emojis.get("335713262001979393").toString();
	var aqua = client.emojis.get("335713231593013248").toString();
	var wheel = client.emojis.get("335714069300510731").toString();
	var victorem = client.emojis.get("335714012585000962").toString();
	var superthumb = client.emojis.get("335713963062853633").toString();
	var mini = client.emojis.get("335713917487546369").toString();
	var led = client.emojis.get("335713870964457472").toString();
	var hook = client.emojis.get("335713816534974474").toString();
	var hexagon = client.emojis.get("335713766794592256").toString();
	var fast = client.emojis.get("335713710347911178").toString();
	var dollar = client.emojis.get("335713655070916618").toString();
	var args = message.content.split(" ").slice(1);
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;
    if (!points[message.author.id]) points[message.author.id] = {
      points: 0,
      level: 0
    };
    let userData = points[message.author.id];
    userData.points++;

    let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
    if (curLevel > userData.level) {
        userData.level = curLevel;
        message.reply(`*You've leveled up to* ***level ${curLevel}***!`);
    }

    if (message.content.toLowerCase().startsWith(prefix + 'stats')) {
    	  message.channel.send("", {embed: {
    		  author: {
    			  name: "You are currently:",
    			  icon_url: message.author.avatarURL
    		  },
			  color: 0x00ffff,
			  fields: [
				  {
					  name: "**level**",
				      value: `${userData.level}`,
				      inline: true
				  },
				  {
					  name: "**Points**",
					  value: `${userData.points}`,
					  inline: true
				  }

			  ],
	          }});
    } 

    if (message.content.toLowerCase().startsWith(prefix + 'spinners')) {
    	if (!message.guild.member(client.user).hasPermission("USE_EXTERNAL_EMOJIS")) return message.reply("I need Use external emojis permission to proceed with this command!");
    	message.channel.send("", {embed: {
    		color: 0x00ffff,
    		author: {
    			name: "Fidget Spinner Store"
    		},
    		fields: [
    		    {
    		    	name: "**__Free Spinners__**",
    		    	value: `| **Yellow:** Yellow spinner\n| ${yellow}\n| **White:** White spinner\n| ${white}\n| **Red:** Red spinner\n| ${red}\n| **Purple:** Purple spinner\n| ${purple}\n| **Pink:** Pink spinner\n| ${pink}\n| **Green:** Green spinner\n| ${green}\n| **Blue:** Blue spinner\n| ${blue}\n| **Black:** Black spinner\n| ${black}\n| **Aqua:** Aqua spinner\n| ${aqua}`,
    		    	inline: true
    		    },
    		    {
    		    	name: "**__Premium Spinners__**",
    		    	value: `| **Mini:** level 1\n| ${mini}\n| **Superthumb:** level 1\n| ${superthumb}\n| **Victorem:** level 2\n| ${victorem}\n| **Wheel:** level 3\n| ${wheel}\n| **Led:** level 4\n| ${led}\n| **Hook:** level 4\n| ${hook}\n| **Hexagon:** level 5\n| ${hexagon}\n| **Fast:** level 6\n| ${fast}\n| **Dollar:** level 6\n| ${dollar}`,
    		    	inline: true
    		    },
    		],
    		footer: {
    		    text: "The level refers the stats collected by Cyclone"
    		}
    	}});
    } else

    if (message.content.toLowerCase().startsWith(prefix + 'spin')) {
    	let random = Math.floor(Math.random() * 300);
        let myArray = ["yellow", "white", "red", "purple", "pink", "green", "blue", "black", "aqua", "mini", "superthumb", "victorem", "wheel", "led", "hook", "hexagon", "fast", "dollar"];
		let choice = args.join(" ").toLowerCase();
        if (!args[0]) return message.reply("Please specify the spinner to spin. type ~spinners to see the spinner store. **~spin <spinner>**");
        if (!myArray.includes(choice)) return message.reply(`**${choice}** is not a type of spinner in Spinner store, type **~spinners** and see the spinner store`);
        if (choice === "yellow") {
        	message.reply(`**${message.author.username}** spinned a ${choice} spinner. ${yellow} lets see for how many seconds it'll spin`)
        	setTimeout(() => message.channel.send(`${message.author}, ${yellow} your ${choice} spinner spun for \`${random}\` Seconds. ${yellow}`), 6000)
        } else
        if (choice === "white") {
        	message.reply(`**${message.author.username}** spinned a ${choice} spinner. ${white} lets see for how many seconds it'll spin`)
        	setTimeout(() => message.channel.send(`${message.author}, ${white} your ${choice} spinner spun for \`${random}\` Seconds. ${white}`), 6000)
        } else
        if (choice === "red") {
        	message.reply(`**${message.author.username}** spinned a ${choice} spinner. ${red} lets see for how many seconds it'll spin`)
        	setTimeout(() => message.channel.send(`${message.author}, ${red} your ${choice} spinner spun for \`${random}\` Seconds. ${red}`), 6000)
        } else
        if (choice === "purple") {
        	message.reply(`**${message.author.username}** spinned a ${choice} spinner. ${purple} lets see for how many seconds it'll spin`)
        	setTimeout(() => message.channel.send(`${message.author}, ${purple} your ${choice} spinner spun for \`${random}\` Seconds. ${purple}`), 6000)
        } else        
        if (choice === "pink") {
        	message.reply(`**${message.author.username}** spinned a ${choice} spinner. ${pink} lets see for how many seconds it'll spin`)
        	setTimeout(() => message.channel.send(`${message.author}, ${pink} your ${choice} spinner spun for \`${random}\` Seconds. ${pink}`), 6000)
        } else
        if (choice === "green") {
        	message.reply(`**${message.author.username}** spinned a ${choice} spinner. ${green} lets see for how many seconds it'll spin`)
        	setTimeout(() => message.channel.send(`${message.author}, ${green} your ${choice} spinner spun for \`${random}\` Seconds. ${green}`), 6000)
        } else
        if (choice === "blue") {
        	message.reply(`**${message.author.username}** spinned a ${choice} spinner. ${blue} lets see for how many seconds it'll spin`)
        	setTimeout(() => message.channel.send(`${message.author}, ${blue} your **${choice}** spinner spun for \`${random}\` Seconds. ${blue}`), 6000)
        } else
        if (choice === "black") {
        	message.reply(`**${message.author.username}** spinned a ${choice} spinner. ${black} lets see for how many seconds it'll spin`)
        	setTimeout(() => message.channel.send(`${message.author}, ${black} your ${choice} spinner spun for \`${random}\` Seconds. ${black}`), 6000)
        } else
        if (choice === "aqua") {
        	message.reply(`**${message.author.username}** spinned a ${choice} spinner. ${aqua} lets see for how many seconds it'll spin`)
        	setTimeout(() => message.channel.send(`${message.author}, ${aqua} your ${choice} spinner spun for \`${random}\` Seconds. ${aqua}`), 6000)
        } else
        if (choice === "mini") {
        	if (userData.level < 1) return message.reply(`You have to be atleast **level 1** to spin ${choice}`)
        	message.reply(`**${message.author.username}** spinned a ${choice} spinner. ${mini} lets see for how many seconds it'll spin`)
        	setTimeout(() => message.channel.send(`${message.author}, ${mini} your ${choice} spinner spun for \`${random}\` Seconds. ${mini}`), 6000)
        } else
        if (choice === "superthumb") {
        	if (userData.level < 1) return message.reply(`You have to be atleast **level 1** to spin ${choice}`)
        	message.reply(`**${message.author.username}** spinned a ${choice} spinner. ${superthumb} lets see for how many seconds it'll spin`)
        	setTimeout(() => message.channel.send(`${message.author}, ${superthumb} your ${choice} spinner spun for \`${random}\` Seconds. ${superthumb}`), 6000)
        } else
        if (choice === "victorem") {
        	if (userData.level < 2) return message.reply(`You have to be atleast **level 2** to spin ${choice}`)
        	message.reply(`**${message.author.username}** spinned a ${choice} spinner. ${victorem} lets see for how many seconds it'll spin`)
        	setTimeout(() => message.channel.send(`${message.author}, ${victorem} your ${choice} spinner spun for \`${random}\` Seconds. ${victorem}`), 6000)
        } else
        if (choice === "wheel") {
        	if (userData.level < 3) return message.reply(`You have to be atleast **level 3** to spin ${choice}`)
        	message.reply(`**${message.author.username}** spinned a ${choice} spinner. ${wheel} lets see for how many seconds it'll spin`)
        	setTimeout(() => message.channel.send(`${message.author}, ${wheel} your ${choice} spinner spun for \`${random}\` Seconds. ${wheel}`), 6000)
        } else
        if (choice === "led") {
        	if (userData.level < 4) return message.reply(`You have to be atleast **level 4** to spin ${choice}`)
        	message.reply(`**${message.author.username}** spinned a ${choice} spinner. ${led} lets see for how many seconds it'll spin`)
        	setTimeout(() => message.channel.send(`${message.author}, ${led} your ${choice} spinner spun for \`${random}\` Seconds. ${led}`), 6000)
        } else
        if (choice === "hook") {
        	if (userData.level < 4) return message.reply(`You have to be atleast **level 4** to spin ${choice}`)
        	message.reply(`**${message.author.username}** spinned a ${choice} spinner. ${hook} lets see for how many seconds it'll spin`)
        	setTimeout(() => message.channel.send(`${message.author}, ${hook} your ${choice} spinner spun for \`${random}\` Seconds. ${hook}`), 6000)
        } else
        if (choice === "hexagon") {
        	if (userData.level < 5) return message.reply(`You have to be atleast **level 5** to spin ${choice}`)
        	message.reply(`**${message.author.username}** spinned a ${choice} spinner. ${hexagon} lets see for how many seconds it'll spin`)
        	setTimeout(() => message.channel.send(`${message.author}, ${hexagon} your ${choice} spinner spun for \`${random}\` Seconds. ${hexagon}`), 6000)
        } else
        if (choice === "fast") {
        	if (userData.level < 6) return message.reply(`You have to be atleast **level 6** to spin ${choice}`)
        	message.reply(`**${message.author.username}** spinned a ${choice} spinner. ${fast} lets see for how many seconds it'll spin`)
        	setTimeout(() => message.channel.send(`${message.author}, ${fast} your ${choice} spinner spun for \`${random}\` Seconds. ${fast}`), 6000)
        } else
        if (choice === "dollar") {
        	if (userData.level < 6) return message.reply(`You have to be atleast **level 6** to spin ${choice}`)
        	message.reply(`**${message.author.username}** spinned a ${choice} spinner. ${dollar }lets see for how many seconds it'll spin`)
        	setTimeout(() => message.channel.send(`${message.author}, ${dollar} your ${choice} spinner spun for \`${random}\` Seconds. ${dollar}`), 6000)
        }    
    }
  fs.writeFile('./abdadafasj.json', JSON.stringify(points), (err) => {
    if (err) console.error(err)
  });
});

client.on('guildCreate', guild => {
	console.log(chalk.bgGreen.black(`New guild added! name : ${guild.name}, owner : ${guild.owner.user.username}.`));
    client.user.setGame(`~help | ${client.guilds.size} servers!`)
});

client.on('guildDelete', guild => {
	console.log(chalk.bgRed.black(`Guild removed! name : ${guild.name}, owner : ${guild.owner.user.username}.`));
    client.user.setGame(`~help | ${client.guilds.size} servers!`)
});

client.on('guildMemberAdd', member => {
	let guild = member.guild;
	    let botChannel = guild.channels.find("name", "cyclone");
	    if (!botChannel) return;
  		botChannel.send("", {embed: {
			color: 0x00ffff,
			fields: [
				{
					name: "**_Welcome Message_**",
				    value: `${member.user.username} joined ${guild.name}, Welcome! Server members : ${guild.memberCount} :arrow_heading_up: `
				}

			],
			timestamp: new Date(),
			footer: {
            icon_url: client.user.avatarURL,
            text: 'created by Cyclone'
            }
	        }}).catch(console.error);
});

client.on('guildMemberRemove', member => {
	let guild = member.guild;
	    let botChannel = guild.channels.find("name", "cyclone");
	    if (!botChannel) return;
  		botChannel.send("", {embed: {
			color: 0x00ffff,
			fields: [
				{
					name: "**_Good bye Message_**",
				    value: `${member.user.username} left ${guild.name}, Good bye! Server members : ${guild.memberCount} :arrow_heading_down: `
				}

			],
			timestamp: new Date(),
			footer: {
            icon_url: client.user.avatarURL,
            text: 'created by Cyclone'
            }
	        }}).catch(console.error);
});

client.on('guildBanAdd', (guild, user) => {
	    let botChannel = guild.channels.find("name", "cyclone");
	    if (!botChannel) return;
  		botChannel.send("", {embed: {
			color: 0x00ffff,
			fields: [
				{
					name: "**_Ban Message_**",
				    value: `${user.username} was banned!`
				}

			],
			timestamp: new Date(),
			footer: {
            icon_url: client.user.avatarURL,
            text: 'created by Cyclone'
            }
	        }}).catch(console.error);
});

client.on('guildBanRemove', (guild, user) => {
	    let botChannel = guild.channels.find("name", "cyclone");
	    if (!botChannel) return;
      botChannel.send("", {embed: {
			color: 0x00ffff,
			fields: [
				{
					name: "**_Unban Message_**",
				    value: `${user.username} was unbanned!`
				}

			],
			timestamp: new Date(),
			footer: {
            icon_url: client.user.avatarURL,
            text: 'created by Cyclone'
            }
	        }}).catch(console.error);
});

client.on('message', message => {
	if(message.author.bot) return;
	if(!message.content.startsWith(prefix)) return;

	let command = message.content.split(" ")[0];
	command = command.slice(prefix.length);

	var args = message.content.split(" ").slice(1);
	var argresult = args.join(' ');

	if (command === "add") {
		let num1 = parseInt(args[0]);
		let num2 = parseInt(args[1]);
		if (args.size === 0) {
			message.reply('***Usage:*** *~add <1> <2>*')
		}	
		message.channel.send(`${num1 + num2}`).catch(console.error);
	}else

	if (command === "subtract") {
		let num1 = parseInt(args[0]);
		let num2 = parseInt(args[1]);
		if (args.size === 0) {
			message.reply('***Usage:*** *~subtract <1> <2>*')
		}	
		message.channel.send(`${num1 - num2}`).catch(console.error);
	}else

	if (command === "multiply") {
		let num1 = parseInt(args[0]);
		let num2 = parseInt(args[1]);
		if (args.size === 0) {
			message.reply('***Usage:*** *~multiply <1> <2>*')
		}	
		message.channel.send(`${num1 * num2}`).catch(console.error);
	}else

	if (command === "divide") {
		let num1 = parseInt(args[0]);
		let num2 = parseInt(args[1]);
		if (args.size === 0) {
			message.reply('***Usage:*** *~divide <1> <2>*')
		}				
		message.channel.send(`${num1 / num2}`).catch(console.error);
	}else

	if (command === "say") {
		if (args.size === 0) {
			message.reply('***Usage:*** *~say <message>*')
		}
		message.channel.send(`${args.join(" ")}`).catch(console.error);
	}else

  if (command === "del") {
    let guild = message.guild;
    let modRole = guild.roles.find("name", "Mod");
    if (!modRole) return;
    if (!message.member.roles.has(modRole.id)) return message.reply('You should have `Mod` role to turn my log system on!')
    if (!guild.me.hasPermission('MANAGE_MESSAGES')) return message.reply('I dont have permissions to delete messages!'); 	
    let messagecount = parseInt(argresult);
    if (messagecount > 100) return message.reply("Cant be more than **100** at a time");
    if (!messagecount) return message.reply('***Usage:*** *~del <amount>*')
    message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
    message.channel.send(`***${argresult}*** *messages deleted*`)
  } else

	if (message.content.toLowerCase().startsWith(prefix + 'time')) {
		message.channel.send("", {embed: {
			color: 0x00ffff,
			fields: [
				{
					name: "**_Current time :_**",
				    value: `${Date()}`
				}

			],
	        }});
	}else

	if (message.content.toLowerCase().startsWith(prefix + 'help')) {
		message.author.send("", {embed: {
			author: {
				icon_url: client.user.avatarURL,
				name: "Commands from Cyclone™"
			},
			color: 0x00ffff,
			fields: [
				{
					name: "**__Others__**",
				    value: "[~emojify](http://cyclonebot.blogspot.com/p/emojify.html) Emojifies text\n[~info](http://cyclonebot.blogspot.com/p/emojify.html) Shows stats of the bot\n[~paste <code>](http://cyclonebot.blogspot.com/p/paste.html) Post a code on pastebin\n[~spinners](http://cyclonebot.blogspot.com/p/spinners.html) Explore the fidget spinner store\n[~spin <spinner>](http://cyclonebot.blogspot.com/p/spin.html) Spin a specific spinner from the store\n[~invite](http://cyclonebot.blogspot.com/p/invite.html) Join my home, or bring me to your server\n[~send <message>](http://cyclonebot.blogspot.com/p/send.html) Send messages to bot owner.\n[~stats](http://cyclonebot.blogspot.com/p/stats.html) Shows you your stats.\n[~help](http://cyclonebot.blogspot.com/p/help.html) Shows up this menu",
				},
                {
                    name: "**__Music__**",
                    value: "[~play <search>](http://cyclonebot.blogspot.com/p/play.html) Play a music which is queued by **~addqueue**\n[~skip](http://cyclonebot.blogspot.com/p/skip.html) Skip some songs in the queue.\n[~queue](http://cyclonebot.blogspot.com/p/queue.html) Displays the currect queue\n[~pause](http://cyclonebot.blogspot.com/p/pause.html) Pause music playback\n[~resume](http://cyclonebot.blogspot.com/p/resume.html) Resume music playback\n[~volume <num>(http://cyclonebot.blogspot.com/p/volume.html) Adjust the playback volume between 1 and 200\n[~leave](http://cyclonebot.blogspot.com/p/leave.html) leaves the channel\n[~join](http://cyclonebot.blogspot.com/p/join.html) Joins a voice channel\n[~addqueue <song-name>](http://cyclonebot.blogspot.com/p/addqueue.html) Adds songs to the queue\n[~time](http://cyclonebot.blogspot.com/p/playbacktime.html) Shows the playback time"                   
                },
                {
                    name: "**__Calculation__**",
                    value: "[~subtract <1> <2>](http://cyclonebot.blogspot.com/p/subtract.html) subtracts 2 numbers\n[~multiply <1> <2>](http://cyclonebot.blogspot.com/p/multiply.html) multiplies 2 numbers\n[~divide <1> <2>](http://cyclonebot.blogspot.com/p/divide.html) divides 2 numbers\n[~add <1> <2>](http://cyclonebot.blogspot.com/p/add.html) adds 2 numbers"                        
                },
                {
                    name: "**__Tags__**",
                    value: "[~tag <tag>](http://cyclonebot.blogspot.com/p/tag.html) Displays a tag\n[~tag-add <name> <content>](http://cyclonebot.blogspot.com/p/tag-add.html) Adds a tag\n[~tag-del <name>](http://cyclonebot.blogspot.com/p/tag-del.html) Deletes a tag\n[~tag-list](http://cyclonebot.blogspot.com/p/tag-list.html) Displays the tag list"                   
                },
                {
                    name: "**__Media__**",
                    value: "[~urban](http://cyclonebot.blogspot.com/p/urban.html) Shows words from urban dictionary\n[~comic](http://cyclonebot.blogspot.com/p/comic.html) Shows a random c&h comic\n[~dict](http://cyclonebot.blogspot.com/p/dict.html) Search dictionary.com\n[~9gag](http://cyclonebot.blogspot.com/p/9gag.html) Fetches a 9gag post\n[~google <search>](http://cyclonebot.blogspot.com/p/google.html) Searchs google\n[~gif](http://cyclonebot.blogspot.com/p/gif.html) Sends a gif\n[~mdn <search>](http://cyclonebot.blogspot.com/p/mdn.html) Searchs Mozilla developer network\n[~weather <location>](http://cyclonebot.blogspot.com/p/weather.html) Shows some weather info about the location\n[~yt <search>](http://cyclonebot.blogspot.com/p/yt.html) Searchs youtube for the content you want"
                }
			]
	    }}).then(() => message.author.send("", {embed:{
            color: 0x00ffff,
            fields: [
                {
                    name: "**__Fun__**",
                    value: "[~joke](http://cyclonebot.blogspot.com/p/joke.html) A random knock-knock joke\n[~fml](http://cyclonebot.blogspot.com/p/fml.html) Random fml Quote\n[~yoda <text>](http://cyclonebot.blogspot.com/p/yoda.html) Turn a text to yoda speech\n[~pokemon](http://cyclonebot.blogspot.com/p/pokemon.html) Catch a pokemon\n[~leet](http://cyclonebot.blogspot.com/p/leet.html) Leets a message\n[~ping](http://cyclonebot.blogspot.com/p/ping.html) Test the bot's speed\n[~say <message>](http://cyclonebot.blogspot.com/p/say.html) Says the message\n[<mention> (message)](http://cyclonebot.blogspot.com/p/cleverbot.html) Have a chat with cleverbot\n[~roll](http://cyclonebot.blogspot.com/p/roll.html) Roll a dice! and tell which number it rolled\n[~coinflip](http://cyclonebot.blogspot.com/p/coinflip.html) Flips a coin and tells you which side it flipped\n[~race <mention>](http://cyclonebot.blogspot.com/p/race.html) Race with the mentioned user"                    
                },
                {
                    name: "**__Info__**",
                    value: "[~movie](http://cyclonebot.blogspot.com/p/movie.html) Shows information about a movie\n[~pokedex](http://cyclonebot.blogspot.com/p/pokedex.html) Get information about a pokemon\n[~uptime](http://cyclonebot.blogspot.com/p/uptime.html) Shows cyclone's uptime\n[~userinfo <@mention>](http://cyclonebot.blogspot.com/p/userinfo.html) Shows some information about the mentioned user\n[~time](http://cyclonebot.blogspot.com/p/time.html) Sends the current time\n[~serverinfo](http://cyclonebot.blogspot.com/p/serverinfo.html) Sends information of your server\n[~avatar](http://cyclonebot.blogspot.com/p/avatar.html) Sends your avatar. if *~Avatar @mention* then sends the avatar of the mentioned user\n[~bans](http://cyclonebot.blogspot.com/p/bans.html) Shows the banned users in the server"                    
                },
                {
                    name: "**__Games__**",
                    value: "[~trivia](http://cyclonebot.blogspot.com/p/trivia.html) Gives a trivia question\n[~rps](http://cyclonebot.blogspot.com/p/rps.html) Play rock paper scissors"                    
                },
                {
                    name: "**__Moderation__** (part-1)",
                    value: "[~kick <mention>](http://cyclonebot.blogspot.com/p/kick.html) Kicks the mentioned user\n[~ban <mention>](http://cyclonebot.blogspot.com/p/ban.html) Bans the mentioned member\n[~mute <mention> <reason>](http://cyclonebot.blogspot.com/p/mute.html) Mutes the mentioned user\n[~unmute <mention>](http://cyclonebot.blogspot.com/p/unmute.html) unmutes the mentioned user\n[~warn <mention> <reason>](http://cyclonebot.blogspot.com/p/warn.html) Warn the mentioned user for a reason\n[~nick <mention> <nickname>](http://cyclonebot.blogspot.com/p/nick.html) Set a user's nickname\n[~giverole](http://cyclonebot.blogspot.com/p/giverole.html) Gives a role to a member\n[~removerole](http://cyclonebot.blogspot.com/p/removerole.html) Removes a role from a member"
                },
                {
                    name: "**__Moderation__** (part-2)",
                    value: "[~unban](http://cyclonebot.blogspot.com/p/unban.html) Unbans a user\n[~voice-mute](http://cyclonebot.blogspot.com/p/voice-mute.html) Mutes a user in voicechannel\n[~voice-unmute](http://cyclonebot.blogspot.com/p/voice-unmute.html) Unmutes a user in voicechannel\n[~create <name>](http://cyclonebot.blogspot.com/p/create.html) Creates a channel.\n[~set](http://cyclonebot.blogspot.com/p/set.html) Creates Cyclone's log channel\n[~del <amount>](http://cyclonebot.blogspot.com/p/del.html) Delete the amount of messages sent in the server"
                }
            ],
            timestamp: new Date(),
            footer: {
            text: 'created by Cyclone'
            }
        }})); 
		if (message.channel.type !== 'text') return;
		message.channel.send(':envelope_with_arrow: *check your DMs*')
	}else

	if (message.content.toLowerCase().startsWith(prefix + 'rps')) {
		let rps = ["**:moyai: rock**", "**:pencil: paper**", "**:scissors: scissors**"];
		let random = rps[Math.floor(Math.random()*3)]
		let choice = args.join(" ").toLowerCase();
        if (args.size === 0) return message.reply("Please specify either rock, paper or scissors.");
        if (choice !== "rock" && choice !== "paper" && choice !== "scissors") return message.reply(`Please specify either rock, paper or scissors. ${choice} isn't one of those!`);
        message.reply(random);
	}else

	if (message.content.toLowerCase().startsWith(prefix + 'pokedex')) {
		var pokemonGif = require('pokemon-gif');
		var Pokedex = require('pokedex-promise-v2');
        var p = new Pokedex();
        if (args.length === 0) return message.reply('**Usage:** ~pokedex <pokemon-name>');
        p.getPokemonByName(args.join(" ")).then(function(response) {
                message.channel.send("", {embed:{
            	    color: 0x00ffff,
            	    fields: [
            	        {
            	            name: `Pokemon Info`,
            	    	    value: `**Name:** ${response.name}\n**Weight:** ${response.weight}\n**Height:** ${response.height}\n**ID:** ${response.id}`,
            	        }
            	    ],
            	    image: {
            	    	url: pokemonGif(response.name)
            	    },
            	    timestamp: new Date()
                }});           	

        }).catch(function(error) {
          message.channel.send(`**Error:** Could not find pokemon **${args.join(" ")}**`);
        });
	}else

    if (message.content.toLowerCase().startsWith(prefix + 'comic')) {
        var r = request.get('http://explosm.net/comics/random', function (err, res, body) {
            message.channel.send(r.uri.href)
        });
    }else

    if (message.content.toLowerCase().startsWith(prefix + 'trivia')) {
        request("http://jservice.io/api/random", (err, res, body) => {
            if (err) return console.log(err)
            let quiz = JSON.parse(body)
            message.channel.send("", {embed: {
                title: "Random Trivia",
                color: 0x00ffff,
                description: "You have 30 seconds to anwser the question.",
                author: {
                    name: message.guild.name,
                    icon_url: message.guild.iconURL
                },
                fields: [
                    {
                        name: "Category:",
                        value: quiz[0].category.title
                    },
                    {
                        name: "Question:",
                        value: quiz[0].question
                    }
                ]
            }})
            message.channel.awaitMessages(rm => rm.author.bot === false, {
                max: 10,
                time: 30000,
                errors: ['time'],
            }).then((collected) => {
                if (collected.includes(quiz[0].answer.toLowerCase())) {
                    return message.reply(`Congrats ${collected.author.username}! You gave the right answer: ${quiz[0].answer}`)
                }
            }).catch(collected => {
                if (!collected) message.reply(`No answers are submitted in the previous 30 seconds. correct answer: ${quiz[0].answer}`)
                message.reply(`After 30 seconds, ${collected.size} answers are Submitted and no correct answers.correct answer: ${quiz[0].answer}`);
            });
        });      
    }else

	if (message.content.toLowerCase().startsWith(prefix + 'pokemon')) {
		let randomPokemon = require('pokemon-random-name');
        let pokemon = randomPokemon();
        if (pokemon.toLowerCase().startsWith("nidoran")) return message.channel.send(`**${message.author.username}**, you caught nothing.`);
        message.channel.send(`**${message.author.username}**, you have caught a **${pokemon}**!`).catch(console.error);
	}else

    if (message.content.toLowerCase().startsWith(prefix + 'gif')) {
        var gifSearch = require('gif-search');
        if (args.length === 0) return message.reply('**Usage:** ~gif <search-terms>');
        gifSearch.random(argresult).then(gifUrl => {
            if (!gifUrl) return message.reply(`**Error:** No results for ${args.join(' ')}!`);
            message.channel.send("", {embed:{
                color: 0x00ffff,
                image: {
                    url: gifUrl
                },
                timestamp: new Date()
            }});
        });
    }else

    if (message.content.toLowerCase().startsWith(prefix + 'emojify')) {
        if (args.length === 0) return message.reply('**Usage:** ~emojify <content>');
        let special = {
            "0": ":zero:",
            "1": ":one:",
            "2": ":two:",
            "3": ":three:",
            "4": ":four:",
            "5": ":five:",
            "6": ":six:",
            "7": ":seven:",
            "8": ":eight:",
            "9": ":nine:",
            "<": ":arrow_backward:",
            ">": ":arrow_forward:",
            "!": ":exclamation:",
            "?": ":question:",
            "^": ":arrow_up_small:",
            "+": ":heavy_plus_sign:",
            "-": ":heavy_minus_sign:",
            "÷": ":heavy_division_sign:",
            ".": ":radio_button:",
            "~": ":wavy_dash:",
            "$": ":heavy_dollar_sign:",
            "#": ":hash:",
            "*": ":asterisk:"
        }
        let emoji = args.join(" ");
        let done = "";
        for (c = 0; c < emoji.length; c++) {
            if (/\s/g.test(emoji[c])) {
                done += "   ";
            } else if (/[abcdefghijklmnopqrstuvwxyz]/g.test(emoji[c])) {
                done += emoji[c].replace(emoji[c], " :regional_indicator_" + emoji[c] + ":");
            } else if (special[emoji[c]]) {
                done += " " + special[emoji[c]]
            } else {
                done += " " + emoji[c] + " "
            }
        }
        message.channel.send(done)
    }else

    if (message.content.toLowerCase().startsWith(prefix + 'info')) {
        var milliseconds = parseInt((client.uptime % 1000) / 100),
        seconds = parseInt((client.uptime / 1000) % 60),
        minutes = parseInt((client.uptime / (1000 * 60)) % 60),
        hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        var pack = require('./package.json');
        message.channel.send("", {embed: {
            color: 0x00ffff,
            description: '**Cyclone Statistics**\n',
            fields: [{
                name: '❯ Uptime',
                value: `${hours}:${minutes}:${seconds}.${milliseconds}`,
                inline: true
            }, {
                name: '❯ Memory usage',
                value: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
                inline: true
            }, {
                name: '❯ Version',
                value: pack.version,
                inline: true
            }],
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL, 
                text: 'Statistics'
            }
        }});
    }else

	if (message.content.toLowerCase().startsWith(prefix + 'serverinfo')) {
		message.channel.send("", {embed: {
			author: {
				name: message.guild.name,
				icon_url: message.guild.iconURL
			},
			color: 0x00ffff,
			fields: [
				{
					name: `**_Informations about this server_**`,
				    value: `**Id:**\n${message.guild.id}\n**Owner:**\n${message.guild.owner.user.username}\n**Members:**\n${message.guild.memberCount}\n**Region:**\n${message.guild.region}\n**Created At:**\n${message.guild.createdAt}`,
				}

			],
			timestamp: new Date(),
			footer: {
            icon_url: client.user.avatarURL,
            text: 'created by Cyclone'
            }
	        }});
	}else

	if (message.content.toLowerCase().startsWith(prefix + 'leet')) {
		var leet = require('l33tsp34k');
		if (args.size === 0) return message.reply('***Usage:*** *~leet <something>*');
		message.channel.send(leet(argresult))
	}else

	if (message.content.toLowerCase().startsWith(prefix + 'botinfo')) {
		message.channel.send("", {embed: {
			color: 0x00ffff,
			author: {
				name: client.user.username,
				icon_url: client.user.avatarURL
			},
			fields: [
				{
					name: `**_Informations about me_**`,
				    value: `**Id:** ${client.user.id}\n**Created At:** ${client.user.createdAt}\n**Uptime:** ${client.uptime}\n**Discriminator:** ${client.user.discriminator}`,
				}
			],
			timestamp: new Date(),
			footer: {
            icon_url: client.user.avatarURL,
            text: 'created by Cyclone'
            }
	        }});
	}else

	if (message.content.toLowerCase().startsWith(prefix + 'userinfo')) {
		let author = message.author;
		let member = message.mentions.users.first();
		if (member === client.user) return message.reply('If you want to view information about me, type **~botinfo**!')
		if (message.mentions.users.size === 0) return message.channel.send("", {embed: {
			color: 0x00ffff,
			author: {
				name: author.username,
				icon_url: author.avatarURL
			},
			fields: [
				{
					name: `**_Informations about You_**`,
				    value: `**Id:** ${author.id}\n**Created At:** ${author.createdAt}\n**Discriminator:** ${author.discriminator}\n**Bot:** ${author.bot}\n**Status:** ${author.presence.status}\n**Nickname:** ${author.nickname} \n**Joined At:** ${author.JoinedAt}`,
				}
			],
			timestamp: new Date(),
			footer: {
            icon_url: client.user.avatarURL,
            text: 'created by Cyclone'
            }
	        }});
		message.channel.send("", {embed: {
			color: 0x00ffff,
			author: {
				name: member.username,
				icon_url: member.avatarURL
			},
			fields: [
				{
					name: `**_Informations about ${member.username}_**`,
				    value: `**Id:** ${member.id}\n**Created At:** ${member.createdAt}\n**Discriminator:** ${member.discriminator}\n**Bot:** ${member.bot}\n**Status:** ${member.presence.status}\n**Nickname:** ${member.nickname} \n**Joined At:** ${member.JoinedAt}`,
				}
			],
			timestamp: new Date(),
			footer: {
            icon_url: client.user.avatarURL,
            text: 'created by Cyclone'
            }
	        }});
	}else

	if(message.content.toLowerCase().startsWith(prefix + "race")) {
		let porsche = message.mentions.users.first().username;
        let porsche2 = message.author.username;
		let Array1 = [`${porsche}'s starting was successful but ${porsche2}'s starting was not too succesful, so ${porsche} took the lead`, `${porsche2}'s starting was successful but ${porsche}'s starting was not too succesful, so ${porsche2} took the lead`, `both of them started really good and don't know who will take the lead now`];
		let Array2 = [`${porsche2}'s car crashed in first corner, that made him start again from the position he crashed, but don't forget that he may take lead`, `${porsche}'s car crashed in first corner, that made him start again from the position he crashed, but don't forget that he may take lead`, `both of them cornered really well and don't know who is going to take lead now`];
		let Array3 = [`${porsche2}'s car crashed in second corner, that made him start again from the position he crashed, but don't forget that he may take lead`, `${porsche}'s car crashed in second corner, that made him start again from the position he crashed, but don't forget that he may take lead`, `both of them cornered really well and don't know who is going to take lead now`];
		let Array4 = [`${porsche} pressed the NOS button and he crossed the finishing line first, and ${porsche2} was out of NOS. And the winner is ${porsche} :trophy:`, `${porsche2} pressed the NOS button and he crossed the finishing line first, and ${porsche} was out of NOS. And the winner is ${porsche2} :trophy:`, `both of them pressed NOS button and crossed the finishing line at the same time, so this is a draw. no one won`];
        let Element1 = Array1[Math.floor(Math.random()*Array1.length)]
		let Element2 = Array2[Math.floor(Math.random()*Array2.length)]
		let Element3 = Array3[Math.floor(Math.random()*Array3.length)]
		let Element4 = Array4[Math.floor(Math.random()*Array4.length)]
		if (message.mentions.users.size === 0) return message.reply('Mention a user first!')
         message.channel.send("", {embed: {
         	color: 0x00ffff,
         	image: {
         		url: "https://images.discordapp.net/.eJwNyVEOgyAMANC7cACKgBS9DUEEEl0J7T6WZXef7_d91XtealdNZPAOcHTONA_NQjPVoitRvUoanXWmG5JIyu0uL2GwFr1Ba9zicUMbTARnlzXi6jGG4Lb4JNQ-2kfXfqrfH7_zIeg.WvbdX44OUQbsGzm0zENfDjD2L5Q"
         	}
         }});
		message.channel.send("", {embed: {
			color: 0x00ffff,
			fields: [
				{
					name: "**_Starting point_**",
				    value: `${Element1}`
				},
				{
					name: "**_First Corner_**",
				    value: `${Element2}`
				},
				{
					name: "**_Second Corner_**",
				    value: `${Element3}`
				},
				{
					name: "**_Finishing Line_**",
				    value: `${Element4}`					
				}
			],
	        }});

	}else

	if (message.content.toLowerCase().startsWith(prefix + 'yt')) {
		var YouTube = require('youtube-node');
		var youtube = new YouTube();
		if (args.length === 0) return message.reply('What to search in youtube!');
		youtube.setKey("AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU");
		youtube.search(args.join(" "), 2, function(error, result) {
			if (error) {
				console.log(error);
			}
			else {
				message.channel.send("http://www.youtube.com/watch?v=" + result.items[0].id.videoId);
			}
		});
	}else

	if (message.content.toLowerCase().startsWith(prefix + 'roll')) {
		var random = Math.floor(Math.random() * 6);
		message.channel.send(`***${message.author.username}***, *you rolled ${random}*! :game_die:`).catch(console.error);
	}else

    if (message.content.toLowerCase().startsWith(prefix + 'reload-tag')) {
        if(message.author.id !== "281101765909282816") return message.channel.send(`Only my creator can reload tags`);
        sql.open('./hfajdf.sqlite').then(() => sql.run("CREATE TABLE IF NOT EXISTS tags (name, contents, guildid)")).catch(console.error)
    }else

    if (message.content.toLowerCase().startsWith(prefix + 'fml')) {
        var HTMLParser = require('fast-html-parser');
        superagent.get('http://www.fmylife.com/random').end((err, res) => {
            if (err) return message.reply('**Error:** Cant connect with [fml](http://www.fmylife.com/). Try again later! :wink:');
            let root = HTMLParser.parse(res.text);
            let article = root.querySelector('.post.article .fmllink');
            message.reply(article.childNodes[0].text).catch(error => console.log(error.stack));
        });
    }else

    if (message.content.toLowerCase().startsWith(prefix + 'movie')) {
        if (args.length === 0) return message.reply("**Usage:** ~movie <movie-name>")
        var movieInfo = require('movie-info');
        movieInfo(argresult, function (err, res) {
            if (err) return message.reply(`**Error:** No results for *${argresult}*`)
            message.channel.send("", {embed:{
                color: 0x00ffff,
                author: {
                    name: "Movie Info",
                    icon_url: client.user.avatarURL
                },
                image: {
                    url: `https://image.tmdb.org/t/p/original${res.backdrop_path}`
                },
                fields: [
                    {
                        name: res.title,
                        value: res.overview
                    }
                ],
                timestamp: new Date()
            }});
        });
    }else

    if (message.content.toLowerCase().startsWith(prefix + 'joke')) {
        var knockknock = require('knock-knock-jokes')
        message.reply(`:black_joker: ${knockknock()}`);
    }else

    if (message.content.toLowerCase().startsWith(prefix + '9gag')) {
        var gag = require('node-9gag')
        if (args.length === 0) return message.reply('**Usage:** ~9gag <search-terms>');
        gag.find(argresult, function (err, res) {
            if (err) return message.reply(`No results for **${argresult}**`);
            message.channel.send("", {embed:{
                color: 0x00ffff,
                author: {
                    icon_url: "https://images-cdn.9gag.com/photo/azL60YN_460s.jpg"
                },
                fields: [
                    {
                        name: `9GAG`,
                        value: `[${res.result[0].title}](${res.result[0].url})`
                    }
                ],
                image: {
                    url: res.result[0].image
                },
                timestamp: new Date()
            }});
        });
    }else

    if (message.content.toLowerCase().startsWith(prefix + 'coinflip')) {
		let myArray = ["*You flipped* ***Heads***", "*You flipped* ***Tails***"];
        let randomElement = myArray[Math.floor(Math.random()*myArray.length)]
        message.channel.send(`${randomElement}`).catch(console.error);
	}else

    if (command === 'tag') {
        if (message.channel.type !== 'text') return message.reply('This wont work on DMs');
        let guildid = message.guild.id;
        let name = args[0];
        if (args.length === 0) return message.reply('**Error:** not a valid format. *~tag <name>*')
        sql.open('./hfajdf.sqlite').then(() => sql.get(`SELECT * FROM tags WHERE guildid = ? AND name = ?`, [guildid, name])).then(row => {
            if (row) {
                let message_content = message.mentions.users.array().length === 1 ? `${message.mentions.users.array()[0]} ${row.contents}` : row.contents;
                message.channel.send(message_content);
            } else {
                message.channel.send(`Could not find tag **${args[0]}**.`);
            }
        }).catch(console.error);
    }else

    if (command === 'tag-add') {
        if (message.channel.type !== 'text') return message.reply('This wont work on DMs');
        let name = args[0];
        let contents = args.slice(1).join(' ');
        let guildid = message.guild.id;
        if (args.length === 0) return message.reply('**Error:** not a valid format. *~tag-add <example-name> <content>*')
        sql.open('./hfajdf.sqlite').then(() => sql.get(`SELECT * FROM tags WHERE name = ?`, name)).then(row => {
            if (!row) {
                sql.run('INSERT INTO tags (name, contents, guildid) VALUES (?, ?, ?)', [name, contents, guildid]).then(() => {
                    message.channel.send(`Tag ${name} was added`).then(response => {
                        response.delete(5000);
                    });
                }).catch(console.error)
            } else {
                message.channel.send(`Duplicate Tag **${name}** found.`);
            }
        }).catch(console.error);            
    }else

    if (command === 'tag-del') {
        if (message.channel.type !== 'text') return message.reply('This wont work on DMs');
        let guildid = message.guild.id;
        let name = args[0];        
        if (args.length === 0) return message.reply('**Error:** not a valid format. *~tag-del <name>*')
        sql.open('./hfajdf.sqlite').then(() => {
            sql.run('DELETE FROM tags WHERE guildid = ? AND name = ?', [guildid, name]).then(() => {
                message.channel.send(`The tag **${args[0]}** has been deleted`);
            }).catch(console.error);
        }).catch(console.error);
    }else

    if (message.content.toLowerCase().startsWith(prefix + 'dict')) {
        if (args.length === 0) return message.reply('**Usage:** ~dict <word>');
        var webdict = require('webdict');
        webdict('dictionary', args.join(' ')).then(resp => {
            if (!resp) return message.reply(`No results for **${argresult}**`);
            var define = "• " + resp.definition.join("\n• ")
            message.channel.send("", {embed:{
                color: 0x00ffff,
                author: {
                    name: "Dictionary",
                    icon_url: client.user.avatarURL
                },
                fields: [
                    {
                        name: `Showing results for ${argresult}`,
                        value: `${define}`
                    }
                ]
            }});
        });
    }else

    if (command === 'tag-list') {
        if (message.channel.type !== 'text') return message.reply('This wont work on DMs');    
        let guildid = message.guild.id;
        sql.open('./hfajdf.sqlite').then(() => sql.all(`SELECT * FROM tags WHERE guildid = ?`, guildid)).then(rows => {
            if (!rows) {
                return message.reply("No tags in this server!");
            } else {           
                let plan = rows.map(r => r.name).join(', ');
                message.channel.send("", {embed: {
                    color: 0x00ffff,
                    fields: [
                        {
                            name: "Tags:",
                            value: plan
                        }
                    ],
                    timestamp: new Date()      
                }}).catch(console.error);
            } 
        }).catch(console.error);
    }else

    if (message.content.toLowerCase().startsWith(prefix + "eval")) {
       if(message.author.id !== "281101765909282816") return message.channel.send(`only my creator can use this command`);
       try {
         var code = args.join(" ");
         var evaled = eval(code);

         if (typeof evaled !== "string")
           evaled = require("util").inspect(evaled);

         message.channel.send("", {embed: {
			color: 0x00ffff,
			fields: [
				{
					name: ":inbox_tray: Input:",
				    value: `\`\`\`js\n${code}\n\`\`\``
				},
				{
					name: ":outbox_tray: Output:",
					value: `\`\`\`js\n${"xl", clean(evaled)}\n\`\`\``
				}

			],
	        }});
 
       } catch (err) {
         message.channel.send("", {embed: {
			color: 0x00ffff,
			fields: [
				{
					name: ":inbox_tray: Input:",
				    value: `\`\`\`js\n${code}\n\`\`\``
				},
				{
					name: ":outbox_tray: Output:",
					value: `\`\`\`js\n${clean(err)}\n\`\`\``
				}

			],
	        }});
       }
    }else

    if (message.content.toLowerCase().startsWith(prefix + 'bans')) {
    	message.guild.fetchBans().then(x=>{x.map(x=> 
    		message.channel.send("", {embed: {
			color: 0x00ffff,
			fields: [
				{
					name: `**_Bans in this server:_**`,
				    value: x.username
				}
			]
	        }}))});
    }else

    if (message.content.toLowerCase().startsWith(prefix + 'send')) {
        if (message.channel.type !== 'text') return;
    	if (args.length === 0) {
    		return message.reply("Whats the message!");
    	}
    	message.reply("*Message Submitted!*");
        client.guilds.find("name", "CYCLONE TESTING SERVER").channels.find("name", "support").send("", {embed: {
            color: 0x00ffff,
            fields: [
                {
                    name: `${message.author.username} from ${message.guild.name}(${message.channel.id}):`,
                    value: argresult
                }
            ]
        }})
    }else

    if (message.content.toLowerCase().startsWith(prefix + 'invite')) {
    	message.author.send("", {embed: {
    		color: 0x00ffff,
    		fields: [
    		    {
    		    	name: "Join My home:",
    		    	value: "[Click here](https://discord.gg/DHpxhJ6)"
    		    },
    		    {
    		    	name: "Invite me to your server:",
    		    	value: "[Click here](https://discordapp.com/oauth2/authorize?permissions=536345670&scope=bot&client_id=297672512135757825)"
    		    }
    		],
    		timestamp: new Date()
    	}});
    	if (message.channel.type !== 'text') return;
		message.reply(':envelope_with_arrow: *check your DMs*');    
    }else

    if (message.content.toLowerCase().startsWith(prefix + 'ping')) {
        message.channel.send('*Ponging...*').then(sent => {
            sent.edit("", {embed: {
            color: 0x00ffff,
            fields: [
                {
                    name: "Pong!",
                    value: `Took \`${sent.createdTimestamp - message.createdTimestamp} ms\` :ping_pong:`
                }
            ]
        }});
        });
    }else

    if (message.content.toLowerCase().startsWith(prefix + 'mdn')) {
        var scrapeMdn = require("scrape-mdn");
        if (args.length === 0) return message.reply("***Usage:*** *~mdn <something to look for>*")
        scrapeMdn.search(args.join(" ")).then((results) => {
            var {url, title, description} = results[0];
            if (!results) {
                return message.reply(`*No results for* ***${argresult}***!`);
            }
            message.channel.send("", {embed: {
                color: 0x00ffff,
                fields: [
                    {
                        name: `Mozilla Developer Network`,
                        value: `[${title}](${url})\n${description}`
                    },
                ],
                timestamp: new Date()
            }});
        });
    }else

    if (message.content.toLowerCase().startsWith(prefix + 'set')) {
    	let guild = message.guild;
    	let modRole = guild.roles.find("name", "Mod");
    	if (!modRole) return;
    	if (!message.member.roles.has(modRole.id)) return message.reply('You should have `Mod` role to turn my log system on!')
        if (!guild.me.hasPermission('MANAGE_CHANNELS')) return message.reply('I dont have permissions to create a channel!');
	    guild.createChannel('cyclone', 'text');
	    message.channel.send('Settings done!')
    }else

    if (message.content.toLowerCase().startsWith(prefix + 'giverole')) {
    	let guild = message.guild;
        if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.reply("**Error:** I don't have the **| Manage Roles |** permission!");
    	let modRole = guild.roles.find("name", "Mod");
    	if (!modRole) return;
    	if (!message.member.roles.has(modRole.id)) return message.reply('You should have `Mod` role to give someone a role!')
        if (message.mentions.users.size === 0) return message.reply("Please mention a user to give the role to.\n**Example:** `~giverole @user Members`");
        let member = message.guild.member(message.mentions.users.first());
        if (!member) return message.reply("**Error:** That user does not seem valid.");
        let name = message.content.split(" ").splice(2).join(" ");
        let role = message.guild.roles.find("name", name);
        if (!role) return message.reply(`**Error:** | ${name} | isn't a role on this server!`);
        let botRolePosition = message.guild.member(client.user).highestRole.position;
        let rolePosition = role.position;
        if (botRolePosition <= rolePosition) return message.channel.send("**Error:** Failed to add the role to the user because my highest role is lower than the specified role.");
        member.addRole(role).catch(e => {
            return message.channel.send(`**Error:**\n${e}`);
        });
        message.channel.send(`***${message.author.username}***, *I've added the role of* ***${name}*** to ***${message.mentions.users.first().username}***.`);    	
    }else

    if (message.content.toLowerCase().startsWith(prefix + 'uptime')) {
        var mention = message.mentions.users.first();
        var milliseconds = parseInt((client.uptime % 1000) / 100),
        seconds = parseInt((client.uptime / 1000) % 60),
        minutes = parseInt((client.uptime / (1000 * 60)) % 60),
        hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        message.channel.send("", {embed:{
            color: 0x00ffff,
            author: {
                name: "Cyclone's Uptime",
                icon_url: client.user.avatarURL
            },
            fields: [
                {
                    name: "Hours:",
                    value: hours,
                    inline: true
                },
                {
                    name: "Minutes:",
                    value: minutes,
                    inline: true
                },
                {
                    name: "Seconds:",
                    value: `${seconds}.${milliseconds}`,
                    inline: true
                }
            ]
        }});
    }else

    if (message.content.toLowerCase().startsWith(prefix + 'removerole')) {
    	let guild = message.guild;
        if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.reply("**Error:** I don't have the **| Manage Roles |** permission!");
    	let modRole = guild.roles.find("name", "Mod");
    	if (!modRole) return;
    	if (!message.member.roles.has(modRole.id)) return message.reply('You should have `Mod` role to remove a role from a user!')
        if (message.mentions.users.size === 0) return message.reply("Please mention a user to remove the role from.\n**Example:** `~removerole @user Members`");
        let member = message.guild.member(message.mentions.users.first());
        if (!member) return message.reply("**Error:** That user does not seem valid.");
        let name = message.content.split(" ").splice(2).join(" ");
        let role = message.guild.roles.find("name", name);
        if (!role) return message.reply(`**Error:** | ${name} | isn't a role on this server!`);
        if (!member.roles.has(role.id)) return message.reply(`**Error:** ${message.mentions.users.first().username} does not have the role`);
        let botRolePosition = message.guild.member(client.user).highestRole.position;
        let rolePosition = role.position;
        if (botRolePosition <= rolePosition) return message.channel.send("**Error:** Failed to remove the role from the user because my highest role is lower than the specified role.");
        member.removeRole(role).catch(e => {
            return message.channel.send(`\`\`\`\n**Error:**\n${e}\`\`\`\nPlease report this to bot owner using ~send`);
        });
        message.channel.send(`***${message.author.username}***, *I've removed the role of* ***${name}*** from ***${message.mentions.users.first().username}***.`);    	
    }else

    if (message.content.toLowerCase().startsWith(prefix + 'hack')) {
        if (message.author.id !== "281101765909282816" && message.author.id !== "284261379228172289") return message.reply('Only my owner can hack websites ip address. but do not tell this to anyone else');
        let dns = require('dns');
        dns.lookup(argresult,function onLookup(err,address,family){
            if (err) return message.reply('**Error:** the webpage is having more security options.');
            dns.reverse(address,function(err,hostname){
                if (err) return message.reply('**Error:** the webpage is having more security options.');
                message.author.send("", {embed:{
                    color: 0x00ffff,
                    author: {
                        name: "Webpage Hacking System",
                        icon_url: client.user.avatarURL
                    },
                    fields:[
                        {
                            name: argresult,
                            value: 'successfully hacked the website'
                        },
                        {
                            name: "IP address",
                            value: address,
                            inline: true
                        }
                    ],
                    timestamp: new Date()
                }});
            });
        });
    }else

    if (message.content.toLowerCase().startsWith(prefix + 'yoda')) {
        const unirest = require('unirest')
        let these = args.join("+")
        unirest.get("https://yoda.p.mashape.com/yoda?sentence=" + these)
            .header("X-Mashape-Key", "JaQdLGeOlzmshQ3f2imPtIN6MziFp1SFNWfjsnK9yN89vERIM8")
            .header("Accept", "text/plain")
            .end(function (result) {
                message.reply(`**YODA :** ${result.body}`);
            });
    }else

    if (message.content.toLowerCase().startsWith(prefix + 'create')) {
    	let guild = message.guild;
    	let modRole = guild.roles.find("name", "Mod");
    	let botChannel = guild.channels.find("name", "cyclone");
    	if (args.length === 0) {
    		return message.reply('***Usage:*** *~create* <name>*');
    	} 
    	if (!botChannel) return;
    	if (!modRole) return;
    	if (!message.member.roles.has(modRole.id)) return message.reply('You should have `Mod` role to make channels!')   
    	if (!guild.me.hasPermission('MANAGE_CHANNELS')) return message.reply('I dont have permissions to create channels!');
	    guild.createChannel(args.join("-"), 'text');
	    botChannel.send("", {embed: {
	    	color: 0x00ffff,
	    	author: {
	    		icon_url: message.author.avatarURL,
	    		name: message.author.username
	    	},
	    	fields: [
	    	    {
	    	    	name: "Channel created",
	    	    	value: `A channel by the name of **${args.join("-")}** has been created for **${message.author.username}**'s command!`
	    	    }
	    	],
	    	timestamp: new Date(),
	    	footer: {
	    		text: "created by Cyclone",
	    		icon_url: client.user.avatarURL
	    	}
	    }});
    }else

    if (message.content.toLowerCase().startsWith(prefix + 'urban')) {
        if (args.length === 0) return message.chanel.send('**Urban:** ~urban <word>')
    	var urban = require('urban');
    	var tword = args.join(" ") == "" ? urban.random() : urban(args.join(" "));
    	tword.first(function(json) {
    		if (json) {
    			var msg = `**Word:** ${json.word}\n**Definition:** ${json.definition}`;
    			if (json.example) {
    				msg = `**Word:** ${json.word}\n**Definition:** ${json.definition}\n**Example:** ${json.example}`;
    			}
    			message.channel.send("", {embed: {
    				color: 0x00ffff,
    				fields: [
    				    {
    				    	name: 'Urban Dictionary',
    				    	value: `${msg}`
    				    }
    				],
			        timestamp: new Date()  
    			}});
    		} else {
    			message.channel.send("", {embed: {
    				color: 0x00ffff,
    				fields: [
    				    {
    				    	name: 'Urban Dictionary',
    				    	value: `No results for **${args.join(" ")}**`
    				    }
    				],
			        timestamp: new Date()
    			}});
    		}
    	});
    }else

  if(message.content.toLowerCase().startsWith(prefix + "google")) {
    var google = require('google')
    google.resultsPerPage = 1
    var nextCounter = 0
    google(args.join(" "), function (err, res){
        if (err) console.error(err)
        for (var i = 0; i < res.links.length; ++i) {
  	    var link = res.links[i];
    	    message.channel.send("", {embed: {
    		    color: 0x00ffff,
    			    fields: [
    				    {
    				    	name: 'Google',
    				    	value: `Found results for *${args.join(" ")}*\n**${link.title}**\n ${link.href}`
    				    }
    				],
			        timestamp: new Date()
    		}});
  }});
  }else

if (message.content.toLowerCase().startsWith(prefix + 'kick')) {
	let kickMember = message.mentions.members.first();
	let modRole = message.guild.roles.find("name", "Mod");
	if (!modRole) return;
	if (!message.member.roles.has(modRole.id)) return message.reply("You should have a role called `Mod`")
      if(message.mentions.users.size === 0) return message.reply("Mention a user first!");
	if (kickMember.highestRole.position > message.guild.me.highestRole.position) return message.reply('The member you mentioned is having his role higher than me').catch(console.error);
	if (kickMember.highestRole.position === message.guild.me.highestRole.position) return message.reply('I need to have higher role than that user, to kick that user!').catch(console.error);
      if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.reply("I dont have the permissions to kick members!");
	kickMember.kick();
	message.reply("SUCCESS")
} else

if (message.content.toLowerCase().startsWith(prefix + 'paste')) {
	if (args.length === 0) return message.reply('***Usage:*** *~paste <code-here>*');
    pastebin.createPaste(argresult).then(function (data) {
        message.channel.send(data);
    });
}else

if (message.content.toLowerCase().startsWith(prefix + 'ban')) {
	let banMember = message.mentions.members.first();
	let modRole = message.guild.roles.find("name", "Mod");
	if (!modRole) return;
	if (!message.member.roles.has(modRole.id)) return message.reply("You should have a role called `Mod`")
      if(message.mentions.users.size === 0) return message.reply("Mention a user first!");
	if (banMember.highestRole.position > message.guild.me.highestRole.position) return message.reply('The member you mentioned is having his role higher than me').catch(console.error);
	if (banMember.highestRole.position === message.guild.me.highestRole.position) return message.reply('I need to have higher role than that user, to kick that user!').catch(console.error);
      if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("I dont have the permissions to ban members!");
	banMember.ban();
	message.reply("SUCCESS")
} else

if (message.content.toLowerCase().startsWith(prefix + 'unban')) {
    let modRole = message.guild.roles.find("name", "Mod");
    if (!modRole) return;
    if (args.length === 0) return message.reply('**Usage:** ~unban <username>')
    if (!message.member.roles.has(modRole.id)) return message.reply("You should have a role called `Mod`")
    if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("I dont have the permissions to unban members!");
    message.guild.fetchBans().then(lol => {
        var user = lol.find("username", args.join(' '));
        if (!user) return message.reply(`**Error:** No user with the username *${args.join(' ')}* in the ban list. please check the spelling and Capitalisation again.`);
        message.guild.unban(user.id).then(user => message.channel.send(`Unbanned **${user.username}**`)).catch(console.error);
     });
}else

if (message.content.toLowerCase().startsWith(prefix + 'weather')) {
	var weather = require('yahoo-weather');
	weather(argresult).then(info => {
      message.channel.send("", {embed: {
    	  color: 0x00ffff,
    	  fields: [
    		  {
    			    name: info.item.title,
    				value: `**Wind Direction** ${info.wind.direction}\n**Wind Speed** ${info.wind.speed}\n**Temperature** ${info.item.condition.temp}°C\n**Sky** ${info.item.condition.text}\n**Sunrise** ${info.astronomy.sunrise}\n**Sunset** ${info.astronomy.sunset}\n**Humidity** ${info.atmosphere.humidity}`
    		  },
    		  {
    		  	name: "Forecasts",
    		  	value: `**${info.item.forecast[1].date}** ${info.item.forecast[1].text}\n**${info.item.forecast[2].date}** ${info.item.forecast[2].text}\n**${info.item.forecast[3].date}** ${info.item.forecast[3].text}\n**${info.item.forecast[4].date}** ${info.item.forecast[4].text}\n**${info.item.forecast[5].date}** ${info.item.forecast[5].text}\n**${info.item.forecast[6].date}** ${info.item.forecast[6].text}\n**${info.item.forecast[7].date}** ${info.item.forecast[7].text}`
    		  }
    		],
		 timestamp: new Date()
    	 }});
    }).catch(err => {
      console.log(err);
    });
} else

var msg = message;

if(message.content.toLowerCase().startsWith(prefix + "mute")) {
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    let botChannel = message.guild.channels.find("name", "cyclone");
    let modRole = message.guild.roles.find("name", "Mod");
	if (!modRole) return;
	if (!message.member.roles.has(modRole.id)) return message.reply("You should have a role called `Mod`")
    if (!botChannel) return;
    let muteRole = message.guild.roles.find('name', 'muted');
    if (!muteRole) return message.reply('\`\`\`\n Step one = create a role called "muted"\n Step two = go to channel settings/permissions\n Step three = restrict "muted" role to send messages.\n Step four = run this command.\n\nWarning: the user wont be muted if you didnt adjust the permissions\`\`\`').catch(console.error);
    if (reason.length < 1) return message.reply('You must supply a reason for the mute.').catcsh(console.error);
    if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);
    if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the permissions to manage roles').catch(console.error);
     message.guild.member(user).addRole(muteRole).then(() => {
      botChannel.send("", {embed:{
      	color: 0x00ffff,
      	fields: [
      	    {
      	    	name: "User Muted",
      	    	value: `${message.author.username} Muted ${user.username} for ${reason}`
      	    }
      	],
      	footer: {
      		text: "created by cyclone",
      		icon_url: client.user.avatarURL
      	},
      	timestamp: new Date()
      }});
    });
}else

if(message.content.toLowerCase().startsWith(prefix + "unmute")) {
  let user = message.mentions.users.first()
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'muted')
    	let modRole = message.guild.roles.find("name", "Mod");
	if (!modRole) return;
	if (!message.member.roles.has(modRole.id)) return message.reply("You should have a role called `Mod`")
  if(message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole)
  }
  if(!message.guild.member(user).roles.has(muteRole.id)) {
    return message.channel.send("**" + user.username + "** isnt muted!")
  }
message.channel.send("**" + message.author.username + "** unmuted " + user)
}else

  if (message.content.toLowerCase().startsWith(prefix + 'voice-mute')) {
  	let user = message.mentions.users.first();
  	let modRole = message.guild.roles.find("name", "Mod");
  	if (!user) return message.reply("**Usage:** ~voice-mute <@mention>");
	if (!modRole) return;
    if (!message.guild.member(client.user).hasPermission('MUTE_MEMBERS')) return message.reply("I dont have permissions to Mute members");
	if (!message.member.roles.has(modRole.id)) return message.reply("You should have a role called `Mod`");
    if (!user.voiceChannel) return message.reply("The user is not in a voice channel.");
    if (user.mute === true) return message.reply("The user you mentioned is already muted!");
	user.setMute(true);
  }else

  if (message.content.toLowerCase().startsWith(prefix + 'voice-unmute')) {
    let user = message.mentions.users.first();
  	let modRole = message.guild.roles.find("name", "Mod");
	if (!modRole) return;
  	if (!user) return message.reply("**Usage:** ~voice-mute <@mention>");
	if (!message.member.roles.has(modRole.id)) return message.reply("You should have a role called `Mod`");
    if (!message.guild.member(client.user).hasPermission('MUTE_MEMBERS')) return message.reply("I should have MUTE_MEMBERS permission to unmute members!");
    if (!user.voiceChannel) return message.reply("The user is not in a voice channel.");
	if (user.mute === false) return message.reply("The user you mentioned is not muted!");
	user.setMute(false);
  }else

  if (message.content.toLowerCase().startsWith(prefix + 'warn')) {
  	if(message.channel.type !== 'text') return;
  	let reason = args.slice(1).join(' ');
  	let mention = message.mentions.users.first();
  	let guild = message.guild;
  	let botChannel = guild.channels.find("name", "cyclone");
  	let modRole = message.guild.roles.find("name", "Mod");
	if (!modRole) return;
	if (!message.member.roles.has(modRole.id)) return message.reply("You should have a role called `Mod`")
  	if (!reason) return message.reply("Supply a reason!");
  	if (!mention) return message.reply("Mention a user to warn!");
  	if (!botChannel) return message.reply(`${mention.username} has been warned for ${reason}!`);
  	mention.send(mention + `You have been warned by ${message.author.username} in ${guild.name} for ${reason}!`);
  	message.reply(`${message.mentions.users.first().username} has been succesfully warned!`);
  	botChannel.send("", {embed: {
  		color: 0x00ffff,
  		fields: [
  		    {
  		    	name: "User Warned",
  		    	value: `${message.mentions.users.first().username} has been warned by ${message.author.username} for ${reason}`
  		    }
  		],
  		timestamp: new Date(),
  		footer: {
            icon_url: client.user.avatarURL,
            text: 'created by Cyclone'
  		}
  	}});
  } else

  if (message.content.toLowerCase().startsWith(prefix + 'nick')) {
  	let user = message.mentions.members.first();
  	let nick = args.slice(1).join(' ');
  	let modRole = message.guild.roles.find("name", "Mod");
	if (!modRole) return;
	if (!message.member.roles.has(modRole.id)) return message.reply("You should have a role called `Mod`")
  	if (!user) return message.reply("Mention a user first!");
	if (user.highestRole.position > message.guild.me.highestRole.position) return message.reply('The member you mentioned is having his role higher than me').catch(console.error);
	if (user.highestRole.position === message.guild.me.highestRole.position) return message.reply('I need to have higher role than that user, to change nickname of that user!').catch(console.error);
  	user.setNickname(nick);
  	message.reply(`**${message.mentions.members.first().username}**'s nickname has been succesfully set as **${nick}**`);
  }
});
let queue = {};
const MusicCommands = {
    'play': (msg) => {
        if (queue[msg.guild.id] === undefined) return msg.channel.send("", {embed:{
        color: 0x00ffff,
        fields: [
            {
                name: "Music Player",
                value: `Add some songs to the queue with **~add**`
            }
        ]
      }});
        if (!msg.guild.voiceConnection) return MusicCommands.join(msg).then(() => MusicCommands.play(msg));
        if (queue[msg.guild.id].playing) return msg.channel.send("", {embed:{
        color: 0x00ffff,
        fields: [
            {
                name: "Music Player",
                value: `I am already playing`
            }
        ]
      }});
        let dispatcher;
        queue[msg.guild.id].playing = true;
        (function play(song) {
            console.log(song);
            if (song === undefined) return msg.channel.send("", {embed:{
        color: 0x00ffff,
        fields: [
            {
                name: "Music Player",
                value: `The queue is empty`
            }
        ]
      }}).then(() => {
                queue[msg.guild.id].playing = false;
                msg.member.voiceChannel.leave();
            });
            msg.channel.send("", {embed:{
        color: 0x00ffff,
        fields: [
            {
                name: "Music Player",
                value: `Playing **${song.title}** As requested by **${song.requester}**`
            }
        ]
      }});
            dispatcher = msg.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes : 1 });
            let collector = msg.channel.createCollector(m => m);
            collector.on('message', m => {
                if (m.content.startsWith(prefix + 'pause')) {
                    msg.channel.send("", {embed:{
        color: 0x00ffff,
        fields: [
            {
                name: "Music Player",
                value: `Playback Paused`
            }
        ]
      }}).then(() => {dispatcher.pause();});
                } else if (m.content.startsWith(prefix + 'resume')){
                    msg.channel.send("", {embed:{
        color: 0x00ffff,
        fields: [
            {
                name: "Music Player",
                value: `Playback resumed`
            }
        ]
      }}).then(() => {dispatcher.resume();});
                } else if (m.content.startsWith(prefix + 'skip')){
                    msg.channel.send("", {embed:{
        color: 0x00ffff,
        fields: [
            {
                name: "Music Player",
                value: `Skipped`
            }
        ]
      }}).then(() => {dispatcher.end();});
                } else if (m.content.startsWith(prefix +'volume')){
                    var args = m.content.split(" ").slice(1);
                    var newvolume = parseInt(args[0]);
                            if (!args.length === 0) return msg.channel.send("", {embed:{
        color: 0x00ffff,
        fields: [
            {
                name: "Music Player",
                value: `You must provide a keyword to search. Eg: ~add <song-name>`
            }
        ]
      }});
                   
                    const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
                    if (voiceConnection === null) return msg.channel.send("", {embed:{
        color: 0x00ffff,
        fields: [
            {
                name: "Music Player",
                value: `No music being played`
            }
        ]
      }});
                    const dispatcher = voiceConnection.player.dispatcher;

                    if (newvolume > 200 || newvolume < 0) return msg.channel.send("", {embed:{
        color: 0x00ffff,
        fields: [
            {
                name: "Music Player",
                value: `Volume out of range`
            }
        ]
      }}).then((response) => {
                           response.delete(5000);
                });

        msg.channel.send("", {embed:{
        color: 0x00ffff,
        fields: [
            {
                name: "Music Player",
                value: `Volume set to ${newvolume}`
            }
        ]
      }});
        dispatcher.setVolume((newvolume / 200));
                } else if(m.content.startsWith(prefix + 'playbacktime')) {
                    m.channel.send(                    "", {embed:{
        color: 0x00ffff,
        fields: [
            {
                name: "Music Player",
                value: `time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}`
            }
        ]
      }})
                }
            });
            dispatcher.on('end', () => {
                collector.stop();
                play(queue[msg.guild.id].songs.shift());
            });
            dispatcher.on('error', (err) => {
                return console.log(err).then(() => {
                    collector.stop();
                    play(queue[msg.guild.id].songs.shift());
                });
            });
        })(queue[msg.guild.id].songs.shift());
    },
    'addqueue': (msg) => {
        let args = msg.content.split(" ").slice(1);
        if (!args.length === 0) return msg.channel.send("", {embed:{
        color: 0x00ffff,
        fields: [
            {
                name: "Music Player",
                value: `You must provide a keyword to search. Eg: ~add <song-name>`
            }
        ]
      }});
        var YouTube = require('youtube-node');
        var youtube = new YouTube();
        youtube.setKey("AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU");
        youtube.search(args.join(" "), 2, function(error, result) {
            let url = "http://www.youtube.com/watch?v=" + result.items[0].id.videoId;
            if (error) {
                return;
            }
            else {
                yt.getInfo(url, (err, info) => {
                    if(err) return msg.channel.send("", {embed:{
        color: 0x00ffff,
        fields: [
            {
                name: "Music Player",
                value: `Failed to get video info`
            }
        ]
      }});
                    if (!queue.hasOwnProperty(msg.guild.id)) queue[msg.guild.id] = {}, queue[msg.guild.id].playing = false, queue[msg.guild.id].songs = [];
                    queue[msg.guild.id].songs.push({url: url, title: info.title, requester: msg.author.username});
                    msg.channel.send("", {embed:{
        color: 0x00ffff,
        fields: [
            {
                name: "Music Player",
                value: `Added **${info.title}** to the queue`
            }
        ]
      }});
                });
            }
        });
    },
    'join': (msg) => {
        return new Promise((resolve, reject) => {
            const voiceChannel = msg.member.voiceChannel;
            if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply("", {embed:{
        color: 0x00ffff,
        fields: [
            {
                name: "Music Player",
                value: `I couldnt join your voice channel`
            }
        ]
      }});
            voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
        });
    },
    'queue': (msg) => {
        if (queue[msg.guild.id] === undefined) return msg.channel.send("", {embed:{
        color: 0x00ffff,
        fields: [
            {
                name: "Music Player",
                value: `First add some songs to the queue using **~add <song-name>**`
            }
        ]
      }});
        let tosend = [];
        queue[msg.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ${song.title} - Requested by: ${song.requester}`);});        msg.channel.send("", {embed:{
        color: 0x00ffff,
        fields: [
            {
                name: `__${msg.guild.name}'s Music Queue__: Currently **${tosend.length}** songs queued `,
                value: `${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n${tosend.slice(0,15).join('\n')}`
            }
        ]
      }})
    }
}

client.on('message', msg => {
    if (!msg.content.startsWith(prefix)) return;
    if (MusicCommands.hasOwnProperty(msg.content.toLowerCase().slice(prefix.length).split(' ')[0])) MusicCommands[msg.content.toLowerCase().slice(prefix.length).split(' ')[0]](msg);
});

client.on('message', msg => {
  if (msg.author.bot) return;
  let prefix = '~';
       let command = msg.content.split(" ")[0];
  command = command.slice(msg.length);

  let args = msg.content.split(" ").slice(1);

if(command.includes(client.user)){
    var cleverbot = require("cleverbot.io"),
    cbot = new cleverbot("dPbCSxSR0yo7o8pj", "aQOJVOnHN7l9w0aTWwaCHuWJpKnyX0bW");
    cbot.create(function (err, session) {});
	msg.channel.startTyping();
	setTimeout(() => {
        msg.channel.stopTyping();
    }, Math.random() * (1 - 3) + 1 * 1000);
    var msgg = args.join(" ")
    if(args.length === 0) {
        return msg.reply("yes!")
    }
    cbot.ask(msgg, function (err, response){
        if(!err){
            return msg.reply(response);
        } else {
            return console.log(err)
        }
    });
}

 if(msg.content.toLowerCase().startsWith(prefix + "avatar")) {
    var mention = msg.mentions.users.first();
    var author = msg.author;
    if (mention === undefined) {
        return msg.channel.send("", {embed: {
            color: 0x00ffff,
            author: {
                name: `${author.username}'s Avatar!`
            },
            image: {
                url: author.avatarURL
            },
            timestamp: new Date()
        }});
    } else {
        return msg.channel.send("", {embed: {
            color: 0x00ffff,
            author: {
                name: `${mention.username}'s Avatar!`
            },
            image: {
                url: mention.avatarURL
            },
            timestamp: new Date()
        }});
    }
 }

});

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
} 

client.login(process.env.BOT_TOKEN);
