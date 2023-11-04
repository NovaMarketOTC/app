import React, { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footerbar from '@/components/Footerbar'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'
import { contract, rpc } from '@/utils/config'
// import { IExecDataProtector } from "@iexec/dataprotector";


const create = () => {

    const { address } = useAccount();
    const provider = new ethers.JsonRpcProvider(rpc);

    // const providerIexec = new ethers.JsonRpcProvider('https://bellecour.iex.ec');
    // const dataProtector = new IExecDataProtector(providerIexec);

    const [tokenContract, setTokenContract] = useState('');
    const [tokenName, setTokenName] = useState('');
    const [tokenSymbol, setTokenSymbol] = useState('');
    const [tokenDecimals, setTokenDecimals] = useState('')
    const [tokenAmount, setTokenAmount] = useState(1);
    const [priceAsked, setPriceAsked] = useState(1);
    const [owner, setOwner] = useState('');
    const [userEmail, setUserEmail] = useState('');

    async function getTokenData() {
        const contract = new ethers.Contract(tokenContract, [
            { constant: true, inputs: [], name: 'name', outputs: [{ name: '', type: 'string' }], type: 'function' },
            { constant: true, inputs: [], name: 'decimals', outputs: [{ name: '', type: 'uint8' }], type: 'function' },
            { constant: true, inputs: [], name: 'symbol', outputs: [{ name: '', type: 'string' }], type: 'function' }
        ], provider);

        const [name, decimals, symbol] = await Promise.all([contract.name(), contract.decimals(), contract.symbol()]);
        setTokenName(name);
        setTokenDecimals(decimals.toString());
        setTokenSymbol(symbol);
    }

    // function createSale() {
    //     console.log('Send Email Here w/ IEXEC')
    // }

    async function protectData(userEmail) {
        const protectedData = await dataProtector.protectData({
            data: {
                email: 'test@test.com'
            }
        })
    }

    useEffect(() => {
        setOwner(address);
        console.log(address)
    })

    useEffect(() => {
        if (tokenContract !== '') {
            getTokenData();
        }
    }, [tokenContract]);

    async function createSale(tokenName, tokenContract, tokenAmount, priceAsked) {
        console.log(userEmail)
        //ENCRYPT w/ IEXEC


    }

    return (
        <div>
            <Navbar />
            <div className='pt-20 text-white flex justify-center mx-auto'>
                <div className="flex justify-center">
                    <div className="flex flex-col mx-4">
                        <h1 className='font-light text-2xl text-white'>Create a Sale Offer</h1>
                        <p className='font-light text-xs justify-center mx-auto flex text-slate-200 pt-2'>Fill in this form and sign the transaction to sell your vested tokens on the marketplace.</p>
                        <h3 className='pt-3 font-light text-xl text-white'>Vested Token Contract Address</h3>
                        <input
                            placeholder="0x..."
                            className="mt-1 border-[1px] rounded-xl py-1 px-2 text-white border-nova bg-slate-700"
                            onChange={e => setTokenContract(e.target.value)}
                        />
                        <span className='pt-2 text-[8px] text-white mx-auto justify-center'>For exemple: 0xCc1a0e08Fa2d8371723Bb3B90331371581918466 (veNOVA)</span>
                        {tokenContract !== '' ? (
                            <>
                                <div className='grid grid-cols-3 gap-2'>
                                    <div>
                                        <h3 className='pt-3 font-light text-xl text-white'>Name</h3>
                                        <span className="pt-1 border-[1px] rounded-xl py-1 px-2 text-white border-nova bg-slate-700 flex mx-auto justify-center">{tokenName}</span>
                                    </div>
                                    <div>
                                        <h3 className='pt-3 font-light text-xl text-white'>Symbol</h3>
                                        <span className="pt-1 border-[1px] rounded-xl py-1 px-2 text-white border-nova bg-slate-700 flex mx-auto justify-center">{tokenSymbol}</span>
                                    </div>
                                    <div>
                                        <h3 className='pt-3 font-light text-xl text-white'>Decimals</h3>
                                        <span className="pt-1 border-[1px] rounded-xl py-1 px-2 text-white border-nova bg-slate-700 flex mx-auto justify-center">{tokenDecimals}</span>
                                    </div>
                                </div>
                                <h3 className='pt-3 font-light text-xl text-white'>Price Estimation</h3>
                                <div className='pt-1 text-green-500'>
                                    PRICE ESTIMATION HERE USING CHRONICLE
                                </div>
                            </>
                        ) : (
                            <>
                            </>
                        )}
                        <h3 className='pt-3 font-light text-xl text-white'>Number of Tokens to Sell</h3>
                        <input
                            type="number"
                            placeholder="Number of Tokens"
                            className="mt-1 border-[1px] rounded-xl py-1 px-2 text-white border-nova bg-slate-700"
                            onChange={e => setTokenAmount(e.target.value)}
                            pattern="\d*"
                        />
                        <h3 className='pt-3 font-light text-xl text-white'>Desired Price</h3>
                        <input
                            type="number"
                            placeholder="Price in ETH"
                            className="mt-1 border-[1px] rounded-xl py-1 px-2 text-white border-nova bg-slate-700"
                            onChange={e => setPriceAsked(e.target.value)}
                            pattern="\d*"
                        />
                        <h3 className='pt-3 font-light text-xl text-white'>Your Email</h3>
                        <div className='inline-flex'>
                            <input
                                type='email'
                                placeholder="john@doe.com"
                                className="mt-1 border-[1px] rounded-xl py-1 px-2 text-white border-nova bg-slate-700 w-2/3"
                                onChange={e => setUserEmail(e.target.value)}
                            />
                            <button className='font-semibold w-1/3 mx-auto bg'>Encrypt Email</button>
                        </div>
                        <div className='pt-5'>
                            <button onClick={() => createSale(tokenName, tokenContract, tokenAmount, priceAsked)} className='bg-gradient-to-r from-nova/60 via-nova/80 to-nova flex rounded-xl mx-auto font-semibold py-1 px-3'>Create Sale Offer</button>
                        </div>
                        {/* <div className='pt-5'>
                            <button onClick={() => protectData()} className='bg-gradient-to-r from-nova/60 via-nova/80 to-nova flex rounded-xl mx-auto font-semibold py-1 px-3'>Test Protect Data</button>
                        </div> */}
                    </div>
                </div>
                <div className="hidden sm:block px-10">
                    <div className='flex mx-auto justify-center pt-2 pb-2'>
                        <h2 className='font-light sm:text-xl text-lg'>How it Works?</h2>
                    </div>
                    <div className='mx-auto max-w-7xl'>
                        <div className="mx-auto max-w-5xl rounded-2xl bg-black p-2 w-[350px]">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between rounded-xl bg-gradient-to-r from-black from-0% via-nova/30 via-50% to-black to-100% backdrop-blur-xl border border-nova px-4 py-2 text-left font-light text-white">
                                            <h2>Which Chains Are Supported?</h2>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-white`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 text-sm text-white">
                                            <p>NovaMarket is currently live on Polygon ZkEVM Testnet.</p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                            <div className='pt-4'></div>
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between rounded-xl bg-gradient-to-r from-black from-0% via-nova/30 via-50% to-black to-100% backdrop-blur-xl border border-nova px-4 py-2 text-left font-light text-white">
                                            <h2>Why I have to put my Email?</h2>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-white`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 text-sm text-white">
                                            <p>Providing your email allow us to send you notifications about your sale offer. Your email is fully encrypted using <a href='' className='underline'>Iexec</a> and anyone can't access it.</p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                            <div className='pt-4'></div>
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between rounded-xl bg-gradient-to-r from-black from-0% via-nova/30 via-50% to-black to-100% backdrop-blur-xl border border-nova px-4 py-2 text-left font-light text-white">
                                            <h2>Why Price Estimation is Not Live?</h2>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-white`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 text-sm text-white">
                                            <p>NovaMarket uses <a href='https://chroniclelabs.org/' className='underline font-semibold' target='_blank'>Chronicle</a> oracles to provide you with price data. If you don't see an estimate, it's likely that the asset doesn't yet have a price history, or that no oracle is available.</p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sm:hidden block px-10 pt-10">
                <div className='border border-nova rounded-xl p-3'>
                    <div className='flex mx-auto justify-center pt-2 pb-2'>
                        <h2 className='font-light sm:text-xl text-lg underline underline-offset-0 decoration-nova'>How it Works?</h2>
                    </div>
                    <div className='mx-auto'>
                        <div className="mx-auto justify-center">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between rounded-xl bg-gradient-to-r from-black from-0% via-nova/30 via-50% to-black to-100% backdrop-blur-xl border border-nova px-4 py-2 text-left font-light text-white">
                                            <h2>Which Chains Are Supported?</h2>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-white`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 text-sm text-white">
                                            <p>NovaMarket is currently live on Polygon ZkEVM Testnet.</p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                            <div className='pt-4'></div>
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between rounded-xl bg-gradient-to-r from-black from-0% via-nova/30 via-50% to-black to-100% backdrop-blur-xl border border-nova px-4 py-2 text-left font-light text-white">
                                            <h2>Why I have to put my Email?</h2>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-white`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 text-sm text-white">
                                            <p>Providing your email allow us to send you notifications about your sale offer. Your email is fully encrypted using <a href='' className='underline'>Iexec</a> and anyone can't access it.</p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                            <div className='pt-4'></div>
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between rounded-xl bg-gradient-to-r from-black from-0% via-nova/30 via-50% to-black to-100% backdrop-blur-xl border border-nova px-4 py-2 text-left font-light text-white">
                                            <h2>Why Price Estimation is Not Live?</h2>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-white`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 text-sm text-white">
                                            <p>NovaMarket uses <a href='https://chroniclelabs.org/' className='underline font-semibold' target='_blank'>Chronicle</a> oracles to provide you with price data. If you don't see an estimate, it's likely that the asset doesn't yet have a price history, or that no oracle is available.</p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pt-20'></div>
            <Footerbar />
        </div>
    )
}

export default create