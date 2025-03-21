'use client';

import { createTheme } from '@mui/material/styles';
// import { prefixer } from 'stylis';
// import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';

// 1) تم MUI با جهت rtl
export const themeRtl = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#6d4c41',
    },
    secondary: {
      main: '#ffab40',
    },
  },
  // سایر تنظیمات تم دلخواه...
});

// 2) کش RTL برای Emotion
export function createRtlCache() {
  return createCache({
    key: 'muirtl',
    prepend: true,
    // با این پلاگین استایل‌ها را راست‌چین می‌کنیم
    // stylisPlugins: [prefixer, rtlPlugin],
  });
}
