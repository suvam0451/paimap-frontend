import React, {useEffect, useRef, useState} from 'react'
import Image from "next/image";
// import Link from 'next/link'

type ITeyvatMapProps = {
    zoomLevel: number
}

export default function InteractiveMap({zoomLevel}: ITeyvatMapProps) {
    const [zoomState, setZoomState] = useState(1)
    const [squareSize, setSquareSize] = useState(1024)
    const [isInit, setIsInit] = useState(true)
    const [dragState, setDragState] = useState({
        x_cursor: 0,
        y_cursor: 0,
        x_img_ele: 0,
        y_img_ele: 0
    })
    const draggableRef = useRef<HTMLDivElement>(null)

    const start_drag = () => {
        setDragState(
            {
                ...dragState,
                x_img_ele: document.getElementById("draggable-container")!.offsetLeft,
                y_img_ele: document.getElementById("draggable-container")!.offsetTop
            })
    };

    const while_drag = ({clientX: x_cursor, clientY: y_cursor}: MouseEvent) => {
        draggableRef.current!.style.left = (x_cursor - dragState.x_img_ele) + 'px'
        draggableRef.current!.style.top = (y_cursor - dragState.y_img_ele) + 'px'
    };

    function stop_drag() {

    }

    useEffect(() => {
        if (isInit) {
            document.getElementById("draggable-container")!.addEventListener("mousedown", start_drag)
            document.getElementById("draggable-container")!.addEventListener("mousemove", while_drag)
            document.getElementById("draggable-container")!.addEventListener("mouseup", stop_drag)
            setIsInit(false)
        }
        setZoomState(zoomLevel)
        switch (zoomState) {
            case 0:
                setSquareSize(1024);
                break;
            case 1:
                setSquareSize(512);
                break;
            case 2:
                setSquareSize(256);
                break;
            default:
                break;
        }
    }, [zoomLevel])

    const zoomConfig = [
        {level: 1, containerCSS: "map_container_01", images: ["/assets/Teyvat_01_001.png"]}, {
            level: 2, containerCSS: "map_container_02", images: ["/assets/Teyvat_02_01.png",
                "/assets/Teyvat_02_02.png", "/assets/Teyvat_02_03.png", "/assets/Teyvat_02_04.png"]
        }, {
            level: 3, containerCSS: "map_container_03", images: [
                "/assets/Teyvat_03_001.png",
                "/assets/Teyvat_03_002.png",
                "/assets/Teyvat_03_003.png",
                "/assets/Teyvat_03_004.png",
                "/assets/Teyvat_03_005.png",
                "/assets/Teyvat_03_006.png",
                "/assets/Teyvat_03_007.png",
                "/assets/Teyvat_03_008.png",
                "/assets/Teyvat_03_009.png",
                "/assets/Teyvat_03_010.png",
                "/assets/Teyvat_03_011.png",
                "/assets/Teyvat_03_012.png",
                "/assets/Teyvat_03_013.png",
                "/assets/Teyvat_03_014.png",
                "/assets/Teyvat_03_015.png",
                "/assets/Teyvat_03_016.png"
            ]
        }
    ]

    return (
        <div>
            <h1>Current zoom level {zoomLevel}</h1>
            <div id={"draggable-container"} ref={draggableRef}>
                <div className={zoomConfig[zoomState].containerCSS}>
                    {zoomConfig[zoomState].images.map((ele) =>
                        <div>
                            <Image
                                alt="1"
                                src={ele}
                                layout="responsive"
                                width={squareSize}
                                height={squareSize}
                                // objectFit="cover"
                                // quality={100}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
