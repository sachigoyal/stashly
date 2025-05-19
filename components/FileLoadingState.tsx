"use client"
import React from 'react';
import { Spinner } from '@/components/ui/spinner';

export default function FileLoadingState() {
  return (
    <div className="flex items-center gap-3">
      <Spinner size="small" />
    </div>
  );
};

