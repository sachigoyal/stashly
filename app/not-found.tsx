import Link from "next/link"
import { FileX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background/30">
      <Card className="w-full max-w-md border shadow-sm bg-card/50 rounded-lg overflow-hidden">
        <CardContent className="pt-8 pb-6 flex flex-col items-center text-center space-y-4">
          <div className="rounded-full bg-muted/50 p-4">
            <FileX className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-xl text-muted-foreground">Page not found</p>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            The page you are looking for might have been removed or is temporarily unavailable.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center pb-8">
          <Button className="w-full max-w-xs" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
