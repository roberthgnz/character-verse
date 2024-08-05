# CharacterVerse

CharacterVerse is a platform where users can interact with AI generated characters. Users can customize the characters and interact with them using voice. Introduce yourself to the characters and have funny conversations with them.

## Features

- **Authentication**: Users can sign in using their GitHub account.
- **AI Generated Characters**: Users can interact with the AI generated characters.
- **Character Customization**: Users can customize the characters.
- **Voice Interaction**: Users can interact with the characters using voice.

## Tech Stack

- **Next.js**: React framework for production.
- **Tailwind CSS**: Utility-first CSS framework.
- **TypeScript**: Typed JavaScript.
- **Prisma**: Database toolkit for TypeScript and Node.js.
- **Vercel AI SDK**: AI SDK for Vercel.
- **OpenAI API**: API for AI generated characters.
- **Cartesia API**: API for voice generation.
- **Vercel KV**: For rate limiting.

## Deploy on Vercel

You can deploy a version of CharacterVerse with Vercel using the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/roberthgnz/character-verse&env=DATABASE_URL,AUTH_SECRET,AUTH_GITHUB_ID,AUTH_GITHUB_SECRET,OPENAI_API_KEY,CARTESIA_API_KEY,KV_REST_API_URL,KV_REST_API_TOKEN&repo-name=character-verse)

## Running Locally

First of all, you need to create a `.env.local` file in the root of the project and add the environment variables mentioned above.

```bash
DATABASE_URL=

AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

OPENAI_API_KEY=

CARTESIA_API_KEY=

KV_REST_API_URL=
KV_REST_API_TOKEN=
```

Get the `DATABASE_URL` from [Neon Serverless Postgres](https://neon.tech/) or your local database.

Get the `AUTH_SECRET`, `AUTH_GITHUB_ID`, and `AUTH_GITHUB_SECRET` from [GitHub OAuth Apps](https://github.com/settings/apps)

Get the `OPENAI_API_KEY` from [OpenAI](https://platform.openai.com/api-keys)

Get the `CARTESIA_API_KEY` from [Cartesia](https://play.cartesia.ai/console)

Get the `KV_REST_API_URL` and `KV_REST_API_TOKEN` from [Vercel](https://vercel.com/)

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
