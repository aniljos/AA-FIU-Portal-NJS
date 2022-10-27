import '../styles/globals.css'
//import Layout from '../component/Layout'
import { useRouter } from 'next/router';
import Main from './Layout';
import { useEffect } from 'react';


const useUser = () => ({ user: null, loading: false })


function MyApp({ Component, pageProps }) {


  const router = useRouter();
  const { user, loading } = useUser()
  // console.log(router.pathname, 'outr');

  useEffect(() => {

    if (!(user || loading)) {

      router.push('/')
    }
  }, [user, loading])


  if (router.pathname === "/") {
    return (


      <Component {...pageProps} />


    )
  }
  else {
    return (

      <Main>
        <Component {...pageProps} />
      </Main>

    )
  }

}

export default MyApp
