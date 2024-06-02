"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation'
import React from 'react'


const LogoutButton = () => {

    const router = useRouter() ;
    const supabase = createClientComponentClient();

    const Logout = async(e:React.FormEvent) => {
        e.preventDefault();
        try{
          const { error:logoutError } = await supabase.auth.signOut()
          if (logoutError) {
            throw logoutError;
          }
          await router.push("/");
          await router.refresh() ;
        }catch{
          alert('エラーが発生しました');
        }
      }
  return (
    <form onSubmit={Logout}>
    <button
    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="submit">
    サインアウト
    </button>
    </form>
  )
}

export default LogoutButton