"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background/30">
      <Card className="w-full max-w-md border shadow-sm bg-card/50 rounded-lg overflow-hidden">
        <CardContent className="pt-8 pb-6 flex flex-col items-center text-center space-y-4">
          <div className="rounded-full bg-muted/50 p-4">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">500</h1>
            <p className="text-xl text-muted-foreground">Server Error</p>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Something went wrong on our server. We&apos;re working to fix the issue.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center pb-8">
          <Button className="w-full sm:w-auto" onClick={reset}>
            <RefreshCw className="mr-2 h-4 w-4" />Try Again
          </Button>
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
