// hooks/useMetadata.tsx
// 일단 복사 해놈

import Head from "next/head";

interface MetadataProps {
  title: string;
  description: string;
  keywords: string;
}

export default function useMetadata({ title, description, keywords }: MetadataProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Head>
  );
}
