import LogoPage from "./pages/LogoPage"
import HomePage from "./pages/HomePage"
import { useEffect, useState } from "react"

function App()
{
    const [isLogoVisiable, setLogoVisiable] = useState(true)

    useEffect(() => { 
        const timer = setTimeout(() => {
            setLogoVisiable(false);
        }, 2000);
    
        return () => clearTimeout(timer);
      }, []);

    return (
        <div>
            {isLogoVisiable ? <LogoPage /> : <HomePage />}
        </div>
    )
}

export default App
