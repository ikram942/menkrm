"use client"

import * as React from "react"
import { Trash2, Loader2 } from "lucide-react"
import { deleteProduct } from "@/lib/actions/product.actions"

interface DeleteProductButtonProps {
    id: string;
}

export default function DeleteProductButton({ id }: DeleteProductButtonProps) {
    const [isDeleting, setIsDeleting] = React.useState(false)

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this product?")) return

        setIsDeleting(true)
        const result = await deleteProduct(id)
        if (!result.success) {
            alert(result.error)
            setIsDeleting(false)
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors disabled:opacity-50"
            title="Delete product"
        >
            {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                <Trash2 className="w-4 h-4" />
            )}
        </button>
    )
}
