import React from 'react';
import { supabaseServer } from '@/utils/supabase-server';
import LogoutButton from '@/components/LogoutButton';


const HomePage: React.FC = async () => {
  const supabase = supabaseServer();
  const { data: user } = await supabase.auth.getSession();
  const session = user.session;

  

  return (
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Login-Test</h1>
      <div className="space-y-6">
          <LogoutButton />
            </div>
      </div>
  );
};

export default HomePage;
