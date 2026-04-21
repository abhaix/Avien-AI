import Layout from "@/components/common/Layout"
import Script from "next/script"
import "@/styles/main.scss"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-2NECK0FWZ6" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-2NECK0FWZ6');
        `}
      </Script>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
