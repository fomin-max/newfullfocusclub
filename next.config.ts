import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Yandex Cloud Object Storage (прямой доступ)
      { protocol: 'https', hostname: 'storage.yandexcloud.net' },
      // Кастомный CDN-домен
      { protocol: 'https', hostname: 'cdn.fullfocusclub.ru' },
      // Supabase Storage (логотипы партнёров турниров)
      { protocol: 'https', hostname: 'pdsdpvjaxpyttbtmjhwp.supabase.co' },
    ],
  },
};

export default nextConfig;
