# toastybets2.0
New and improved toastybets discord bot

# Node.js Installation
Make sure you have node.js version 18.16.0 or newer installed.
You can download the installer here: https://nodejs.org/en/download

# Config file template
Create a new file under the src directory named config.json, put the following code inside your file.
```
{
	"token": "secret-token-goes-here",
	"clientId": "client-id-goes-here",
	"guildId": "guild-id-goes-here"
}
```
```
Discord Developer Portal: https://discord.com/login?redirect_to=%2Fdevelopers%2Fapplications
token: Open your application in the Discord Developer Portal and go to the "Bot" page to copy your token
clientId: Your application's client id (Discord Developer Portal > "General Information" > application id)
guildId: Your development server's id (Enable developer mode > Right-click the server title > "Copy ID")
```
Note: The guildId is not required and can be left as is.

This is what your project directory should look like: [https://i.imgur.com/6DkRuV0.png](https://i.imgur.com/PVpEoid.png)

# Running the bot
Once you have created your config file, just run that start.bat file and the bot will start automatically
