import Link from 'next/link'
import Layout from '../components/Layout'
import {useMouseWheel} from "react-use";
import {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Custom Components
import FileBrowser from "../components/fileUploader"

function AdminPage() {
    const mouseWheel = useMouseWheel();
    const imageDims = {X: 500, Y: 500}
    const [prevZoom, setPrevZoom] = useState(0)

    useEffect(() => {
        let zoomRate = 200
        let delta = mouseWheel - prevZoom;
        console.log("User scrolled alongY axis", mouseWheel)
        imageDims.X += zoomRate * delta
        imageDims.Y += zoomRate * delta
        setPrevZoom(prevZoom + delta)
    }, [mouseWheel]);

    return (
        <Layout title="Admin Console">
            <i className={"fab fa-react"}></i>
            <FontAwesomeIcon icon={['fas', 'home']} />
            <FileBrowser/>
        </Layout>
    )
}

export default AdminPage