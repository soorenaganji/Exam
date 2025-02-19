"use client";
import { useEffect , useState } from "react";
import { useRouter } from "next/navigation";
export default function HomePage() {
  const router = useRouter();
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  useEffect(() => {
    if(isSessionStarted)    router.push("/exam");
  }, [router , isSessionStarted]);

  return (
    <>
      <div
        className={
          isSessionStarted
            ? "hidden"
            : "w-full flex items-start justify-center mt-16"
        }
      >
        <button
          className="w-36 mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
          onClick={() => setIsSessionStarted(true)}
        >
          Start
        </button>
      </div>
    </>
  ); // Return null since we are redirecting
}
