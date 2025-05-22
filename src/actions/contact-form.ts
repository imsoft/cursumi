"use server"

import { z } from "zod"
import type { ContactFormState } from "@/interfaces"

// Validation schema
const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  acceptTerms: z.enum(["on", "true"], {
    errorMap: () => ({ message: "You must accept the terms and conditions and privacy policy" }),
  }),
})

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  // Extract form data
  const validationData = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    acceptTerms: formData.get("acceptTerms"),
  }

  // Validate data
  const validatedFields = ContactFormSchema.safeParse(validationData)

  // If there are validation errors, return them
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "There are errors in the form. Please check the fields.",
      success: false,
    }
  }

  // Simulate a delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Here would go the logic to send the email
  // For example, using Resend or some other service

  // Return success
  return {
    success: true,
    message: "Thank you for your message. We will contact you soon.",
  }
}
