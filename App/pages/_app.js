import '../styles/globals.css'
import Login from './component/login'
import Layout from './layout'

function MyApp({ Component, pageProps }) {
  return (

    // <Layout>

    <Component {...pageProps} />

    // </Layout>

  )
}

export default MyApp
