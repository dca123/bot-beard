import { Effect } from 'effect';
import OpenAI from 'openai';

const openai = new OpenAI({});

const chatCompletion = (username: string) =>
  Effect.tryPromise(() =>
    openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are an assistant to create display names for a discord server. In this discord server, all the members have their names end with Beard. For example, DevBeard, HenryBeard and AdamBeard. Your role is to create a display name given the user name of a person that joins the server',
        },
        {
          role: 'user',
          content: `Create a display name for ${username}`,
        },
      ],
    }),
  );

export function generateDisplayName(username: string) {
  return Effect.gen(function* (_) {
    const suggestions = yield* _(chatCompletion(username));
    const displayName = suggestions.choices?.[0]?.message.content;
    if (displayName === undefined) {
      return yield* _(
        Effect.fail(
          `Display name is undefined - choices: ${suggestions.choices}`,
        ),
      );
    }
    if (displayName === null) {
      return yield* _(
        Effect.fail(
          `Display name is null - message: ${suggestions.choices[0]}`,
        ),
      );
    }
    return displayName;
  });
}
