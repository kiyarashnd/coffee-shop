// src/Providers.tsx
'use client';

import { CacheProvider } from '@emotion/react';
import createEmotionCache from './createEmotionCache';
import React from 'react';

// برای محیط کلاینت یک cache از قبل ساخته می‌شود.
const clientSideEmotionCache = createEmotionCache();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={clientSideEmotionCache}>{children}</CacheProvider>
  );
}
