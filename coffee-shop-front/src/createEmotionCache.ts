// src/createEmotionCache.js
import createCache from '@emotion/cache';

// کلید 'css' به Emotion می‌گوید که استایل‌ها را در این Cache قرار دهد و prepend: true
export default function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}
