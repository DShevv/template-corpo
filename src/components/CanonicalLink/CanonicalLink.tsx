/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import Script from "next/script";

interface CanonicalLinkProps {
  href: string;
}

export const CanonicalLink = ({ href }: CanonicalLinkProps) => {
  return (
    <Script
      id="canonical-link"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          if (!document.querySelector('link[rel="canonical"]')) {
            const link = document.createElement('link');
            link.rel = 'canonical';
            link.href = '${process.env.NEXT_PUBLIC_SITE_URL}${href}';
            document.head.appendChild(link);
          }
        `,
      }}
    />
  );
};
