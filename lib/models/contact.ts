import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
    },
    countryCode: {
      type: String,
      required: [true, "Please provide a country code"],
    },
    country: {
      type: String,
      required: [true, "Please provide a country"],
    },
    comment: {
      type: String,
      required: [true, "Please provide a comment"],
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

export default Contact;
