// app/actions/contact.ts
"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export async function sendEmailAction(data: ContactFormData) {
  const validatedFields = contactSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid input fields.",
    };
  }

  const { name, email, subject, message } = validatedFields.data;

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "amayashashinikariyawasam@gmail.com",
      subject: `Portfolio Contact: ${subject}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return { success: true };
  } catch (error) {
    console.error("Resend Email Error:", error);
    return {
      success: false,
      error: "Failed to send email. Please try again later.",
    };
  }
}