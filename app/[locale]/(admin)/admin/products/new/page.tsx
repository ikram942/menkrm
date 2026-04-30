"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { ArrowLeft, Save, Loader2, X } from "lucide-react";
import { addProduct } from "@/lib/actions/product.actions";
import { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import imageCompression from "browser-image-compression";
import "@uploadthing/react/styles.css";

export default function AddProductPage() {
    const t = useTranslations("admin");
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        setError(null);

        // Ensure image URLs are in the formData
        imageUrls.forEach(url => {
            formData.append("images", url);
        });

        const result = await addProduct(formData);

        if (result.success) {
            router.push("/admin/products");
        } else {
            setError(result.error || "Something went wrong.");
            setIsSubmitting(false);
        }
    }

    const removeImage = (indexToRemove: number) => {
        setImageUrls(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/products" className="p-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Add New Product
                    </h1>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <form action={handleSubmit} className="space-y-8">
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Product Title *</label>
                            <input
                                type="text"
                                name="title"
                                required
                                className="w-full px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mauve-500"
                                placeholder="e.g. KS Hair Cream"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category *</label>
                            <input
                                type="text"
                                name="category"
                                required
                                className="w-full px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mauve-500"
                                placeholder="e.g. Hair Care"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Price (MAD) *</label>
                            <input
                                type="number"
                                name="price"
                                required
                                min="0"
                                step="0.01"
                                className="w-full px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mauve-500"
                                placeholder="0.00"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Stock Quantity *</label>
                            <input
                                type="number"
                                name="stock"
                                required
                                min="0"
                                className="w-full px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mauve-500"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description *</label>
                        <textarea
                            name="description"
                            required
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mauve-500"
                            placeholder="Detailed product description..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Ingredients *</label>
                        <textarea
                            name="ingredients"
                            required
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mauve-500"
                            placeholder="List of ingredients..."
                        />
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-slate-800 pb-4">Images</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Add up to 3 images for your product. They will be automatically compressed before uploading.</p>

                    {imageUrls.length > 0 && (
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            {imageUrls.map((url, index) => (
                                <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700">
                                    <img src={url} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-sm"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {imageUrls.length < 3 && (
                        <UploadDropzone
                            endpoint="productImage"
                            onBeforeUploadBegin={async (files) => {
                                const options = {
                                    maxSizeMB: 1, // Compress to 1MB
                                    maxWidthOrHeight: 1024, // Resize to 1024px max
                                    useWebWorker: true,
                                };

                                const compressedFiles = await Promise.all(
                                    files.map(async (file) => {
                                        try {
                                            const compressedBlob = await imageCompression(file, options);
                                            // Convert Blob back to File
                                            return new File([compressedBlob], file.name, {
                                                type: file.type,
                                            });
                                        } catch (error) {
                                            console.error("Compression error:", error);
                                            return file; // fallback to original if compression fails
                                        }
                                    })
                                );

                                return compressedFiles;
                            }}
                            onClientUploadComplete={(res) => {
                                // Do something with the response
                                console.log("Files: ", res);
                                const newUrls = res.map((file) => file.url);
                                setImageUrls((prev) => [...prev, ...newUrls].slice(0, 3));
                            }}
                            onUploadError={(error: Error) => {
                                setError(`Upload error: ${error.message}`);
                            }}
                            config={{ mode: "auto" }}
                        />
                    )}
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/admin/products" className="px-6 py-2 border border-gray-200 dark:border-slate-700 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting || imageUrls.length === 0}
                        className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Save Product
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
