'use client';

import { useChat } from 'ai/react';

import { LoaderIcon, SendIcon } from 'lucide-react';

import { Character } from '@/types';

import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
import { ChatMessage } from './chat-message';

interface ChatProps {
    character: Character;
}

export const Chat = ({ character }: ChatProps) => {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        headers: {
            "X-Character": character.name,
        }
    });

    return (
        <div className="relative flex flex-col h-full p-4">
            <div className='w-2/3 mx-auto flex justify-between flex-col items-center gap-2'>
                <video className='size-32 rounded-full' muted loop autoPlay>
                    <source src={`/video/character/${character.name}.mp4`} type='video/mp4' />
                </video>
                <p className='font-semibold text-lg'>{character.name}</p>
            </div>
            {messages.length !== 0 && (
                <div className='w-2/3 mx-auto overflow-auto p-4 space-y-4'>
                    {messages.map(message => (
                        <ChatMessage key={message.id} {...message} character={character} />
                    ))}
                </div>)}

            {messages.length === 0 && (
                <div className='w-[calc(100%_-_2rem)] flex flex-wrap justify-center gap-2 absolute bottom-20 left-1/2 -translate-x-1/2'>
                    {character.defaultQuestions.map((question, index) => (
                        <Button variant={'outline'} key={index} onClick={() => {
                            handleInputChange({ target: { name: 'prompt', value: question } })
                        }}>
                            {question}
                        </Button>
                    )
                    )}
                </div>)}

            <form onSubmit={handleSubmit} className="w-2/3 p-4 flex items-center gap-2 absolute left-1/2 -translate-x-1/2 bottom-2">
                <Input
                    id="input"
                    name="prompt"
                    value={input}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder={`Escribe un mensaje para ${character.name}...`}
                />
                <Button type="submit" size={'icon'} disabled={isLoading}>
                    {!isLoading ? <SendIcon size={16} /> : <LoaderIcon size={16} className='animate-spin' />}
                </Button>
            </form>
        </div>
    );
}