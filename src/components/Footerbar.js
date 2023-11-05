import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'etherstest';
import Image from 'next/image';
import { useAccount } from 'wagmi';


const rpc = 'https://zkevm-rpc.com/';
const provider = new ethers.JsonRpcProvider(rpc);

const Footerbar = () => {
    const [ethPrice, setEthPrice] = useState('...');
    const [blockNumber, setBlockNumber] = useState(null);

    const { address } = useAccount()
    console.log(address)

    async function getEthPrice() {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const price = response.data['ethereum'].usd;
        setEthPrice(price.toFixed(2));
    }

    async function getBlockNumber() {
        const latestBlock = await provider.getBlockNumber();
        setBlockNumber(latestBlock);
    }

    useEffect(() => {
        getEthPrice();
        getBlockNumber();
    }, []);

    return (
        <div className='fixed bottom-0 w-full border-t-nova border-t-[1px] z-5 text-white bg-black z-50'>
            <footer className='flex items-center justify-between mx-4'>
                <div>
                    <div className='border-e-[1px] border-e-nova flex'>
                        <span className='mr-2'>
                            <Image src="/eth.png" width={15} height={15} className='inline-flex pb-1' />
                            ETH ${ethPrice}</span>
                    </div>
                </div>
                <div>
                    <div className='sm:flex hidden'>
                        <span className="text-xs font-semibold">Built w/ ❤️ @ETHLisbon</span>
                    </div>
                </div>
                <div className='flex'>
                    <div className='ml-2 border-l-[1px] border-l-nova px-2 flex'>
                        <span className="relative flex h-2 w-2 mx-1">
                            <span className="inline-flex h-2 w-2 rounded-full bg-teal-500 mt-2"></span>
                        </span>
                        {blockNumber !== null ? `Block: ${blockNumber}` : 'Loading...'}</div>
                </div>
            </footer>
        </div>
    );
};

export default Footerbar
