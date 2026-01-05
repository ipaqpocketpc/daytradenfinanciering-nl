import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Redirects van oude WordPress site naar nieuwe Next.js site
  async redirects() {
    return [
      // === PAGINA REDIRECTS ===
      {
        source: "/over-funded-trading-nederland",
        destination: "/over-ons",
        permanent: true,
      },
      {
        source: "/over-funded-trading-nederland/",
        destination: "/over-ons",
        permanent: true,
      },
      {
        source: "/contactpagina",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contactpagina/",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/veelgestelde-vragen",
        destination: "/#faq",
        permanent: true,
      },
      {
        source: "/veelgestelde-vragen/",
        destination: "/#faq",
        permanent: true,
      },

      // === BLOG/ARTIKEL REDIRECTS ===
      {
        source: "/ftmo-funded-account-hoe-werkt-het-en-hoe-verdien-je-ermee",
        destination: "/prop-firms/ftmo",
        permanent: true,
      },
      {
        source: "/ftmo-funded-account-hoe-werkt-het-en-hoe-verdien-je-ermee/",
        destination: "/prop-firms/ftmo",
        permanent: true,
      },
      {
        source: "/de-beste-funded-trading-brokers-van-2024-in-nederland",
        destination: "/prop-firms",
        permanent: true,
      },
      {
        source: "/de-beste-funded-trading-brokers-van-2024-in-nederland/",
        destination: "/prop-firms",
        permanent: true,
      },
      {
        source: "/de-beste-funded-trading-accounts",
        destination: "/prop-firms",
        permanent: true,
      },
      {
        source: "/de-beste-funded-trading-accounts/",
        destination: "/prop-firms",
        permanent: true,
      },
      {
        source: "/hoe-kies-je-het-beste-funded-trading-platform-in-2025",
        destination: "/vergelijk",
        permanent: true,
      },
      {
        source: "/hoe-kies-je-het-beste-funded-trading-platform-in-2025/",
        destination: "/vergelijk",
        permanent: true,
      },
      {
        source: "/profit-risk-calculator-2-0-jouw-gratis-voorsprong-in-funded-trading",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/profit-risk-calculator-2-0-jouw-gratis-voorsprong-in-funded-trading/",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/topstep-kortingscodes-en-promotiecodes",
        destination: "/prop-firms",
        permanent: true,
      },
      {
        source: "/topstep-kortingscodes-en-promotiecodes/",
        destination: "/prop-firms",
        permanent: true,
      },
      {
        source: "/uw-alles-in-een-handleiding-voor-funded-trading-van-beginner-tot-expert",
        destination: "/blog/prop-trading-beginnen-complete-gids",
        permanent: true,
      },
      {
        source: "/uw-alles-in-een-handleiding-voor-funded-trading-van-beginner-tot-expert/",
        destination: "/blog/prop-trading-beginnen-complete-gids",
        permanent: true,
      },
      {
        source: "/funded-trading-en-belastingen-in-nederland-hoeveel-moet-je-betalen",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/funded-trading-en-belastingen-in-nederland-hoeveel-moet-je-betalen/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/hoeveel-geld-kan-ik-verdienen-als-trader-met-een-funded-trading-account",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/hoeveel-geld-kan-ik-verdienen-als-trader-met-een-funded-trading-account/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/de-voor-en-nadelen-van-daytraden-in-funded-trading",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/de-voor-en-nadelen-van-daytraden-in-funded-trading/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/forex-daytraden-met-een-funded-account-de-voor-en-nadelen-in-nederland",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/forex-daytraden-met-een-funded-account-de-voor-en-nadelen-in-nederland/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/waarom-forex-day-traders-in-2024-de-voorkeur-geven-aan-futures-trading",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/waarom-forex-day-traders-in-2024-de-voorkeur-geven-aan-futures-trading/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/7-strategieen-voor-scalping-in-funded-trading-accounts",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/7-strategieen-voor-scalping-in-funded-trading-accounts/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/futures-trading-in-nederland-een-analyse-en-trading-strategieen",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/futures-trading-in-nederland-een-analyse-en-trading-strategieen/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/van-start-tot-succes-een-funded-traders-live-trading-avontuur",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/van-start-tot-succes-een-funded-traders-live-trading-avontuur/",
        destination: "/blog",
        permanent: true,
      },

      // === AFFILIATE LINK REDIRECTS ===
      // Nu afgehandeld via /go/[firm] API route in src/app/go/[firm]/route.ts
      // Configuratie in src/config/analytics.ts

      // === WORDPRESS SPECIFIEKE REDIRECTS ===
      {
        source: "/feed",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/feed/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/wp-admin/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-login.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-content/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
