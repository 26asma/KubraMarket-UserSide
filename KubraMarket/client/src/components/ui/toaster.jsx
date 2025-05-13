
// import { useToast } from "@/hooks/use-toast"
// import {
//   Toast,
//   ToastClose,
//   ToastDescription,
//   ToastProvider,
//   ToastTitle,
//   ToastViewport,
// } from "./toast"

// export function Toaster() {
//   const { toasts } = useToast()

//   return (
//     <ToastProvider>
//       {toasts.map(function ({ id, title, description, action, ...props }) {
//         return (
//           <Toast key={id} {...props}>
//             <div className="grid gap-1">
//               {title && <ToastTitle>{title}</ToastTitle>}
//               {description && (
//                 <ToastDescription>{description}</ToastDescription>
//               )}
//             </div>
//             {action}
//             <ToastClose />
//           </Toast>
//         )
//       })}
//       <ToastViewport />
//     </ToastProvider>
//   )
// }


import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast 
            key={id} 
            {...props}
            className="bg-white border-primary/20 shadow-lg rounded-lg"
          >
            <div className="flex flex-col gap-1 p-6">
              {title && <ToastTitle className="text-primary font-semibold">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-secondary text-sm">{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="absolute right-2 top-2 p-1 text-primary/50 hover:text-primary" />
          </Toast>
        )
      })}
      <ToastViewport className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-6 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]" />
    </ToastProvider>
  )
}
