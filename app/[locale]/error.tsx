"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-8 text-center">

                {/* Icon */}
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-red-50 text-red-500 text-3xl mb-5">
                    ⚠️
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Something went wrong
                </h1>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                    وقع خطأ غير متوقع. حاول تعاود العملية أو رجع للصفحة الرئيسية.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                        onClick={() => reset()}
                        className="w-full sm:w-auto"
                    >
                        Try again
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => (window.location.href = "/")}
                    >
                        Go Home
                    </Button>
                </div>

                {/* Error ID */}
                {error?.digest && (
                    <p className="text-xs text-gray-400 mt-6">
                        Error ID: {error.digest}
                    </p>
                )}
            </div>
        </div>
    );
}