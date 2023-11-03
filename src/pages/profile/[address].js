import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footerbar from '@/components/Footerbar';
import { useRouter } from 'next/router';

const User = () => {
    const router = useRouter();
    const { address } = router.query;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchUserData() {
            setIsLoading(true);
            //getData
            setIsLoading(false);
        }
        fetchUserData();
    }, [address]);


    return (
        <div>
            <Navbar />
            {address}
            {isLoading ? (
                <div></div>
            ) : (
                <div></div>
            )}
            <Footerbar />
        </div>
    );
};

export default User;