import type { Character } from '@/types';

import { cn } from '@/lib/utils';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

interface ChatMessageProps {
    content: string;
    role: string;
    character: Character
}

export const ChatMessage = ({ role, content, character }: ChatMessageProps) => {
    return <div className={cn("flex items-start gap-3", {
        "justify-end": role === 'user',
    })}>
        {role === 'assistant' && <Avatar>
            <AvatarImage src={`/img/character/${character.name}.jpeg`} alt={character.name} />
            <AvatarFallback>{character.name.at(0)}</AvatarFallback>
        </Avatar>}
        <div className={cn("rounded-lg p-3 max-w-[80%]", {
            "bg-muted": role === 'assistant',
            "bg-primary text-primary-foreground": role === 'user',
        })}>
            {content}
        </div>
    </div>
}