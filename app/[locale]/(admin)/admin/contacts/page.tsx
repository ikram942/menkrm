import connectDB from "@/lib/connect";
import Contact from "@/lib/models/contact";
import { Trash2, Mail, Phone, Globe, User } from "lucide-react";
import { revalidatePath } from "next/cache";

async function deleteContact(formData: FormData) {
  "use server";
  const id = formData.get("id");
  try {
    await connectDB();
    await Contact.findByIdAndDelete(id);
    revalidatePath("/admin/contacts");
  } catch (error) {
    console.error("Failed to delete contact:", error);
  }
}

export default async function ContactsPage() {
  await connectDB();
  const contacts = await Contact.find().sort({ createdAt: -1 });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Submissions</h1>
        <div className="bg-mauve-100 text-mauve-700 px-3 py-1 rounded-full text-sm font-medium">
          {contacts.length} Messages
        </div>
      </div>

      <div className="grid gap-6">
        {contacts.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800">
            <Mail className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No messages found</h3>
            <p className="text-gray-500 dark:text-slate-400">When people contact you, their messages will appear here.</p>
          </div>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact._id.toString()}
              className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-mauve-100 flex items-center justify-center text-mauve-700 font-bold">
                      {contact.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        {contact.name}
                        <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          {new Intl.DateTimeFormat('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }).format(new Date(contact.createdAt))}
                        </span>
                      </h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5" />
                          {contact.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5" />
                          {contact.countryCode} {contact.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5" />
                          {contact.country}
                        </span>
                      </div>
                    </div>
                  </div>
                  <form action={deleteContact}>
                    <input type="hidden" name="id" value={contact._id.toString()} />
                    <button
                      type="submit"
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete message"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </form>
                </div>
                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-4 text-gray-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap border border-gray-100 dark:border-slate-800">
                  {contact.comment}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
