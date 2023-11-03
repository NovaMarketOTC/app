import React from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

const Faq = () => {
    return (
        <div className='sm:pt-5'>
            <div className="justify-center items-center w-full max-w-[1600px] bg-gradient-to-b from-black via-white/5 to-nova/20 pb-10 mx-auto backdrop-blur-xl rounded-xl bg-black">
                <div className="max-w-5xl pt-10 mx-auto">
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
                                            <p>NovaMarket is currently live on <a href='https://polygon.technology/polygon-zkevm' className='underline font-semibold' target='_blank'>Polygon ZkEVM Testnet</a>.</p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                            <div className='pt-4'></div>
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between rounded-xl bg-gradient-to-r from-black from-0% via-nova/30 via-50% to-black to-100% backdrop-blur-xl border border-nova px-4 py-2 text-left font-light text-white">
                                            <h2>Why I Have to Put my Email?</h2>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-white`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 text-sm text-white">
                                            <p>Providing your email allow us to send you notifications about your sale offer. Your email is fully encrypted using <a href='https://tools.docs.iex.ec/' className='underline font-semibold' target='_blank'>Iexec</a> and anyone can't access it.</p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                            <div className='pt-4'></div>
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between rounded-xl bg-gradient-to-r from-black from-0% via-nova/30 via-50% to-black to-100% backdrop-blur-xl border border-nova px-4 py-2 text-left font-light text-white">
                                            <h2>Why Price Estimation is Not Available for an Asset?</h2>
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
        </div >
    )
}

export default Faq
