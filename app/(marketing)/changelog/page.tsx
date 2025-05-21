import { History, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Changelog() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 min-h-screen">
      <div className="text-center mb-12">
        <div className="mx-auto bg-muted/50 w-12 h-12 rounded-full flex items-center justify-center icon-gradient">
          <History className="h-6 w-6" />
        </div>
        <h1 className="mt-4 text-xl md:text-2xl lg:text-3xl font-bold font-heading">Changelog</h1>
        <p className="mt-2 max-w-md mx-auto text-muted-foreground">
          Track the evolution of Stashly with our detailed version history.
        </p>
      </div>

      <div className="border bg-card/50 overflow-hidden shadow-sm rounded-lg p-6">
        <div className="space-y-10">
          {/* Version 0.1.0 */}
          <div className="relative pl-8 border-l-2 border-primary/30">
            <div className="absolute -left-4 -top-2">
              <div className="bg-card p-2 rounded-full icon-gradient">
                <Tag size={14} />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
              <h2 className="text-xl font-semibold font-heading tracking-tight">Version 0.1.0</h2>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-muted-foreground" />
                <time className="text-sm text-muted-foreground">May 23, 2024</time>
                <Badge>Initial Release</Badge>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              The first release of Stashly, featuring the core functionality for personal image storage.
            </p>
            <div className="pl-4 border-l border-muted space-y-4">
              <div>
                <h3 className="font-medium mb-2 text-primary">Core Features</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-2">
                  <li>Upload images</li>
                  <li>Delete images</li>
                  <li>View images</li>
                  <li>Star images</li>
                  <li>Trash images</li>
                  <li>Empty trash</li>
                  <li>Download images</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2 text-primary">UI/UX</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-2">
                  <li>Responsive design for mobile and desktop</li>
                  <li>Dark and light mode support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}