'use client';

import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto p-6">
        {children}
      </div>
    </div>
  );
}