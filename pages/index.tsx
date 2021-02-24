import Link from 'next/link'
import Layout from '../components/Layout'
import {useMouseWheel} from 'react-use'
import {useEffect, useState} from "react";
import dynamic from "next/dynamic"
import Jumbotron from "react-bootstrap/Jumbotron"
import Button from "react-bootstrap/Button"

interface IWasm_Basic {
    add_one(num: number): number
}

interface IGoComponent {
    num: number
}

const GoComponent = dynamic<IGoComponent>({
    loader: async () => {
        // @ts-ignore
        const goModule: IWasm_Basic = await import("../add.wasm")
        return (props: IGoComponent) => <div>{goModule.add_one(props.num)}</div>
    }
})

function IndexPage() {
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
        <Layout title="Home | Next.js + TypeScript Example">
            <Jumbotron>
        <h1>Hello, world!</h1>
        <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
        </p>
        <p>
            <Button variant="primary">Learn more</Button>
        </p>
        </Jumbotron>
            <h1>Welcome to Genshin Toolkit 👋</h1>
            <p>
                <Link href="/about">
                    <a>About</a>
                </Link>
            </p>
            <GoComponent num={10}/>
        </Layout>
    )
}

export default IndexPage
