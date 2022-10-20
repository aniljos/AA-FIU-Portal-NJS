import '../styles/globals.css'
//import Layout from '../component/Layout'
import {useRouter} from 'next/router';
import Main from './Layout';

function MyApp({ Component, pageProps }) {

  
  const router = useRouter();
  console.log(router.pathname);
  
  if(router.pathname === "/"){
    return (

     
      <Component {...pageProps} />
      
  
    )
  }
  else{
    return (

      <Main>
        <Component {...pageProps} />
      </Main>
  
    )
  }
  
}

export default MyApp
