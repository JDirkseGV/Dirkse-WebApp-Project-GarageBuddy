import LeftBar from "@/components/LeftBar"
import NewCar from "@/components/NewCar"

export default function GaragePage() {
    return (
        <div className="flex">
            <LeftBar />
            <div>
                <NewCar />
                <p className="text-white px-4 text-5xl">Your Vehicles: </p>   
            </div>
            
        </div>
    )
}