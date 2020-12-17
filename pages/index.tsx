import Link from 'next/link'
import Layout from '../components/Layout'
import {useMouseWheel} from 'react-use'
import {useEffect, useState} from "react";
import dynamic from "next/dynamic"
import TeyvatMap from "../components/TeyvatMap"
import TableExample from "../components/ReactTableExample"

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
    // const scrollRef = useRef(null);
    // const {x, y} = useScroll(scrollRef);
    const mouseWheel = useMouseWheel();
    const imageDims = {X: 500, Y: 500}
    const [prevZoom, setPrevZoom] = useState(0)
    const [zoomControl, setZoomControl] = useState(2)

    function updateZoom(val: number): void {
        if(zoomControl + val > 2) setZoomControl(2);
        else if(zoomControl + val < 0) setZoomControl(0);
        else setZoomControl(zoomControl + val);
    }

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
            <h1>Hello Next.js 👋</h1>
            <TableExample />
            <div>
                <button onClick={() => {updateZoom(1) }}>Click to Zoom In</button>
                <button onClick={() => {updateZoom(-1)}}>Click to Zoom Out</button>
            </div>
            <TeyvatMap zoomLevel={zoomControl}/>
            <p>
                <Link href="/about">
                    <a>About</a>
                </Link>
            </p>
            <div className={"artifact green"}></div>
            <GoComponent num={10}/>
            {/*  <div ref={scrollRef}>*/}
            {/*      <Image*/}
            {/*          layout={"responsive"}*/}
            {/*          src={"/assets/Teyvat.png"}*/}
            {/*          alt={"MAp pic"}*/}
            {/*          width={imageDims.X}*/}
            {/*          height={imageDims.Y}*/}
            {/*      />*/}
            {/*      <div className={"box"} >*/}
            {/*          <h1>Mountains</h1>*/}
            {/*      </div>*/}
            {/*  </div>*/}
        </Layout>
    )
}

export default IndexPage
