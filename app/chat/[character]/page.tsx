import type { Character } from '@/types';

import { characters } from '@/constants';

import { Chat } from "@/components/chat";

export default function Page({ params }: { params: { character: string } }) {
  const character = characters.find((c) => c.name === params.character) as Character | undefined;

  if(!character) {
    return <div>Character not found</div>
  }

  return <div className="h-screen flex flex-col bg-background">
    <div className="size-full grid grid-cols-[80%_auto] gap-4">
      <Chat character={character} />
      <div className="h-full border-l"></div>
    </div>
  </div>
}