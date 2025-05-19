"use client";

import { Folder, FileText, Video, Music, File as LucideFile } from "lucide-react";
import { IKImage,} from "imagekitio-next";
import { files } from "@/lib/db/schema";
import { InferSelectModel } from "drizzle-orm";

type FileType = InferSelectModel<typeof files>;

interface FileIconProps {
  file: FileType;
}

export default function FileIcon({ file }: FileIconProps) {
  // Define the ImageKit endpoint URL
  const urlEndpoint = "https://ik.imagekit.io/sachi";

  if (file.isFolder) return <Folder className={`h-5 w-5 text-blue-500`} />;

  const fileType = file.type.split("/")[0];
  
  switch (fileType) {
    case "image":
      return (
        <div className="h-5 w-5 relative overflow-hidden rounded">          {file.thumbnailUrl ? (
           
              <IKImage
                path={file.path}
                transformation={[
                  {
                    height: 20,
                    width: 20,
                    focus: "auto",
                    quality: 80,
                    dpr: 2,
                  },
                ]}
                loading="lazy"
                lqip={{ active: true }}
                alt={file.name}
                style={{ objectFit: "cover", height: "100%", width: "100%" }}
              />
           
          ) : (
            <LucideFile className={`h-5 w-5 text-blue-500`} />
          )}
        </div>
      );
    case "application":
      if (file.type.includes("pdf")) {
        return <FileText className={`h-5 w-5 text-red-500`} />;
      }
      return <FileText className={`h-5 w-5 text-orange-500`} />;
    case "video":
      return <Video className={`h-5 w-5 text-purple-500`} />;
    case "audio":
      return <Music className={`h-5 w-5 text-green-500`} />;
    default:
      return <LucideFile className={`h-5 w-5 text-gray-500`} />;
  }
}