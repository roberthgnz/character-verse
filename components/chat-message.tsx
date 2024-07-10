"use client";

import { useEffect, useRef, useState } from 'react';

import type { Character } from '@/types';

import { cn } from '@/lib/utils';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { LoaderIcon, PlayIcon } from 'lucide-react';
import { Button } from './ui/button';

interface ChatMessageProps {
    content: string;
    role: string;
    character: Character
}

export const ChatMessage = ({ role, content, character }: ChatMessageProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [generatingAudio, setGeneratingAudio] = useState(false);

    const textToSpeech = async (text: string) => {
        try {
            setGeneratingAudio(true);
            const response = await fetch('/api/speech', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);
        } catch (error) {
            console.error(error);
        } finally {
            setGeneratingAudio(false);
        }
    }

    useEffect(() => {
        if (audioUrl) {
            audioRef.current?.play();
        }
    }, [audioUrl]);

    const isAssistant = role === 'assistant';

    return <div className={cn("flex items-start gap-3", {
        "justify-end": !isAssistant,
    })}>
        {isAssistant && <Avatar>
            <AvatarImage src={`/img/character/${character.name}.jpeg`} alt={character.name} />
            <AvatarFallback>{character.name.at(0)}</AvatarFallback>
        </Avatar>}
        <div className={cn("rounded-lg p-3 max-w-[80%]", {
            "bg-muted": isAssistant,
            "bg-primary text-primary-foreground": !isAssistant,
        })}>
            {content}
        </div>
        {isAssistant && <Button onClick={() => textToSpeech(content)} size={'icon'} disabled={generatingAudio}>
            {!generatingAudio ? <PlayIcon size={16} /> : <LoaderIcon size={16} className='animate-spin' />}
        </Button>}
        {audioUrl && <audio ref={audioRef} src={audioUrl} controls className='hidden' />}
    </div>
}