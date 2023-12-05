import { generateDisplayName } from './generateDisplayName';
import { Client, Events, GatewayIntentBits, GuildMember } from 'discord.js';
import { pipe, Effect } from 'effect';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.GuildMemberAdd, async (member) => {
  const result = await Effect.runPromiseExit(program(member));
  if (result._tag === 'Failure') {
    console.error(result);
  }
});

const program = (member: GuildMember) =>
  pipe(
    generateDisplayName(member.displayName),
    Effect.tap((displayName) =>
      console.log(
        `${new Date().toISOString()}: Changing user with displayName ${
          member.displayName
        } to ${displayName}`,
      ),
    ),
    Effect.map((displayName) => member.setNickname(displayName)),
  );

function main() {
  client.login(process.env.DISCORD_TOKEN);
}

main();
