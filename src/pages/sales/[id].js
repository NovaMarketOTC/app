import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Footerbar from '@/components/Footerbar';
import { contract, rpc } from '@/utils/config'
import MARKETABI from '@/utils/MARKETABI.json'
import { ethers } from 'etherstest'
import { useAccount, useContractWrite } from 'wagmi'



const saleID = () => {

    const router = useRouter();
    const { id } = router.query;
    const provider = new ethers.JsonRpcProvider(rpc);
    const ABI = MARKETABI;
    const [salesDataForId, setSalesDataForId] = useState([]);
    const [price, setPrice] = useState(1)
    const { address } = useAccount();
    const contractAddr = contract;

    useEffect(() => {
        const fetchSalesDataForId = async () => {
            const contractInstance = new ethers.Contract(contract, ABI, provider);
            const sales = await contractInstance.salesMap(id);
            setSalesDataForId(sales);
            console.log(sales)
        };
        const getPriceForId = async () => {
            const contractInstance = new ethers.Contract(contract, ABI, provider);
            const sales = await contractInstance.getSalePrice(id);
            setPrice(sales);
            console.log(sales)
        };
        fetchSalesDataForId();
        getPriceForId();
    }, []);

    const { write: newBuy, isLoading: isBuying, isError: isErrorBuying, isSuccess: isSuccessBuying } = useContractWrite({
        address: contractAddr,
        abi: ABI,
        functionName: 'buySale',
    });

    async function buySale(id) {
        try {
            newBuy({ args: [salesDataForId.id], from: address, value: price });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='pt-40 text-white flex justify-center mx-auto'>
                <div className="justify-center items-center w-full max-w-[600px] bg-gradient-to-b from-black via-white/5 to-nova/20 pb-10 mx-auto backdrop-blur-xl rounded-xl bg-black">
                    {salesDataForId ? (
                        <>
                            <div>
                                {salesDataForId.already_sold ? (
                                    <>
                                        <span className="mx-auto justify-center flex text-red-500 pt-2">Already Sold!</span>
                                    </>
                                ) : (
                                    <>
                                        <span className='text-3xl font-semibold mx-auto flex justify-center'>BUY {salesDataForId.token_name}</span>
                                        <span className='pt-2 text-sm mx-auto flex justify-center'>Quantity : {(Number(salesDataForId.sale_amount) / 1e18).toFixed(4)} {salesDataForId.token_name}</span>
                                        <span className='pt-2 text-sm mx-auto flex justify-center'>Price Asked : {(Number(salesDataForId.sale_price) / 1e18).toFixed(4)} ETH</span>
                                        {/* {salesDataForId.owner} */}
                                        {/* {salesDataForId.already_sold} */}
                                        <div className="pt-3">
                                            <button onClick={() => buySale(salesDataForId.id)} className='bg-gradient-to-r from-nova/60 via-nova/80 to-nova flex rounded-xl mx-auto font-semibold py-1 px-3'>Buy Offer</button>
                                        </div>
                                        {isSuccessBuying && (
                                            <span className="mx-auto justify-center flex text-green-500 pt-2">Tokens has been successfully bought!</span>
                                        )}
                                        {isErrorBuying && (
                                            <span className="mx-auto justify-center flex text-red-500 pt-2">Error buying sale offer!</span>
                                        )}
                                        <span className='text-xs mx-auto flex justify-center pt-3'>
                                            Contract: <a href={`https://testnet-zkevm.polygonscan.com/address/${salesDataForId.token_contract}`} className='text-nova underline ml-2'>{salesDataForId.token_contract}</a>
                                        </span>
                                    </>
                                )}
                            </div>
                        </>
                    ) : (
                        <div>
                            Loading sale details... ⏰
                        </div>
                    )}
                </div>
            </div>
            <div className='flex justify-center pt-7 sm:pt-5 text-lg'>
                <Link className="text-lg font-light" href="/market">
                    <div className='bg-gradient-to-r from-nova/60 via-nova/80 to-nova flex rounded-xl px-20 py-1.5 border border-nova text-white font-semibold hover:bg-nova mr-5'>
                        <span>See Market</span>
                    </div>
                </Link>
            </div>
            <Footerbar />
        </div>
    )
}

export default saleID
