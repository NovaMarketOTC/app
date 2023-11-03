import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import Router, { useRouter } from 'next/router';
import { createWeb3Modal, defaultWagmiConfig, useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useBalance } from 'wagmi';
import { polygonZkEvmTestnet, polygonZkEvm } from 'wagmi/chains'


const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
const chains = [polygonZkEvmTestnet, polygonZkEvm]
const wagmiConfig = defaultWagmiConfig({
    chains,
    projectId,
    metadata: {
        name: 'NovaMarket App'
    }
})
createWeb3Modal({
    wagmiConfig, projectId, chains, themeMode: 'dark',
    themeVariables: {
        '--w3m-color-mix': '#0369a1',
        '--w3m-color-mix-strength': 50,
        '--w3m-accent': '#fff',
        '--w3m-z-index': 1000
    }
})


const Navbar = () => {

    const modal = useWeb3Modal()
    const { address, isConnected } = useAccount()
    const { data } = useBalance({ address: address });
    const ethBalance = parseFloat(data?.formatted || 0).toFixed(3);
    const router = useRouter();

    console.log(address)

    function goProfile(userAddr) {
        router.push(`/profile/${userAddr}`);
    }

    return (
        <div>
            <div className='fixed top-0 w-full border-b-nova border-b-[1px] z-10 bg-black'>
                <nav className='flex items-center justify-between mx-1.5 py-1.5'>
                    <div className="w-64">
                        <Link className="text-xl font-semibold" href="/">
                            <div className='flex'>
                                <Image src='/logo2.png' width={200} height={110} className='mx-2' alt='Logo' />
                            </div>
                        </Link>
                    </div>
                    <div className='flex'>
                        {isConnected ? (
                            <>
                                <div className='px-1.5 hidden sm:inline-flex'>
                                    {/* <div>
                                        <button onClick={() => router.push(`/profile/${address}`)} className='bg-gradient-to-r from-nova/60 via-nova/80 to-nova backdrop-blur-xl rounded-xl px-3.5 py-1 border border-sky-800 text-white hover:bg-sky-800 font-semibold'>
                                            Test
                                        </button>
                                    </div> */}
                                    {/* <div className='bg-gradient-to-r from-nova/60 via-nova/80 to-nova  backdrop-blur-xl rounded-xl px-3.5 py-1.5 border border-sky-800 text-white hover:bg-sky-800 font-semibold mr-2'>
                                        <svg fill="#fff" width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M21,20a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2,6,6,0,0,1,6-6h6A6,6,0,0,1,21,20Zm-9-8A5,5,0,1,0,7,7,5,5,0,0,0,12,12Z"></path></svg>
                                    </div> */}
                                    <div>
                                        <button className="text-sm font-light" >
                                            <div onClick={() => modal.open()} className='bg-gradient-to-r from-nova/60 via-nova/80 to-nova  backdrop-blur-xl rounded-xl px-3.5 py-1.5 border border-sky-800 text-white hover:bg-sky-800 font-semibold'>
                                                {ethBalance} ETH
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div className='px-1.5 sm:hidden flex'>
                                    <div>
                                        <button className="text-sm font-light" >
                                            <div onClick={() => modal.open()} className='bg-gradient-to-r from-nova/60 via-nova/80 to-nova  backdrop-blur-xl rounded-xl px-3.5 py-1 border border-sky-800 text-white hover:bg-sky-800 font-semibold'>
                                                {ethBalance} ETH
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='px-1.5 hidden sm:flex'>
                                    <div>
                                        <button className="text-sm font-light" >
                                            <div onClick={() => modal.open()} className='bg-gradient-to-r from-nova/60 via-nova/80 to-nova  backdrop-blur-xl rounded-xl px-3.5 py-1.5 border border-sky-800 text-white hover:bg-sky-800 font-semibold'>
                                                Connect Wallet
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div className='px-1.5 sm:hidden flex'>
                                    <div>
                                        <button className="text-sm font-light" >
                                            <div onClick={() => modal.open()} className='bg-gradient-to-r from-nova/60 via-nova/80 to-nova  backdrop-blur-xl rounded-xl px-3.5 py-1 border border-sky-800 text-white hover:bg-sky-800 font-semibold'>
                                                Connect
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar
