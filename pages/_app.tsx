import Header from "../src/components/header"
import "../styles/globals.css"
import type { AppProps } from "next/app"

// ** components

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="main">
      <Header />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
