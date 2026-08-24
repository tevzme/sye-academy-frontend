import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SYE Academy - Engineering Onboarding & Training Portal",
  description: "System Enabler Division • AEON System Development Department",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.ico",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Official AEON Favicons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Tailwind CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
        {/* Chart.js CDN */}
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        {/* Core Scripts */}
        <script src="/sample-data.js"></script>
        <script src="/app.js" defer></script>
        <style dangerouslySetInnerHTML={{ __html: `
          body {
            font-family: 'Inter', sans-serif;
            background-color: #f8fafc;
          }
          
          /* Sidebar Active State */
          .nav-item.active {
            background-color: #eff6ff;
            color: #2563eb;
            border-right-width: 3px;
            border-right-color: #2563eb;
            font-weight: 600;
          }

          /* Smooth UI Fade-in-up animation */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          
          /* Print Styles */
          @media print {
            #admin-layout header, #admin-layout aside, #learner-nav, .no-print {
              display: none !important;
            }
            #main-content-wrapper, #learner-content, #main-content {
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
              height: auto !important;
              overflow: visible !important;
            }
            body {
              background-color: white !important;
              overflow: visible !important;
            }
            .card, .bg-white {
              box-shadow: none !important;
              border: 1px solid #e2e8f0 !important;
            }
            #print-container {
              display: block !important;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              background: white;
              z-index: 9999;
            }
          }

          /* Modal Overlay */
          .modal-overlay {
            background-color: rgba(15, 23, 42, 0.45);
            backdrop-filter: blur(4px);
          }
        `}} />
      </head>
      <body className="bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800 antialiased min-h-screen flex overflow-hidden">
        {children}
      </body>
    </html>
  );
}
