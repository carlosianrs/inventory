import { Header } from "@/components/header";
import React from "react";

export default function AppLayout({
  children 
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="pt-4 px-4 sm:px-6 lg:px-8">
        <Header />
      </div>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
