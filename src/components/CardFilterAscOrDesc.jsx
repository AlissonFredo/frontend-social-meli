import { ArrowUpDown, Calendar, ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function CardFilterAscOrDesc({ title = "", subtitle = "", type = "name", order = "asc" }) {
    const [isSelectOpen, setIsSelectOpen] = useState(false)
    const [sortOrder, setSortOrder] = useState(order)
    const selectRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsSelectOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
                    <p className="text-gray-500 mt-1">{subtitle}</p>
                </div>

                <div className="relative w-full sm:w-48" ref={selectRef}>
                    <button
                        onClick={() => setIsSelectOpen(!isSelectOpen)}
                        className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#3483fa]"
                    >
                        <span className="flex items-center gap-2 text-gray-700">
                            {type == "name" ? (<><ArrowUpDown className="h-4 w-4" />{sortOrder === "asc" ? "Nome A-Z" : "Nome Z-A"}</>) : ""}
                            {type == "date" ? (<><Calendar className="h-4 w-4" />{sortOrder === "desc" ? "Mais recentes" : "Mais antigos"}</>) : ""}
                        </span>
                        <ChevronDown
                            className={`h-4 w-4 text-gray-400 transition-transform ${isSelectOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {isSelectOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                            <button
                                onClick={() => {
                                    setSortOrder("asc")
                                    setIsSelectOpen(false)
                                }}
                                className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${sortOrder === "asc" ? "bg-gray-50 text-[#3483fa]" : "text-gray-700"}`}
                            >
                                {type == "name" ? "Nome A-Z" : ""}
                                {type == "date" ? "Mais antigos" : ""}
                            </button>
                            <button
                                onClick={() => {
                                    setSortOrder("desc")
                                    setIsSelectOpen(false)
                                }}
                                className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${sortOrder === "desc" ? "bg-gray-50 text-[#3483fa]" : "text-gray-700"}`}
                            >
                                {type == "name" ? "Nome Z-A" : ""}
                                {type == "date" ? "Mais recentes" : ""}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}