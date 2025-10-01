import '../styles/globals.css'
import { ThemeProvider } from '../contexts/ThemeContext'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}