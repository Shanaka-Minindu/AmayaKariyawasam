/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect } from "react";
import { useForm as useHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm as useFormspree } from "@formspree/react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";

// Form Schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  // Provide a fallback placeholder ID so prerendering during build doesn't throw
  const formKey = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || "formspree_fallback";
  const [formspreeState, sendToFormspree] = useFormspree(formKey);

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useHookForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // Reset form inputs upon successful submission
  useEffect(() => {
    if (formspreeState.succeeded) {
      reset();
    }
  }, [formspreeState.succeeded, reset]);

  const onSubmit = async (data: ContactFormData) => {
    await sendToFormspree(data);
  };

  return (
    <section id="contact" className="w-full bg-amber-50/50 px-6 py-16 sm:px-10 md:px-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="font-serif italic text-2xl font-normal text-amber-900 sm:text-3xl">
            Get in touch
          </span>
          <h2 className="text-4xl font-black uppercase tracking-tight text-amber-950 sm:text-6xl">
            LET'S WORK TOGETHER
          </h2>
          <a
            href="mailto:amayashashinikariyawasam@gmail.com"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-900 hover:text-amber-950 hover:underline sm:text-base"
          >
            <Mail className="h-4 w-4" />
            amayashashinikariyawasam@gmail.com
          </a>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl border border-amber-200/60 bg-white/80 p-8 shadow-xl backdrop-blur-md sm:p-12"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Name Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-amber-950">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  {...register("name")}
                  className={`w-full rounded-xl border bg-amber-50/30 px-4 py-3.5 text-amber-950 placeholder-amber-900/40 outline-none transition-all focus:border-amber-950 focus:bg-white ${
                    errors.name ? "border-red-500" : "border-amber-200"
                  }`}
                />
                {errors.name && (
                  <span className="text-xs text-red-500">{errors.name.message}</span>
                )}
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-amber-950">
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="youremail@example.com"
                  {...register("email")}
                  className={`w-full rounded-xl border bg-amber-50/30 px-4 py-3.5 text-amber-950 placeholder-amber-900/40 outline-none transition-all focus:border-amber-950 focus:bg-white ${
                    errors.email ? "border-red-500" : "border-amber-200"
                  }`}
                />
                {errors.email && (
                  <span className="text-xs text-red-500">{errors.email.message}</span>
                )}
              </div>
            </div>

            {/* Subject Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-amber-950">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="Textile Design Inquiry / Collaboration"
                {...register("subject")}
                className={`w-full rounded-xl border bg-amber-50/30 px-4 py-3.5 text-amber-950 placeholder-amber-900/40 outline-none transition-all focus:border-amber-950 focus:bg-white ${
                  errors.subject ? "border-red-500" : "border-amber-200"
                }`}
              />
              {errors.subject && (
                <span className="text-xs text-red-500">{errors.subject.message}</span>
              )}
            </div>

            {/* Message Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-amber-950">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell me about your project..."
                {...register("message")}
                className={`w-full resize-none rounded-xl border bg-amber-50/30 px-4 py-3.5 text-amber-950 placeholder-amber-900/40 outline-none transition-all focus:border-amber-950 focus:bg-white ${
                  errors.message ? "border-red-500" : "border-amber-200"
                }`}
              />
              {errors.message && (
                <span className="text-xs text-red-500">{errors.message.message}</span>
              )}
            </div>

            {/* Success Message */}
            {formspreeState.succeeded && (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span className="text-sm font-medium">Thank you! Your message has been sent successfully.</span>
              </div>
            )}

            {/* Error Message */}
            {formspreeState.errors && (
              <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span className="text-sm font-medium">Something went wrong. Please try emailing directly.</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formspreeState.submitting}
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-amber-950 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-amber-50 shadow-lg transition-all duration-300 hover:bg-amber-900 hover:shadow-xl active:scale-[0.99] disabled:opacity-50"
            >
              <span>{formspreeState.submitting ? "Sending..." : "Send Message"}</span>
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}