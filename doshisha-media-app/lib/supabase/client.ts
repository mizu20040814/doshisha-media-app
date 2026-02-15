import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * クライアントサイド用Supabaseクライアント。
 * ブラウザ環境ではシングルトンとして管理される。
 * 将来クライアント側からSupabaseを利用する場合に使用する。
 */
export function createSupabaseBrowserClient() {
    return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
