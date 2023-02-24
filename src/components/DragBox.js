import React, { useEffect, useRef, useState } from 'react'

const DragBox = () => {
    const  boxRef=useRef(null);
    const  wrapperRef=useRef(null);
    const isClicked=useRef(false);
    const coords=useRef({
        startX:0,
        startY:0,
        lastX:0,
        lastY:0
    })
    const [x,setX]=useState(0);
    useEffect(()=>{
        
        if(!boxRef.current | wrapperRef.current) 
        {
            return;
        }
        console.log("hello")

        let box=boxRef.current;
        let Wrapper=wrapperRef.current;

        const onMousedown=(e)=>{
            console.log("onmousedown");
            console.log(box,Wrapper);
            
            isClicked.current=true;
            //inital position of the mouse when mouse is clicked
            coords.current.startX=e.clientX;
            coords.current.startY=e.clientY;
        }

        const onTouchdown=(e)=>{
            setX(e.touches[0].clientX);
            console.log("onTouchdown or end");
            console.log(box,Wrapper);
            isClicked.current=true;
            //inital position of the mouse when mouse is clicked
            coords.current.startX=e.touches[0].clientX;
            coords.current.startY=e.touches[0].clientY;
        }



        const onMouseUp=()=>{
            console.log("onmouseup");
            isClicked.current=false;
            //last position when mouseup is called 
            coords.current.lastX=box.offsetLeft;
            coords.current.lastY=box.offsetTop;
        }

        const onTouchUp=()=>{
            console.log("onTouchup");
            isClicked.current=false;
            //last position when mouseup is called 
            coords.current.lastX=box.offsetLeft;
            coords.current.lastY=box.offsetTop;
        }
        const onMouseMove=(e)=>{
            if(!isClicked.current) return;
            console.log("on mousemove");

            let nextX =e.clientX-coords.current.startX + coords.current.lastX;
            let nextY =e.clientY-coords.current.startY + coords.current.lastY;

            box.style.top=`${nextY}px`;
            box.style.left=`${nextX}px`;
            
        }


        const onTouchMove=(e)=>{
            if(!isClicked.current) return;
            console.log("on Touch move");

            let nextX =e.touches[0].clientX-coords.current.startX + coords.current.lastX;
            let nextY =e.touches[0].clientY-coords.current.startY + coords.current.lastY;

            box.style.top=`${nextY}px`;
            box.style.left=`${nextX}px`;
            
        }

        
        box.addEventListener("mouseup",onMouseUp);
        box.addEventListener("mousedown",onMousedown);
        Wrapper.addEventListener("mousemove",onMouseMove);
        Wrapper.addEventListener("mouseleave",onMouseUp);

        box.addEventListener('touchstart',onTouchdown);
        box.addEventListener("touchend",onMouseUp);
        Wrapper.addEventListener("touchmove",onTouchMove);

        const cleanUp=()=>{
            box.removeEventListener("mousedown",onMousedown);
            box.removeEventListener("mouseup",onMouseUp);
            Wrapper.removeEventListener("mousemove",onMouseMove);
            Wrapper.removeEventListener("mouseleave",onMouseUp);
            box.removeEventListener('touchstart',onTouchdown);
            box.removeEventListener("touchend",onMouseUp);
            Wrapper.removeEventListener("touchmove",onTouchMove);
            Wrapper.removeEventListener("touchcancel",onMouseUp);

        }
        
        return cleanUp;
    })
  return (
    <div>
        <div ref={wrapperRef} className="wrapper">
            <div ref={boxRef} className="box">
                <div className="boxhead">
                        header
                </div>
                <div className="boxbody" >
                        body
                        <p>lorems dfsfnsnd fojsndfjnsdiojfnsd
                            sndfijsndfjs ndjfns
                            sjindfsndfijn
                        </p>
                </div>
            </div>
            <h4 style={{
                textAlign:'right'
            }}>X--{x}</h4>
        </div>
    </div>
  )
}

export default DragBox
