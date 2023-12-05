import { generateDisplayName } from './generateDisplayName';
import { Client, Events, GatewayIntentBits } from 'discord.js';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});
async function main() {
  // const displayName = await generateDisplayName('Johnny');
  // console.log(displayName);
  client.login(process.env.DISCORD_TOKEN);
}

client.on(Events.GuildMemberAdd, async (member) => {
  console.log(member.displayName);
  const suggestedName = await generateDisplayName(member.displayName);
  member.setNickname(suggestedName);
  console.log(suggestedName);
});
client.on(Events.GuildMemberRemove, (member) => {
  console.log(member);
});

main();
