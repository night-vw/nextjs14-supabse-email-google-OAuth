"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const SignInPage: React.FC = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // エラーメッセージ用のステート

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // エラーメッセージをクリア

    if (!email || !password) {
      setError('メールアドレスとパスワードを入力してください。');
      return;
    }

    try {
      setLoading(true);
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (signInError) {
        // Supabaseのエラーメッセージを日本語に翻訳
        switch (signInError.message) {
          case 'Invalid login credentials':
            setError('無効なログイン情報です。');
            break;
          case 'Email not confirmed':
            setError('メールアドレスが確認されていません。');
            break;
          default:
            setError('サインイン中にエラーが発生しました。');
        }
        throw signInError;
      }
      await router.push("/main");
      await router.refresh();
    } catch (error: any) {
      console.error('サインインエラー:', error);
      if (!error.message) {
        setError('エラーが発生しました。詳細: ' + error.message); // エラーメッセージを設定
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">サインイン</h1>
      <form className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onLogin}>
        {error && <div className="text-red-500 mb-4">{error}</div>} {/* エラーメッセージの表示 */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signin-email">
            メールアドレス
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="signin-email"
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signin-password">
            パスワード
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="signin-password"
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? 'サインイン中...' : 'サインイン'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
