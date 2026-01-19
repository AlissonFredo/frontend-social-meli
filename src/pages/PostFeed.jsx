import { Heart, MessageCircle, Share2 } from "lucide-react";
import ReturnTo from "../components/ReturnTo";
import CardFilterAscOrDesc from "../components/CardFilterAscOrDesc";
import { useEffect, useState } from "react";
import { Utils } from "../utils";
import { getPublicacoesRecentes } from "../services/productService";
import { useUser } from "../contexts/UsersContext";

export default function PostFeed() {
    const { selectedUser } = useUser();
    const [order, setOrder] = useState("desc")
    const [posts, setPosts] = useState([])

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

    const fetchPublicacoesRecentes = async () => {
        const data = await getPublicacoesRecentes(selectedUser.id, order);
        console.log(data);
        setPosts(data.posts)
    }

    useEffect(() => {
        fetchPublicacoesRecentes()
    }, [selectedUser, order])

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
                {posts.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm divide-y">
                        <div className="p-8 text-center text-gray-500">Nenhuma postagem encontrada</div>
                    </div>
                ) : (
                    posts.map((post, key) => (
                        <article key={key} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-4 flex items-center gap-3 border-b">
                                <div className="h-10 w-10 rounded-full bg-[#3483fa] flex items-center justify-center overflow-hidden">
                                    <div className="h-8 w-8 rounded-full bg-[#3483fa] flex items-center justify-center text-white font-medium">
                                        {Utils.getLetrasIniciaisDoNomeESobrenome(post.seller.userName)}
                                    </div>

                                    <span className="hidden text-white font-medium">{post.seller.userName.charAt(0)}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900">{post.seller.userName}</h3>
                                    <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="flex gap-4">
                                    <img
                                        src={"https://picsum.photos/256/256"}
                                        alt={post.product.productName}
                                        className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                                    />

                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-gray-900 line-clamp-2 mb-2">{post.product.productName}</h4>
                                        <div className="space-y-1">
                                            <p className="text-2xl font-semibold text-gray-900">{formatPrice(post.price)}</p>
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
                    ))
                )}
            </div>
        </>
    )
}