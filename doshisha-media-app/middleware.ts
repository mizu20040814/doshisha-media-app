import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(_req){
        return NextResponse.next()
    },
    {
        pages: {
            signIn: '/admin/login',  // ログインページを指定
        },
        callbacks:{
            authorized:({req,token}) =>{
                const path = req.nextUrl.pathname;
                
                // /admin/loginは認証不要
                if(path === '/admin/login'){
                    return true;
                }
                
                // その他の/admin配下は認証必須
                if(path.startsWith('/admin')){
                    return token !== null;
                }
                
                return true;
            }
        }
    }
)

export const config = {
    matcher: ['/admin/:path*']
}
