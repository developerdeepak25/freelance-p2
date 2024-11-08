import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 px-7">
        <h1 className="text-9xl font-bold text-gray-800 text-center">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 text-center">
          Page Not Found
        </h2>
        <p className="text-gray-500 max-w-md mx-auto text-center">
          Oops! The page you are looking for might have been removed or is
          temporarily unavailable.
        </p>
        <Link href={"/"} className="flex items-center gap-2 justify-center">
          <Button>Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
