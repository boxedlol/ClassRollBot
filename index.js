const Discord = require("discord.js");
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const token = process.env["DISCORD_BOT_SECRET"];
const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ]
})

client.once('ready', async () => {
    console.log('Bot is online!');
    
    // Define the slash command
    let commandData = {
        name: 'classroll',
        description: 'Roll a random number between 1 and 5',
    };

    // Register the slash command to your bot in all guilds it is in
    let commands = await client.application.commands.set([commandData]);
    console.log('Commands registered:', commands);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = interaction.commandName;

    if (command === 'classroll') {
        let randomNumber = Math.floor(Math.random() * 5) + 1;
        let message;

        // Get the username of the user who issued the command
        let username = interaction.user.username;

        // Set different messages based on the rolled number
        switch(randomNumber) {
            case 1:
                setTitle = '⚔️Barberian⚔️'
                message = `${username}, you rolled a Barberian! Chop Chop!`;
                color = '#FF0000';
                break;
            case 2:
                setTitle = '💀Necromancer💀'
                message = `${username}, you rolled a Necromancer! Not bad.`;
                color = '#9500ff';
                break;
            case 3:
                setTitle = '🪄Sorcerer🪄'
                message = `${username}, you rolled a Sorcerer! Abra Kadabra!`;
                color = '#008cff';
                break;
            case 4:
                setTitle = '🗡️Rogue🗡️'
                message = `${username}, you rolled a Rogue! Sneaky Sneaky.`;
                color = '#3cff00';
                break;
            case 5:
                setTitle = '🐻Druid🐻'
                message = `${username}, you rolled a Druid! Bear Hugs!`;
                color = '#ff7300';
                break;
            default:
                message = "Error occurred!";
        }

        let embed = new EmbedBuilder()
            .setColor(color)  // Set color of the embed
            .setTitle(setTitle)
            .setDescription(`**${message}**`);

        await interaction.reply({ embeds: [embed] });
    }
});

client.login(token);