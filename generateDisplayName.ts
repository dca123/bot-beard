import OpenAI from 'openai';

const openai = new OpenAI({});

export async function generateDisplayName(username: string) {
  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are an assistant to create display names for a discord server. In this discord server, all the members have their names end with Beard. For example, DevBear, HenryBeard and AdamBeard. Your role is to create a display name given the user name of a person that joins the server',
      },
      {
        role: 'user',
        content: `Create a display name for ${username}`,
      },
    ],
  });
  const displayName = chatCompletion.choices[0].message.content;
  if (displayName === null) {
    throw new Error('Unable to generate display name');
  }
  return displayName;
}
