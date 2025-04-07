"use client"

import {
  Toast,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, ...props }) {
        return (
          <Toast key={id} {...props}>
            <ToastTitle>{title}</ToastTitle>
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
