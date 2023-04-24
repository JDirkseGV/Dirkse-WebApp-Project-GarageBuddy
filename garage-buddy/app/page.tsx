
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Router } from "next/router";
import { useEffect } from "react";

export default function HomePage() {

  return (
    <div className="flex flex-col h-screen w-screen">
      <div id="modelsArea" className="border flex">
        <p className="text-white px-4">Model area</p>
        <AccelerationCard></AccelerationCard>
        <HorsepowerCard></HorsepowerCard>
        <WeightCard></WeightCard>
      </div>
      <div id="carContent" className="flex border">
        <p className="text-white px-4">Cool Car Homepage with link card to "your garage"</p>
      </div>
    </div>
    
    )
  }

