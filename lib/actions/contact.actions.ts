"use server";

import connectDB from "../connect";
import Contact from "../models/contact";

export async function submitContactForm(formData: FormData) {
  try {
    await connectDB();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const countryCode = formData.get("countryCode") as string;
    const country = formData.get("country") as string;
    const comment = formData.get("comment") as string;

    if (!name || !email || !comment || !phone || !countryCode || !country) {
      return { success: false, error: "Missing required fields" };
    }

    const newContact = new Contact({
      name,
      email,
      phone,
      countryCode,
      country,
      comment,
    });

    await newContact.save();

    return { success: true };
  } catch (error: any) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      error: error.message || "Something went wrong. Please try again later."
    };
  }
}
