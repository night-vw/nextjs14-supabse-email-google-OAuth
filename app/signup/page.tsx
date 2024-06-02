"use client"
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const SignUpPage: React.FC = () => {
    const supabase = createClientComponentClient();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); // エラーメッセージ用のステート

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // エラーメッセージをクリア

        if (!email || !password) {
            setError('メールアドレスとパスワードを入力してください。');
            return;
        }

        try {
            setLoading(true);
            const { error: signUpError } = await supabase.auth.signUp({
                email: email,
                password: password,
            });
            if (signUpError) {
                // Supabaseのエラーメッセージを日本語に翻訳
                switch (signUpError.message) {
                    case 'Invalid email or password':
                        setError('無効なメールアドレスまたはパスワードです。');
                        break;
                    case 'User already registered':
                        setError('このメールアドレスは既に登録されています。');
                        break;
                    case 'Password should be at least 6 characters.':
                        setError('パスワードは少なくとも6文字以上にしてください。');
                        break;
                    default:
                        setError('サインアップ中にエラーが発生しました。');
                }
                throw signUpError;
            }
            
            router.push("/main");
            router.refresh();
        } catch (error: any) {
            console.error('サインアップエラー:', error);
            if (!error.message) {
                setError('エラーが発生しました。詳細: ' + error.message); // エラーメッセージを設定
            }
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">サインアップ</h1>
            <form className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submit}>
                {error && <div className="text-red-500 mb-4">{error}</div>} {/* エラーメッセージの表示 */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-email">
                        メールアドレス
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="signup-email"
                        type="email"
                        placeholder="メールアドレス"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-password">
                        パスワード
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="signup-password"
                        type="password"
                        placeholder="パスワード"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'サインアップ中...' : 'サインアップ'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;
