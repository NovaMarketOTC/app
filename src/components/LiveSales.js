import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import { contract, rpc } from '@/utils/config'
import MARKETABI from '@/utils/MARKETABI.json'
import { ethers } from 'ethers'


const LiveSales = () => {

    const provider = new ethers.JsonRpcProvider(rpc);
    const ABI = MARKETABI;

    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        const fetchSalesData = async () => {
            const contractInstance = new ethers.Contract(contract, ABI, provider);
            const sales = await contractInstance.getAllSales();
            const reversedSales = [...sales].reverse();
            setSalesData(reversedSales);
        };
        fetchSalesData();
    }, []);

    return (
        <div>
            <div className='max-w-7xl mx-auto'>
                <div className="group flex cursor-pointer justify-center gap-1.5 sm:justify-start">
                    <h3 className='font-semibold text-white text-xl'>Live Sales</h3>
                    <span className="relative -mr-2 flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500"></span>
                    </span>
                </div>
                <div className='grid sm:grid-cols-6 grid-cols-2 pt-5 gap-5 mx-2'>
                    {salesData.slice(0, 12).map((sale, index) => (
                        <div key={index} className='mx-auto justify-center border-nova border-[1px] rounded-lg py-1 p-8'>
                            <span className='flex mx-auto justify-center sm:text-[15px] text-[10px]'>{(Number(sale.sale_amount) / 1e18).toFixed(2)} {sale.token_name}</span>
                            <span className='flex mx-auto justify-center sm:text-[15px] text-[10px]'>{(Number(sale.sale_price) / 1e18).toFixed(2)} ETH</span>
                            <div className='mt-1 mb-1'>
                                <button onClick={() => router.push(`/sales/${sale.id}`)} className='bg-gradient-to-r from-nova/60 via-nova/80 to-nova flex rounded-xl mx-auto font-semibold py- px-3'>
                                    Buy
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-center pt-7 sm:pt-5 text-lg'>
                    <Link className="text-lg font-light" href="/market">
                        <div className='bg-gradient-to-r from-nova/60 via-nova/80 to-nova flex rounded-xl px-20 py-1.5 border border-nova text-white font-semibold hover:bg-nova mr-5'>
                            <span>See Market</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LiveSales
