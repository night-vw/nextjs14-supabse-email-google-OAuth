"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const GoogleSignIn: React.FC = () => {
    const supabase = createClientComponentClient();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleRedirect = async () => {
            const session = await supabase.auth.getSession();
            if (session.data.session) {
                router.push("/main");
            }
        };

        if (typeof window !== 'undefined') {
            handleRedirect();
        }
    }, [router, supabase.auth]);

    const signInWithGoogle = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/main`,
            },
        });
        
        if (error) {
            console.error('Error signing in with Google:', error);
            setLoading(false);
            return;
        }
    };

    return (
        <button
            className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={signInWithGoogle}
            disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In with Google'}
        </button>
    );
};

export default GoogleSignIn;
