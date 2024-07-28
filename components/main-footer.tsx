import Link from "next/link"

export const MainFooter = () => {
  return (
    <footer className="h-16 w-full bg-gradient-to-b px-4">
      <div className="mx-auto flex h-full max-w-screen-2xl shrink-0 items-center justify-between">
        <p className="text-center text-sm">
          Built by{" "}
          <Link
            href={"https://x.com/roberthgnz"}
            className="hover:underline"
            target="_blank"
          >
            roberthgnz
          </Link>
          . The source code is available on{" "}
          <Link
            href={"https://github.com/roberthgnz/character-verse"}
            className="hover:underline"
            target="_blank"
          >
            GitHub
          </Link>
          .
        </p>
        <p className="text-center text-sm">
          Powered by{" "}
          <Link
            href={"https://nextjs.org/"}
            className="hover:underline"
            target="_blank"
          >
            Next.js
          </Link>{" "}
          and{" "}
          <Link
            href={"https://github.com/vercel/ai"}
            className="hover:underline"
            target="_blank"
          >
            Vercel AI SDK
          </Link>
          .
        </p>
      </div>
    </footer>
  )
}
