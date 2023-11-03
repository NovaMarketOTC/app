import React, { useState } from 'react'
import Image from 'next/image';
import Router, { useRouter } from 'next/router';

const Details = () => {
    const router = useRouter();
    const [display, setDisplay] = useState('Sellers');

    function setSellers() {
        setDisplay('Sellers')
    }

    function setBuyers() {
        setDisplay('Buyers')
    }



    return (
        <div>
            <div className='flex mx-auto justify-center z-auto'>
                <div className="flex justify-center items-center w-full rounded-[2.5rem]">
                    <div className="justify-center items-center w-full max-w-[1600px] bg-gradient-to-b from-nova/20 via-white/5 to-black backdrop-blur-xl rounded-xl bg-black">
                        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full px-6 md:px-14 lg:px-24 xl:px-32 mt-12 sm:mb-12 mb-8">
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 order-last lg:order-first text-white w-full lg:w-1/2 xl:w-4/12 mt-10 lg:mt-0">
                                <button className="flex justify-between items-center w-full h-fit px-8 py-5 rounded-2xl border-nova border-[1px] border-opacity-60" onClick={setSellers}>
                                    <div className="flex justify-center items-center">
                                        <h4>For Sellers</h4>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                        <path d="M9.6001 18L15.6001 12L9.6001 6" stroke="white"></path>
                                    </svg>
                                </button>
                                <button className="flex justify-between items-center w-full h-fit px-8 py-5 rounded-2xl border-nova border-[1px] border-opacity-60" onClick={setBuyers}>
                                    <div className="flex justify-center items-center">
                                        <h4>For Buyers</h4>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                        <path d="M9.6001 18L15.6001 12L9.6001 6" stroke="white"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="flex flex-col order-first lg:order-last items-start w-full md:w-[80%] lg:w-1/2 xl:w-6/12 px-5 lg:ms-16">
                                {display === 'Sellers' && (
                                    <div>
                                        <h2 className="text-gray-100 mb-2 text-xl">Designed for early investors.</h2>
                                        <ul className='text-xs text-gray-400'>
                                            <li className=''>- <span className="font-bold">Early Bird Benefits:</span> Liquidate vested tokens and access funds ahead of time.</li>
                                            <li className='pt-1'>- <span className="font-bold">Your Tokens, Your Terms:</span> Turn lock-ins into opportunities, not limitations.</li>
                                            <li className='pt-1'>- <span className="font-bold">No More Waiting:</span> Bridge the cashflow gap with instant liquidity.</li>
                                            <li className='pt-1'>- <span className="font-bold">Maximize Value:</span> Connect directly with keen investors hungry for your assets.</li>
                                        </ul>
                                        <div className='pt-5'>
                                            <button className='text-xs border border-nova rounded-lg flex mx-auto justify-center py-1 px-4 bg-gradient-to-r from-nova/60 via-nova/80 to-nova' onClick={() => router.push('/create')}>Sell Vested Tokens</button>
                                        </div>
                                    </div>
                                )}
                                {display === 'Buyers' && (
                                    <div>
                                        <h2 className="text-gray-100 mb-2 text-xl">Designed for hungry investors.</h2>
                                        <ul className='text-xs text-gray-400'>
                                            <li className=''>- <span className="font-bold">Dive into Discounts:</span> Grab premium tokens at unrivaled prices.</li>
                                            <li className='pt-1'>- <span className="font-bold">Stay Ahead of the Curve:</span> Access high-potential tokens before they hit mainstream.</li>
                                            <li className='pt-1'>- <span className="font-bold">Strategic Investments:</span> Buy from a curated pool of locked assets, ripe for the picking.</li>
                                            <li className='pt-1'>- <span className="font-bold">Seize Tomorrow's Stars:</span> Invest early in tomorrow's crypto giants.</li>
                                        </ul>
                                        <div className='pt-5'>
                                            <button className='text-xs border border-nova rounded-lg flex mx-auto justify-center py-1 px-4 bg-gradient-to-r from-nova/60 via-nova/80 to-nova' onClick={() => router.push('/market')}>Buy Vested Tokens</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div >
            <div className='pt-12'></div>
        </div>
    )
}

export default Details
