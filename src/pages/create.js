// "use server"
import React, { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footerbar from '@/components/Footerbar'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { useAccount, useContractWrite } from 'wagmi'
import { ethers } from 'etherstest'
import { contract, rpc } from '@/utils/config'
import MARKETABI from '@/utils/MARKETABI.json'
import veNovaABI from '@/utils/ERC20ABI.json'

import { IExecDataProtector, getWeb3Provider } from "@iexec/dataprotector";
import { IEXEC_EXPLORER_URL } from '@/utils/config'

const privateKey = process.env.NEXT_WEB3MAIL_PLATFORM_PRIVATE_KEY;
const pk = 'cb70038914667470c212b4cb155ae31a636ac476207283c7ff4c6497226906bd'

const create = () => {
    const [tokenContract, setTokenContract] = useState('');
    const [tokenName, setTokenName] = useState('');
    const [tokenSymbol, setTokenSymbol] = useState('');
    const [tokenDecimals, setTokenDecimals] = useState('')
    const [tokenAmount, setTokenAmount] = useState(1);
    const [priceAsked, setPriceAsked] = useState(1);
    const [owner, setOwner] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isApproved, setIsApproved] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [nextSaleId, setNextSaleId] = useState(0);
    const [displayBtnTrue, setDisplayBtnTrue] = useState(false);
    const [loadindEncryptBtn, setLoadindEncryptBtn] = useState(false);
    const [chroniclePriceData, setChroniclePriceData] = useState(false);
    const [priceEstimatedChronicle, setPriceEstimatedChronicle] = useState(0)
    const { address } = useAccount();
    const provider = new ethers.JsonRpcProvider(rpc);
    const ABI = MARKETABI;
    const contractAddr = contract;


    const { write: newSale, isLoading: isCreating, isError: isErrorCreating, isSuccess: isSuccessCreating } = useContractWrite({
        address: contractAddr,
        abi: ABI,
        functionName: 'createSale',
    });

    async function createSale(tokenSymbol, tokenContract, tokenAmount, priceAsked) {
        newSale({ args: [tokenSymbol, tokenContract, tokenAmount, priceAsked], from: address, value: 0 });
    }

    const { write: approveToken, isLoading: isApproving, isError: isErrorApproving, isSuccess: isSuccessApproving } = useContractWrite({
        address: tokenContract,
        abi: veNovaABI,
        functionName: 'approve',
    });

    async function approve(marketContractAddress, tokenAmount) {
        await approveToken({ args: [marketContractAddress, tokenAmount], from: address, value: 0 }); // Pass the tokenAmount as an argument
        console.log('approve ok');
    }

    async function getTokenData() {
        setIsLoadingData(true);
        const contract = new ethers.Contract(tokenContract, [
            { constant: true, inputs: [], name: 'name', outputs: [{ name: '', type: 'string' }], type: 'function' },
            { constant: true, inputs: [], name: 'decimals', outputs: [{ name: '', type: 'uint8' }], type: 'function' },
            { constant: true, inputs: [], name: 'symbol', outputs: [{ name: '', type: 'string' }], type: 'function' }
        ], provider);

        const [name, decimals, symbol] = await Promise.all([contract.name(), contract.decimals(), contract.symbol()]);
        setTokenName(name);
        setTokenDecimals(decimals.toString());
        setTokenSymbol(symbol);
        setIsLoadingData(false);
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

    useEffect(() => {
        async function fetchNextSaleId() {
            const contract = new ethers.Contract(contractAddr, MARKETABI, provider);
            const result = await contract.nextSaleId();
            setNextSaleId(result.toString());
        }

        async function fetchPriceData() {
            if (tokenContract != "0xCc1a0e08Fa2d8371723Bb3B90331371581918466") {
                const contract = new ethers.Contract(contractAddr, MARKETABI, provider);
                const result = await contract.callExternalFunction();
                let resultFixed = result.toString().slice(0, -18);
                setChroniclePriceData(true);
                setPriceEstimatedChronicle(resultFixed);
            }
            setTimeout(fetchPriceData, 2000);
        }
        fetchNextSaleId();
        fetchPriceData();
    }, [contractAddr]);

    console.log(IEXEC_EXPLORER_URL)
    console.log(privateKey)
    const protectorWebProvider = getWeb3Provider(pk);
    const dataProtector = new IExecDataProtector(protectorWebProvider);

    async function encryptEmail(userEmail, nextSaleId) {
        setLoadindEncryptBtn(true)
        const protectedData = await dataProtector.protectData({ data: { email: userEmail, saleId: nextSaleId } })
        setLoadindEncryptBtn(false)
        setDisplayBtnTrue(true)
    }


    return (
        <div className="">
            <Navbar />
            <div className='pt-20 text-white flex justify-center mx-auto'>
                <div className="flex justify-center">
                    <div className="flex flex-col mx-4">
                        <h1 className='font-light text-2xl text-white'>Create Sale Offer #{nextSaleId}</h1>
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
                                {isLoadingData ? (
                                    <div className="pt-3">
                                        <div className="mx-auto justify-center flex animate-spin">
                                            <svg width="20" height="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#0369a1" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z" /></svg>
                                        </div>
                                    </div>
                                ) : (
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
                                        <h3 className='pt-3 font-light text-xl text-white'>Price Estimation / Asset Price</h3>
                                        <div className='pt-1 text-green-500'>
                                            {tokenContract != '0xCc1a0e08Fa2d8371723Bb3B90331371581918466' ? (
                                                <>
                                                    <span className="justify-center mx-auto flex">Chronicle price data : ${priceEstimatedChronicle}/{tokenSymbol}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="justify-center mx-auto flex text-sm">No price data available for this ERC-20 on Chronicle Oracles yet!</span>
                                                </>
                                            )}
                                            {/* {chroniclePriceData ? (
                                                <>
                                                    <span className="justify-center mx-auto flex">Chronicle price data : ${priceEstimatedChronicle}/{tokenSymbol}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="justify-center mx-auto flex text-sm">No price data available for this ERC-20 on Chronicle Oracles yet!</span>
                                                </>
                                            )} */}
                                        </div>
                                    </>
                                )}
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
                            // onChange={e => setTokenAmount(BigInt(parseFloat(e.target.value) / 1e18))}
                            onChange={e => setTokenAmount(ethers.parseUnits(e.target.value))}
                            pattern="\d*"
                        />
                        <h3 className='pt-3 font-light text-xl text-white'>Desired Price</h3>
                        <input
                            type="number"
                            placeholder="Price in ETH"
                            className="mt-1 border-[1px] rounded-xl py-1 px-2 text-white border-nova bg-slate-700"
                            onChange={e => setPriceAsked(ethers.parseUnits(e.target.value))}
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
                            {displayBtnTrue ? (
                                <>
                                    <button className='font-semibold w-1/3 mx-auto rounded-full text text-xs border-[1px] border-nova ml-2'>Email Encrypted! ✅</button>
                                </>
                            ) : (
                                <>
                                    <button className='font-semibold w-1/3 mx-auto rounded-full text text-xs border-[1px] border-nova ml-2' onClick={() => encryptEmail(userEmail, nextSaleId)}>Encrypt Email 🔒</button>
                                </>
                            )}
                        </div>
                        <div className='pt-7'>
                            <button
                                onClick={() => {
                                    if (isSuccessApproving) {
                                        createSale(tokenSymbol, tokenContract, tokenAmount, priceAsked);
                                    } else {
                                        approve(tokenContract, tokenAmount);
                                    }
                                }}
                                className={`bg-gradient-to-r from-nova/60 via-nova/80 to-nova flex rounded-xl mx-auto font-semibold py-1 px-3 ${isApproved ? 'text-green-500' : 'text-white'}`}
                            >
                                {isSuccessApproving ? `Create Sale Offer` : `Approve ${tokenSymbol} for NovaMarket`}
                            </button>
                            {isSuccessCreating && (
                                <span className="mx-auto justify-center flex text-green-500 pt-2">The sales offer has been successfully added!</span>
                            )}
                        </div>
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