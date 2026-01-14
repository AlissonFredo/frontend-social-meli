import { Calendar, ChevronDown, Heart, MessageCircle, Share2, Truck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReturnTo from "../components/ReturnTo";

export default function PostFeed() {
    const [isSelectOpen, setIsSelectOpen] = useState(false)
    const [sortOrder, setSortOrder] = useState("desc")
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

    function formatDate(date) {
        const targetDate = date instanceof Date ? date : new Date(date)

        const now = new Date()
        const diffTime = Math.abs(now.getTime() - targetDate.getTime())
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays === 0) return "Hoje"
        if (diffDays === 1) return "Ontem"
        if (diffDays < 7) return `Há ${diffDays} dias`
        return targetDate.toLocaleDateString("pt-BR")
    }

    function formatPrice(price) {
        return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    }

    const getLetrasIniciaisDoNomeESobrenome = (nome) => {
        return nome.trim().split(/\s+/).map((word) => word[0]).slice(0, 2).join("").toUpperCase()
    }

    return (
        <>
            <ReturnTo />

            <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Feed de publicações</h1>
                        <p className="text-gray-500 mt-1">Novidades dos vendedores que você segue</p>
                    </div>

                    <div className="relative w-full sm:w-48" ref={selectRef}>
                        <button
                            onClick={() => setIsSelectOpen(!isSelectOpen)}
                            className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#3483fa]"
                        >
                            <span className="flex items-center gap-2 text-gray-700">
                                <Calendar className="h-4 w-4" />
                                {sortOrder === "desc" ? "Mais recentes" : "Mais antigos"}
                            </span>
                            <ChevronDown
                                className={`h-4 w-4 text-gray-400 transition-transform ${isSelectOpen ? "rotate-180" : ""}`}
                            />
                        </button>

                        {isSelectOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                <button
                                    onClick={() => {
                                        setSortOrder("desc")
                                        setIsSelectOpen(false)
                                    }}
                                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${sortOrder === "desc" ? "bg-gray-50 text-[#3483fa]" : "text-gray-700"}`}
                                >
                                    Mais recentes
                                </button>
                                <button
                                    onClick={() => {
                                        setSortOrder("asc")
                                        setIsSelectOpen(false)
                                    }}
                                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${sortOrder === "asc" ? "bg-gray-50 text-[#3483fa]" : "text-gray-700"}`}
                                >
                                    Mais antigos
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <article
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                    <div className="p-4 flex items-center gap-3 border-b">
                        <div className="h-10 w-10 rounded-full bg-[#3483fa] flex items-center justify-center overflow-hidden">
                            <div className="h-8 w-8 rounded-full bg-[#3483fa] flex items-center justify-center text-white font-medium">
                                {getLetrasIniciaisDoNomeESobrenome("Tech Store BR")}
                            </div>

                            <span className="hidden text-white font-medium">{"Tech Store BR".charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{"Tech Store BR"}</h3>
                            <p className="text-sm text-gray-500">{formatDate("2026-01-12T10:30:00")}</p>
                        </div>
                    </div>

                    <div className="p-4">
                        <div className="flex gap-4">
                            <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 line-clamp-2 mb-2">{"iPhone 15 Pro Max 256GB - Titânio Natural"}</h4>
                                <div className="space-y-1">
                                    {/* {post.product.originalPrice && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-500 line-through">
                                                {formatPrice(post.product.originalPrice)}
                                            </span>
                                            <span className="bg-[#00a650] text-white text-xs px-2 py-0.5 rounded">
                                                {calculateDiscount(post.product.originalPrice, post.product.price)}% OFF
                                            </span>
                                        </div>
                                    )} */}
                                    <p className="text-2xl font-semibold text-gray-900">{formatPrice(8999.0)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 py-3 border-t flex items-center gap-6">
                        <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                            <Heart className="h-5 w-5" />
                            <span className="text-sm">{200}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-500 hover:text-[#3483fa] transition-colors">
                            <MessageCircle className="h-5 w-5" />
                            <span className="text-sm">{25}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-500 hover:text-[#3483fa] transition-colors">
                            <Share2 className="h-5 w-5" />
                            <span className="text-sm">Compartilhar</span>
                        </button>
                    </div>
                </article>
            </div>
        </>
    )
}