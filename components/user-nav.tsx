import { revalidatePath } from "next/cache"
import Link from "next/link"
import { redirect } from "next/navigation"
import { auth, signOut } from "@/auth"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const UserNav = async () => {
  const session = await auth()

  const logout = async () => {
    "use server"
    await signOut()
    revalidatePath("/")
    return redirect("/")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative size-8 rounded-full">
          <Avatar className="size-8">
            <AvatarImage
              src={session?.user?.image || "https://avatar.vercel.sh/1"}
              alt="avatar"
            />
            <AvatarFallback />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {session?.user && (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session?.user.name}
                </p>
                <p className="text-muted-foreground text-xs leading-none">
                  {session?.user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {session?.user ? (
          <form action={logout}>
            <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                className="w-full cursor-pointer !ring-0"
                type="submit"
              >
                Log out
              </Button>
            </DropdownMenuItem>
          </form>
        ) : (
          <DropdownMenuItem asChild>
            <Button
              variant="ghost"
              className="w-full cursor-pointer !ring-0"
              asChild
            >
              <Link href="/login">Sign in</Link>
            </Button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
