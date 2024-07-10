import type { Character } from "@/types";

import Link from "next/link"
import Image from "next/image"

export const CharacterCard = ({ character }: { character: Character }) => {
    return <Link href={`/chat/${character.name}`}
        key={character.name}
        className="bg-background shadow rounded-lg overflow-hidden cursor-pointer border border-primary hover:scale-105 transition-transform flex"
    >
        <Image src={`/img/character/${character.name}.jpeg`} alt={character.name} className="w-full aspect-[9/16] max-w-[50%] object-cover" width={300} height={200} />
        <div className="p-4">
            <h3 className="text-xl font-bold">{character.name}</h3>
            <p className="text-xs text-foreground mt-2">{character.background.join(', ')}</p>
            <p className="text-xs text-foreground mt-2">{character.traits.join(', ')}</p>
        </div>
    </Link>
}