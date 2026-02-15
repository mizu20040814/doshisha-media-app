import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * サーバーサイド用Supabaseクライアントを生成する関数。
 * API routeやServer Componentで使用する。
 * リクエストごとに新しいクライアントを生成し、状態の漏洩を防ぐ。
 */
export function createSupabaseServerClient() {
    return createClient(supabaseUrl, supabaseAnonKey);
}
