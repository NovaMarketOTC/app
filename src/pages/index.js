"use client"
import Head from 'next/head'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Details from '@/components/Details'
import LiveSales from '@/components/LiveSales'
import Faq from '@/components/Faq'
import Footerbar from '@/components/Footerbar'

export default function Home() {

  return (
    <div className="relative max-w-[100vw]">
      <Head>
        <title>NovaMarket | ETHLisbon</title>
        <link rel="icon" href="favicon.ico" />
        <meta name='description' content='Buy & Sell vested tokens with OTC deals on NovaMarket.' />
        <meta name="robots" content="follow, index" />
        <link rel="canonical" href="https://novamarket.xyz/" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="NovaMarket | ETHLisbon" />
        <meta property="og:description" content="Buy & Sell vested tokens with OTC deals on NovaMarket." />
        <meta property="og:url" content="https://novamarket.xyz/" />
        <meta property="og:image" content="https://novamarket.xyz/og.jpg" />
      </Head>
      <Navbar />
      <Hero />
      <Details />
      <LiveSales />
      <Faq />
      <Footerbar />
    </div>
  )
}
