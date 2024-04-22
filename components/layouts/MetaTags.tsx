import Head from "next/head";

export default function MetaTags() {
  const title = "punodwoɔ Interface";
  const description = "punodwoɔ is a truly open interest rate protocol.";
  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="noindex" />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={title} />
      {/* <meta property="og:image" content={image} /> */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* <meta name="twitter:image" content={image} /> */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
