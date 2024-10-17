'use client'
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import Link from "next/link"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../components/ui/sheet";
import MultiDropdowns from '../components/Dropdown_min'; // Adjust the import path as needed
import { useState } from "react";

export function SheetDemo({ isOpen, onClose }) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="p-4">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
          <SheetDescription>
            {/* Optional description */}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 mt-4">
          {/* MultiDropdowns component */}
          <MultiDropdowns />

          {/* Login and Signup Buttons */}
          <div className="flex gap-2 mt-4">
          <Link href="/auth/login">
          <button
            type="button"
            className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Log In
          </button>
        </Link>

        <Link href= "auth/signup">
        <Button className="w-full rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" variant="primary">
              Sign Up
            </Button></Link>
            
            
          </div>
        </div>

        <SheetFooter>
          <Button type="button" onClick={onClose} variant="outline">
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default SheetDemo;
