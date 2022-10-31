import Head from 'next/head'
import React from 'react'
import '../styles/Home.module.css'
// import Header from './component/Header'
import Login from './login'
import MyApp from './_app'


export default function Home() {

  return (

    <div>
       <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </div>

    

  )
}
