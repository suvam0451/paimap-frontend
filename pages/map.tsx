import Layout from '../components/Layout'
import InteractiveMap from "../components/InteractiveMap"
import {useState} from "react";

export default function MapModule() {
    const [zoomControl, setZoomControl] = useState(2)

    function updateZoom(val: number): void {
        if(zoomControl + val > 2) setZoomControl(2);
        else if(zoomControl + val < 0) setZoomControl(0);
        else setZoomControl(zoomControl + val);
    }

    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <div>
                <button onClick={() => {updateZoom(1) }}>Click to Zoom In</button>
                <button onClick={() => {updateZoom(-1)}}>Click to Zoom Out</button>
            </div>
            <InteractiveMap zoomLevel={zoomControl}/>
        </Layout>
    )
}