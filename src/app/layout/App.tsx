import { EventDashboard } from "../../features/events/dashboard/EventDashboard"
import Navbar from "./Navbar"

function App() {

    return (
        <div>
            <Navbar />
            <div className="container mx-auto px-10 mt-24">
                <EventDashboard />
            </div>
        </div>
    )
}

export default App
