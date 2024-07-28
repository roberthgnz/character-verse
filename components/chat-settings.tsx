"use client"

import { useEffect, useState } from "react"
import { setState as setCharacterState } from "@/stores/use-character-store"
import type { Character } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { ShareIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface ChatSettingsProps {
  character: Character
}

const formSchema = z.object({
  motivation: z.string().min(10).max(1000),
  speechStyle: z.string().min(10).max(1000),
})

export const ChatSettings = ({ character }: ChatSettingsProps) => {
  const { toast } = useToast()

  const [hasChanged, setHasChanged] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      motivation: character.motivation,
      speechStyle: character.speechStyle,
    },
  })

  useEffect(() => {
    const isDirty = form.formState.isDirty
    const isValid = form.formState.isValid
    setHasChanged(isDirty && isValid)
  }, [form])

  const shareCharacter = () => {
    navigator.share({
      title: character.name,
      text: "Check out this character",
      url: window.location.href,
    })
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setCharacterState(() => values)
    toast({
      title: "Character updated",
      description: "Your character has been updated successfully",
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-accent h-full space-y-4 rounded-lg border p-4 shadow-sm"
      >
        <div className="flex items-center justify-between gap-4">
          <Avatar>
            <AvatarImage
              src={`/img/character/${character.name}.jpeg`}
              alt={character.name}
            />
            <AvatarFallback>{character.name.at(0)}</AvatarFallback>
          </Avatar>
          <span>{character.name}</span>
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => shareCharacter()}
          >
            <ShareIcon size={16} />
          </Button>
        </div>
        <Separator />
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="motivation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Motivation</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  What drives your character? What are their goals and desires?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="speechStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Speech Style</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  How does your character speak? What are their mannerisms and
                  quirks?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="!mt-16 flex w-full justify-end">
          <Button type="submit" disabled={hasChanged}>
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  )
}
