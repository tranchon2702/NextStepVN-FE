"use client";

import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";
import { useState, useEffect, Suspense } from "react";
import Loading from "@/components/Loading";
import ClientOnly from "@/components/ClientOnly";

function I18nErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <ClientOnly fallback={<div className="app-loading" />}>
          <Loading />
        </ClientOnly>
      }
    >
      {children}
    </Suspense>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isI18nReady, setIsI18nReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Wait for i18n to initialize
    const checkI18nReady = () => {
      if (i18n.isInitialized) {
        setIsI18nReady(true);
      } else {
        // Retry after 100ms
        setTimeout(checkI18nReady, 100);
      }
    };

    // Start checking
    checkI18nReady();

    // Timeout fallback - if i18n takes longer than 5 seconds, show error
    const timeout = setTimeout(() => {
      if (!isI18nReady) {
        console.warn('i18n initialization timeout, proceeding without translations');
        setHasError(true);
        setIsI18nReady(true); // Proceed anyway
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [isI18nReady]);

  // Show loading while i18n initializes (client-only to tránh hydration mismatch)
  if (!isI18nReady) {
    return (
      <ClientOnly fallback={<div className="app-loading" />}>
        <Loading />
      </ClientOnly>
    );
  }

  // Show error state but still render children
  if (hasError) {
    return (
      <div>
        {/* Minimal error banner */}
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2 text-center">
          <p className="text-yellow-800 text-sm">
            Some translations may not load properly. The app will continue to work.
          </p>
        </div>
        <I18nErrorBoundary>
          <I18nextProvider i18n={i18n}>
            {children}
          </I18nextProvider>
        </I18nErrorBoundary>
      </div>
    );
  }

  // Normal render when everything is ready
  return (
    <I18nErrorBoundary>
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
    </I18nErrorBoundary>
  );
}