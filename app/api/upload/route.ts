import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";



export async function POST(request: NextRequest){
try {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json()
    const { imagekit, userId: bodyUserId} = body

    if (!imagekit || !bodyUserId) {
        return NextResponse.json({ error: "Invalid file upload data" }, { status: 400 });
    }

    const fileData ={
        name: imagekit.name || "Untitled",
        path: imagekit.filePath || `/stashly/${userId}/${imagekit.name}`,
        size: imagekit.size || 0,
      type: imagekit.fileType || "image",
      fileUrl: imagekit.url,
      thumbnailUrl: imagekit.thumbnailUrl || null,
       userId: userId,
      parentId: null,
      isFolder: false,
      isStarred: false,
      isTrash: false,
    }

    const [newFile] = await db.insert(files).values(fileData).returning()
    return NextResponse.json(newFile)

} catch (error) {
     console.error("Error saving file:", error);
    return NextResponse.json(
      { error: "Failed to save file information" },
      { status: 500 }
    );
}
}