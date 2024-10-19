'use client';
import { Button } from "../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../components/ui/sheet";
import MultiDropdowns from '../components/Dropdown_min'; // Adjust the import path as needed

export function SheetDemo({ isOpen, onClose }) {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
  };

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

          {/* Add Login with Google button */}
          <Button
            onClick={handleGoogleLogin}
            className="bg-black text-white hover:bg-gray-700"
          >
            Login with Google
          </Button>
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
