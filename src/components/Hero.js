import React, { useEffect, useState } from 'react';
import Particles from '../utils/particles';
import Link from 'next/link';

const Hero = () => {
    const initialText = "OTC Trading Made Easy.";
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [subText, setSubText] = useState('');
    const [subTextIndex, setSubTextIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentIndex < initialText.length) {
                setDisplayedText(initialText.substring(0, currentIndex + 1));
                setCurrentIndex(currentIndex + 1);
            } else if (subTextIndex < "Buy & Sell vested tokens with OTC deals on NovaMarket.".length) {
                setSubText(subText + "Buy & Sell vested tokens with OTC deals on NovaMarket."[subTextIndex]);
                setSubTextIndex(subTextIndex + 1);
            } else {
                clearTimeout(timer);
            }
        }, 10);
        return () => clearTimeout(timer);
    }, [currentIndex, subTextIndex]);

    return (
        // <div className='bg-gradient-to-r from-black from-0% via-nova/10 via-50% to-black to-100%'>
        <div className='bg-black'>
            <div className="absolute inset-0 max-w-full mx-auto top-0 z-0 pointer-events-none">
                <Particles
                    className="absolute top-10 bottom-10 inset-0 z-0 pointer-events-none h-[500px]"
                    quantity={200}
                />
            </div>
            <div className='pt-44 pt font-normal px-5 z-[-100]'>
                <div className='text-center flex justify-center flex-col font-medium items-center mx-auto gap-y-6'>
                    <h1 className='text-white font-semibold sm:text-6xl text-3xl'>{displayedText}</h1>
                    <h2 className='text-white/60 px-1 sm:text-3xl text-xl font-light'>{subText}</h2>
                </div>
            </div>
            <div className='flex justify-center pt-12 text-lg'>
                <Link className="text-lg font-light" href="/market">
                    <div className='bg-gradient-to-r from-nova/60 via-nova/80 to-nova flex rounded-xl px-10 sm:px-20 py-1.5 border border-nova text-white font-semibold hover:bg-nova mr-5'>
                        <span>Buy</span>
                    </div>
                </Link>
                <Link className="text-lg font-light" href="/create">
                    <div className='bg-black flex rounded-xl px-10 sm:px-20 py-1.5 border border-nova text-white hover:bg-nova font-semibold'>
                        <span>Sell</span>
                    </div>
                </Link>
            </div>
            <div className='pt-20'></div>
        </div>
    );
}

export default Hero
