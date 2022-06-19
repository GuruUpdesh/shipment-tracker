import React, { useState, useRef } from "react";

const ButtonBlack = ({onClick, className, children}) => {
    const [x, setX] = useState(-500)
    const [y, setY] = useState(-500)

    const ref = useRef()
	return <button className={"btn-black " + className} onClick={(e) => {
        let bounds = ref.current.getBoundingClientRect()
        setX(e.screenX - bounds.left)
        setY(e.clientY - bounds.top)
        onClick()
    }} ref={ref}>
        <div className="pulse" style={{"top": y, "left": x}}></div>
        {children}
    </button>;
};

export default ButtonBlack