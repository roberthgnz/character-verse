import { toast } from "sonner"

type ToastOptions = {
  title: string
  description?: string
  variant?: "success" | "destructive"
}

export const useToast = () => {
  const _toast = (options: ToastOptions) => {
    const { title, description, variant } = options

    if (variant === "destructive") {
      return toast.error(title, { description })
    }

    return toast.success(title, { description })
  }

  return { toast: _toast }
}
