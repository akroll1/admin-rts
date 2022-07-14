import { useEffect, useState } from "react"

export function useWindowResize(){
    const [windowWidth, setWindowWidth] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }
        handleResize();
        
        window.addEventListener('resize', handleResize);
        handleResize();
        
        return () => window.removeEventListener('resize', handleResize);
    },[window.innerWidth]);
    return windowWidth;
}