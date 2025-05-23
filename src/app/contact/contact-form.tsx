"use client"

import { useState } from "react"
import { useActionState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { submitContactForm } from "../../actions/contact-form"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { ContactFormState, ContactFormValues } from "@/interfaces"

// Validation schema with Zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions and privacy policy.",
  }),
})

const initialState: ContactFormState = {}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // Define form with react-hook-form and zod
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      acceptTerms: false,
    },
  })

  // Function to handle form submission
  const onSubmit = (data: ContactFormValues) => {
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("email", data.email)
    formData.append("message", data.message)
    formData.append("acceptTerms", data.acceptTerms ? "on" : "off")

    formAction(formData)
    setTimeout(() => setIsSubmitting(false), 1500)
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="p-6 sm:p-8">
        {state.success ? (
          <div className="space-y-6">
            <Alert className="border-green-500 bg-green-50 dark:bg-green-950/30">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              <AlertTitle className="text-green-600 dark:text-green-400">Message sent</AlertTitle>
              <AlertDescription className="text-green-600/90 dark:text-green-400/90">{state.message}</AlertDescription>
            </Alert>
            <div className="flex justify-center">
              <Button
                onClick={() => router.push("/")}
                className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
              >
                Back to home
              </Button>
            </div>
          </div>
        ) : (
          <>
            {state.message && !state.success && (
              <Alert className="border-destructive bg-destructive/10 mb-6">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          {...field}
                          className="transition-all duration-300 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your@email.com"
                          type="email"
                          {...field}
                          className="transition-all duration-300 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="How can we help you?"
                          {...field}
                          className="min-h-32 transition-all duration-300 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium">
                          I accept the{" "}
                          <Link
                            href="/terms"
                            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 underline underline-offset-2"
                          >
                            Terms and Conditions
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy"
                            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 underline underline-offset-2"
                          >
                            Privacy Policy
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send message"
                  )}
                </Button>
              </form>
            </Form>
          </>
        )}
      </div>
    </div>
  )
}
