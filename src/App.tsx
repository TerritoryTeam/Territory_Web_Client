import LogoPage from "./pages/LogoPage"
import Home from "./pages/Home"
import { useEffect, useState } from "react"

function App()
{
    const [isLogoVisiable, setLogoVisiable] = useState(true)

    useEffect(() => { 
        const timer = setTimeout(() => {
            setLogoVisiable(false);
        }, 3000);
    
        return () => clearTimeout(timer);
      }, []);

    return (
        <div>
            {isLogoVisiable ? <LogoPage /> : <Home />}
        </div>
    )
}

export default App
