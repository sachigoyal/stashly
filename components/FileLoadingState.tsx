"use client"
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

export default function FileLoadingState() {
  return (
    <div className="space-y-6 bg-background/30 rounded-xl shadow-sm p-4 border">
      {/* Tabs skeleton */}
      <div className="flex space-x-1 border-b pb-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="w-24 h-9 rounded-md" />
        ))}
      </div>

      {/* Folder navigation skeleton */}
      <div className="mt-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>

      {/* Action buttons skeleton */}
      <div className="mt-4 flex space-x-2">
        <Skeleton className="h-10 w-32 rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      <Separator className="my-4" />

      {/* Files table skeleton */}
      <Card className="border bg-card/50 overflow-hidden shadow-sm rounded-lg py-0">
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader className="sticky top-0 z-10">
              <TableRow className="bg-muted/50">
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Type</TableHead>
                <TableHead className="hidden md:table-cell">Size</TableHead>
                <TableHead className="hidden sm:table-cell">Added</TableHead>
                <TableHead className="w-60 md:w-[300px] lg:w-[350px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(5).fill(0).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-md" />
                      <div>
                        <Skeleton className="h-5 w-[150px] sm:w-[200px] md:w-[300px]" />
                        <Skeleton className="h-4 w-24 mt-1 sm:hidden" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div>
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-32 mt-1" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Skeleton className="h-9 w-9 rounded-md" />
                      <Skeleton className="h-9 w-9 rounded-md" />
                      <Skeleton className="h-9 w-9 rounded-md" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

