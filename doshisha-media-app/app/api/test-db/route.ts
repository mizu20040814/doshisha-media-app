import { NextResponse } from "next/server";
import {supabase} from "@/lib/supabase";

export async function GET() {
    // testData
    try{
        const testPost = {
            title:'テスト記事',
            content:'これはテスト記事です。',
            category: 'news',
            status: 'draft',
        }
        // データ挿入テスト
        const {data:insertData,error:insertError} = await supabase
            .from('posts')
            .insert([testPost])
            .select();
        
        if(insertError){
            return NextResponse.json({
                error:'挿入エラー',
                details: insertError.message
            },{status: 500})
        }

        // データ取得テスト
        const {data:posts,error:fetchError} = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if(fetchError){
            return NextResponse.json({
                error:'取得エラー',
                details: fetchError.message
            },{status: 500})
        }

        // 挿入データの削除
        if(insertData && insertData[0]){
            await supabase
                .from('posts')
                .delete()
                .eq('id', insertData[0].id);
        }

        return NextResponse.json({
            success:true,
            message:'データベース接続成功',
            testResult:{
                inserted: insertData,
                totalPosts:posts?.length || 0
            }
        })
    }catch(error){
        return NextResponse.json({
            message:'データベース接続失敗',
            details: error
        },{status: 500})
    }

}
