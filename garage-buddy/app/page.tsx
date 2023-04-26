
import AccelerationCard from "@/components/AccelerationCard";
import GarageCard from "@/components/GarageCard";
import HorsepowerCard from "@/components/HorsepowerCard";
import WeightCard from "@/components/WeightCard";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Router } from "next/router";
import { useEffect } from "react";

export default function HomePage() {

  return (
    <div className="flex flex-col h-screen w-screen">
      <div id="carContent" className="flex flex-wrap justify-center ">
        <GarageCard></GarageCard>
      </div>
      <div id="modelsArea" className="flex flex-wrap justify-center">
        <AccelerationCard path={"acceleration"}></AccelerationCard>
        <HorsepowerCard path={"horsepower"}></HorsepowerCard>
        <WeightCard path={"weight"}></WeightCard>
      </div>
      
    </div>
    
    )
  }

