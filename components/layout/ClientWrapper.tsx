"use client";

import { useState } from "react";
import Preloader from "@/components/animations/Preloader";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <div className="h-screen w-screen bg-black relative">
        <Preloader onFinish={() => setIsLoaded(true)} isShown={!isLoaded} />
        {isLoaded ? children : null}
      </div>
    </>
  );
}
