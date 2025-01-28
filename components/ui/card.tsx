import { cn } from "@/lib/utils"
import { HTMLAttributes, forwardRef } from "react"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered'
}

const Card = forwardRef<HTMLDivElement, CardProps>(({
  className,
  variant = 'default',
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-white rounded-xl shadow-sm",
        variant === 'bordered' && "border border-gray-200",
        className
      )}
      {...props}
    />
  )
})

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn("px-6 py-4 border-b border-gray-100", className)}
      {...props}
    />
  )
})

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(({
  className,
  ...props
}, ref) => {
  return (
    <h3
      ref={ref}
      className={cn("text-lg font-semibold text-gray-900", className)}
      {...props}
    />
  )
})

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(({
  className,
  ...props
}, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  )
})

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn("px-6 py-4", className)}
      {...props}
    />
  )
})

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn("px-6 py-4 border-t border-gray-100", className)}
      {...props}
    />
  )
})

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
