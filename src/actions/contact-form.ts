"use server"

import { z } from "zod"
import type { ContactFormState } from "@/interfaces"
import { sendContactFormEmail } from "@/lib/sendPurchaseEmail"

// Validation schema
const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  acceptTerms: z.enum(["on", "true"], {
    errorMap: () => ({ message: "You must accept the terms and conditions and privacy policy" }),
  }),
})

export async function submitContactForm(formData: FormData): Promise<ContactFormState> {
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

  const { name, email, message } = validatedFields.data

  // Simulate a delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Here would go the logic to send the email
  // For example, using Resend or some other service

  try {
    // Enviar el email del formulario de contacto
    await sendContactFormEmail(name, email, message)
    console.log("Correo de formulario de contacto enviado exitosamente")
  } catch (emailError) {
    console.error("Error al enviar correo del formulario de contacto:", emailError)
    // Decide how to handle this error - maybe return a specific error message to the user
    return {
      success: false,
      message: "Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.",
    }
  }

  // Return success
  return {
    success: true,
    message: "Thank you for your message. We will contact you soon.",
  }
}
