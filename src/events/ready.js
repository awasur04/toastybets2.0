/**
 * Ready Event: Event will be called when the discord bot successfully logs in
 * Current Actions:
 * - Print ready message to console
 */
module.exports =
{
	name: 'ready',
	once: true,
	execute(client)
	{
		console.log("Ready!");
	}
}