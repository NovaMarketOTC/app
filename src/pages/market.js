import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar'
import Footerbar from '@/components/Footerbar'
import { contract, rpc } from '@/utils/config'
import MARKETABI from '@/utils/MARKETABI.json'
import { ethers } from 'etherstest'
import { useRouter } from 'next/router';


const market = () => {

    const [salesData, setSalesData] = useState([]);
    const provider = new ethers.JsonRpcProvider(rpc);
    const ABI = MARKETABI;
    const router = useRouter();

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
            <Navbar />
            <div className='pt-20 text-white flex mx-auto max-w-7xl'>
                <h1 className='font-light text-2xl text-white mx-4'>Buy Vested Tokens 🔥</h1>
            </div>
            <div className='grid sm:grid-cols-6 grid-cols-2 pt-5 gap-5 mx-2 max-w-7xl sm:mx-auto justify-center'>
                {salesData.map((sale, index) => (
                    <div key={index} className='mx-auto justify-center border-nova border-[1px] rounded-lg py-1 sm:w-[200px] sm:h-[100px] w-[150px] h-[85px]'>
                        {sale.already_sold ? (
                            <>
                                <span className='pt-1 flex mx-auto justify-center sm:text-[15px] text-[10px] font-semibold'>{(Number(sale.sale_amount) / 1e18).toFixed(2)} {sale.token_name}</span>
                                <span className='flex mx-auto justify-center sm:text-[15px] text-[10px]'>{(Number(sale.sale_price) / 1e18).toFixed(2)} ETH</span>
                                <div className='mt-2 mb-2'>
                                    <button onClick={() => router.push(`/sales/${sale.id}`)} className='bg-gradient-to-r from-red-600 via-red-500 to-red-600 flex rounded-lg mx-auto font-light py- px-7'>
                                        SOLD
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <span className='pt-1 flex mx-auto justify-center sm:text-[15px] text-[10px] font-semibold'>{(Number(sale.sale_amount) / 1e18).toFixed(2)} {sale.token_name}</span>
                                <span className='flex mx-auto justify-center sm:text-[15px] text-[10px]'>{(Number(sale.sale_price) / 1e18).toFixed(2)} ETH</span>
                                <div className='mt-2 mb-2'>
                                    <button onClick={() => router.push(`/sales/${sale.id}`)} className='bg-gradient-to-r from-nova/60 via-nova/80 to-nova flex rounded-lg mx-auto font-light py- px-7'>
                                        Buy
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <Footerbar />
        </div >
    )
}

export default market
