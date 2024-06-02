import React from 'react';
import Link from 'next/link';
import { supabaseServer } from '@/utils/supabase-server';
import LogoutButton from '@/components/LogoutButton';
import GoogleSignIn from '@/components/GoogleSignIn';


const HomePage: React.FC = async () => {
  const supabase = supabaseServer();
  const { data: user } = await supabase.auth.getSession();
  const session = user.session;

  

  return (
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Login-Test</h1>
      <div className="space-y-6">
        {session ? (
          <LogoutButton />
        ) : (
          <div className='flex flex-col space-y-4'>
          <GoogleSignIn/>
            <div className='flex space-x-4'>
              <Link href="/signin"className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  サインイン
              </Link>
              <Link href="/signup"className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  サインアップ
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
