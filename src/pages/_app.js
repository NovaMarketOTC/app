import '@/styles/globals.css'
import { Chivo } from 'next/font/google'

import { WagmiConfig } from 'wagmi'
import { defaultWagmiConfig } from '@web3modal/wagmi/react'
import { polygonZkEvmTestnet, polygonZkEvm } from 'wagmi/chains'

const chivo = Chivo({ subsets: ['vietnamese'] })

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

const chains = [polygonZkEvmTestnet, polygonZkEvm]

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId
})

export default function App({ Component, pageProps }) {

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <main className={chivo.className}>
          <div className='bg-black'>
            <Component {...pageProps} />
          </div>
        </main>
      </WagmiConfig>
    </>
  )
}
