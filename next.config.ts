import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Redirects van oude WordPress site naar nieuwe Next.js site
  async redirects() {
    return [
      // === PAGINA REDIRECTS (WordPress → Next.js) ===
      {
        source: "/disclaimer-risicos",
        destination: "/disclaimer",
        permanent: true,
      },
      {
        source: "/disclaimer-risicos/",
        destination: "/disclaimer",
        permanent: true,
      },
      {
        source: "/privacy-beleid",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/privacy-beleid/",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/over-onze-website",
        destination: "/over-ons",
        permanent: true,
      },
      {
        source: "/over-onze-website/",
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
        source: "/top-8-beste-kapitaalverstrekkers-voor-je-startkapitaal",
        destination: "/beginnen",
        permanent: true,
      },
      {
        source: "/top-8-beste-kapitaalverstrekkers-voor-je-startkapitaal/",
        destination: "/beginnen",
        permanent: true,
      },
      {
        source: "/kennisbank",
        destination: "/begrippen",
        permanent: true,
      },
      {
        source: "/kennisbank/",
        destination: "/begrippen",
        permanent: true,
      },

      // === BLOG/ARTIKEL REDIRECTS (alle oude posts → /blog) ===
      {
        source: "/welke-strategie-kun-je-gebruiken-voor-winstgevend-futures-traden",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/welke-strategie-kun-je-gebruiken-voor-winstgevend-futures-traden/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/daytraden-met-futures",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/daytraden-met-futures/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/waarom-een-account-bij-daytradenfinanciering",
        destination: "/over-ons",
        permanent: true,
      },
      {
        source: "/waarom-een-account-bij-daytradenfinanciering/",
        destination: "/over-ons",
        permanent: true,
      },
      {
        source: "/de-start-van-mijn-carriere-als-futures-trader",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/de-start-van-mijn-carriere-als-futures-trader/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/futures-daytraden-stap-1-dag-1",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/futures-daytraden-stap-1-dag-1/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/futures-daytraden-stap-1-dag-2-en-3",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/futures-daytraden-stap-1-dag-2-en-3/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/futures-daytraden-evaluatie-van-stap-1",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/futures-daytraden-evaluatie-van-stap-1/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/futures-daytraden-stap-1-dag-4-en-5",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/futures-daytraden-stap-1-dag-4-en-5/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/futures-daytraden-stap-2",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/futures-daytraden-stap-2/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/futures-daytraden-stap-2-poging-2",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/futures-daytraden-stap-2-poging-2/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/een-maand-later-hoe-gaat-het-futures-traden-nu",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/een-maand-later-hoe-gaat-het-futures-traden-nu/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/mijn-favoriete-future-de-e-mini-sp-500",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/mijn-favoriete-future-de-e-mini-sp-500/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/de-10-belangsrijkste-punten-van-mijn-futures-trading-plan",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/de-10-belangsrijkste-punten-van-mijn-futures-trading-plan/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/mijn-favoriete-future-nr-2-de-e-mini-nasdaq-100",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/mijn-favoriete-future-nr-2-de-e-mini-nasdaq-100/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/nieuwe-blog",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/nieuwe-blog/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/is-het-moeilijk-om-een-gefinancierd-account-te-behalen",
        destination: "/hoe-werkt-het",
        permanent: true,
      },
      {
        source: "/is-het-moeilijk-om-een-gefinancierd-account-te-behalen/",
        destination: "/hoe-werkt-het",
        permanent: true,
      },
      {
        source: "/hoe-kun-je-succesvol-starten-met-funded-trading-in-nederland",
        destination: "/beginnen",
        permanent: true,
      },
      {
        source: "/hoe-kun-je-succesvol-starten-met-funded-trading-in-nederland/",
        destination: "/beginnen",
        permanent: true,
      },
      {
        source: "/strategieen-voor-daytraden-voor-beginners",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/strategieen-voor-daytraden-voor-beginners/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/de-voordelen-van-daytraden-snel-geld-verdienen-of-snel-geld-verliezen",
        destination: "/voordelen",
        permanent: true,
      },
      {
        source: "/de-voordelen-van-daytraden-snel-geld-verdienen-of-snel-geld-verliezen/",
        destination: "/voordelen",
        permanent: true,
      },
      {
        source: "/leer-hoe-je-geld-kunt-verdienen-met-daytraden-voor-beginners-onthul-de-geheimen-van-de-succesvolle-traders",
        destination: "/beginnen",
        permanent: true,
      },
      {
        source: "/leer-hoe-je-geld-kunt-verdienen-met-daytraden-voor-beginners-onthul-de-geheimen-van-de-succesvolle-traders/",
        destination: "/beginnen",
        permanent: true,
      },
      {
        source: "/hoe-je-psychologie-je-daytraden-beinvloedt",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/hoe-je-psychologie-je-daytraden-beinvloedt/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/daytraden-leren-word-een-expert-in-daytraden-in-slechts-30-dagen",
        destination: "/beginnen",
        permanent: true,
      },
      {
        source: "/daytraden-leren-word-een-expert-in-daytraden-in-slechts-30-dagen/",
        destination: "/beginnen",
        permanent: true,
      },
      {
        source: "/verdien-geld-terwijl-je-leert-met-topsteps-funded-trader-programma",
        destination: "/hoe-werkt-het",
        permanent: true,
      },
      {
        source: "/verdien-geld-terwijl-je-leert-met-topsteps-funded-trader-programma/",
        destination: "/hoe-werkt-het",
        permanent: true,
      },
      {
        source: "/wees-een-pro-in-future-trading-met-deze-10-gouden-tips",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/wees-een-pro-in-future-trading-met-deze-10-gouden-tips/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/ontdek-de-voordelen-van-het-gebruiken-van-een-gefinancierde-trading-account",
        destination: "/voordelen",
        permanent: true,
      },
      {
        source: "/ontdek-de-voordelen-van-het-gebruiken-van-een-gefinancierde-trading-account/",
        destination: "/voordelen",
        permanent: true,
      },
      {
        source: "/droom-je-ervan-om-een-funded-trader-te-worden-ontdek-hier-hoe-je-een-succesvolle-funded-trader-kunt-worden",
        destination: "/beginnen",
        permanent: true,
      },
      {
        source: "/droom-je-ervan-om-een-funded-trader-te-worden-ontdek-hier-hoe-je-een-succesvolle-funded-trader-kunt-worden/",
        destination: "/beginnen",
        permanent: true,
      },
      {
        source: "/het-traden-van-nasdaq-100-sp-500-futures-15-tips-voor-succes",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/het-traden-van-nasdaq-100-sp-500-futures-15-tips-voor-succes/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/beginnen-met-daytraden-waarom-starten-met-een-demo-account-slim-is",
        destination: "/beginnen",
        permanent: true,
      },
      {
        source: "/beginnen-met-daytraden-waarom-starten-met-een-demo-account-slim-is/",
        destination: "/beginnen",
        permanent: true,
      },
      {
        source: "/hoeveel-geld-moet-je-echt-investeren-om-te-beginnen-met-traden",
        destination: "/kosten",
        permanent: true,
      },
      {
        source: "/hoeveel-geld-moet-je-echt-investeren-om-te-beginnen-met-traden/",
        destination: "/kosten",
        permanent: true,
      },
      {
        source: "/het-geheim-van-succesvol-parttime-traden-maak-winst-zonder-24-7-bezig-te-zijn",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/het-geheim-van-succesvol-parttime-traden-maak-winst-zonder-24-7-bezig-te-zijn/",
        destination: "/blog",
        permanent: true,
      },

      // === CATEGORY REDIRECTS ===
      {
        source: "/category/daytraden-ervaringen",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/category/daytraden-ervaringen/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/category/daytrading",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/category/daytrading/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/category/funded-trading",
        destination: "/blog/categorie/financiering",
        permanent: true,
      },
      {
        source: "/category/funded-trading/",
        destination: "/blog/categorie/financiering",
        permanent: true,
      },
      {
        source: "/category/futures-trading",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/category/futures-trading/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/category/overige",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/category/overige/",
        destination: "/blog",
        permanent: true,
      },
      // Catch-all voor alle categories
      {
        source: "/category/:slug",
        destination: "/blog",
        permanent: true,
      },

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
        source: "/author/:slug",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/author/:slug/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/tag/:slug",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/tag/:slug/",
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
      {
        source: "/wp-json/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/xmlrpc.php",
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
