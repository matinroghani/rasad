
"use client";

import ErrorPanel from "@/components/ui/ErrorPanel";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  const isDevelopment = process.env.NODE_ENV === "development";

  useEffect(() => {
    console.error("[RASAD] Application error:", error);
  }, [error]);

  return (
    <ErrorPanel
      errorName={error.name || "Error"}
      errorMessage={error.message || "Unknown application error"}
      errorStack={isDevelopment ? error.stack : undefined}
      digest={error.digest}
      showTechnicalDetails={isDevelopment}
      onRetry={reset}
      homeHref="/"
    />
  );
}
