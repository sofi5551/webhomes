import { Poppins } from 'next/font/google'
import Head from 'next/head'
import "@/styles/globals.css"

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <main className={poppins.className} style={{ fontFamily: "'Poppins', sans-serif" }}>
        <Component {...pageProps} />
      </main>
    </>
  )
}
