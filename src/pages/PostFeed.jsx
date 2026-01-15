import { Heart, MessageCircle, Share2 } from "lucide-react";
import ReturnTo from "../components/ReturnTo";
import CardFilterAscOrDesc from "../components/CardFilterAscOrDesc";
import { useState } from "react";

export default function PostFeed() {
    const [order, setOrder] = useState("desc")

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

            <CardFilterAscOrDesc
                title="Feed de publicações"
                subtitle="Novidades dos vendedores que você segue"
                type="date"
                sortOrder={order}
                onSortOrderChange={(newOrder) => setOrder(newOrder)}
            />

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