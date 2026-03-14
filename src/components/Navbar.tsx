import { useGetPathName } from "@/lib/utils"
import { useLocation } from "react-router-dom"

export function Navbar() {

    const location = useLocation()

    const pathName = useGetPathName({ path: location.pathname })

    return (
        <header className="flex items-center py-5 justify-between">
            <p className="text-lg text-secondary leading-[140%] font-semibold">{pathName}</p>
            <span className="size-9 rounded-full bg-primary"></span>
        </header>
    )
}