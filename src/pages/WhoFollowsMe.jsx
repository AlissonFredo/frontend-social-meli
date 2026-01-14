import { ArrowUpDown, ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import ReturnTo from "../components/ReturnTo";

const mockFollowers = [
    { id: "2", name: "Ana Costa" },
    { id: "3", name: "Bruno Santos" },
    { id: "4", name: "Carla Oliveira" },
    { id: "5", name: "Daniel Lima" },
    { id: "6", name: "Elena Souza" },
    { id: "7", name: "Fernando Alves" },
    { id: "8", name: "Gabriela Mendes" },
    { id: "9", name: "Henrique Rocha" },
]

export default function WhoFollowsMe() {
    const selectRef = useRef(null)
    const [isSelectOpen, setIsSelectOpen] = useState(false)
    const [sortOrder, setSortOrder] = useState("asc")

    const getLetrasIniciaisDoNomeESobrenome = (nome) => {
        return nome.trim().split(/\s+/).map((word) => word[0]).slice(0, 2).join("").toUpperCase()
    }

    return (
        <>
            <ReturnTo />

            <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Quem me segue</h1>
                        <p className="text-gray-500 mt-1">{8} seguidores</p>
                    </div>

                    <div className="relative w-full sm:w-48" ref={selectRef}>
                        <button
                            onClick={() => setIsSelectOpen(!isSelectOpen)}
                            className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#3483fa]"
                        >
                            <span className="flex items-center gap-2 text-gray-700">
                                <ArrowUpDown className="h-4 w-4" />
                                {sortOrder === "asc" ? "Nome A-Z" : "Nome Z-A"}
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
                                    Nome A-Z
                                </button>
                                <button
                                    onClick={() => {
                                        setSortOrder("desc")
                                        setIsSelectOpen(false)
                                    }}
                                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${sortOrder === "desc" ? "bg-gray-50 text-[#3483fa]" : "text-gray-700"}`}
                                >
                                    Nome Z-A
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm divide-y">
                {mockFollowers.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">Nenhum seguidor encontrado</div>
                ) : (
                    mockFollowers.map((follower) => (
                        <div key={follower.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                            <div className="h-12 w-12 rounded-full bg-[#3483fa] flex items-center justify-center overflow-hidden">
                                <div className="h-8 w-8 rounded-full bg-[#3483fa] flex items-center justify-center text-white font-medium">
                                    {getLetrasIniciaisDoNomeESobrenome(follower.name)}
                                </div>
                                <span className="hidden text-white font-medium">{follower.name.charAt(0)}</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900">{follower.name}</h3>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}