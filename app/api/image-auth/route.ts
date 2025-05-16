import ImageKit from "imagekit";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";


const imagkit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
});

export async function GET() {
    
try {
      const { userId } = await auth();
      if(!userId){
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
      }
      const authParams = imagkit.getAuthenticationParameters();
      return NextResponse.json(authParams)
} catch (error) {
   return NextResponse.json({error:"Failed to generate the authentication for imagekit"}, {status: 500})   
}
}
