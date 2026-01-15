import { useEffect, useState } from "react";
import CardFilterAscOrDesc from "../components/CardFilterAscOrDesc";
import ReturnTo from "../components/ReturnTo";
import { Utils } from "../utils";
import { useUser } from "../contexts/UsersContext";
import { getVendedoresSeguidosPorUsuario, unfollowSeller } from "../services/userService";

export default function WhoDoIFollow() {
    const { selectedUser } = useUser();
    const [order, setOrder] = useState("asc")
    const [seguidos, setSeguidos] = useState([])

    const fetchVendedoresSeguidosPorUsuario = async () => {
        const data = await getVendedoresSeguidosPorUsuario(selectedUser.id, order);
        setSeguidos(data.followed)
    }

    useEffect(() => {
        fetchVendedoresSeguidosPorUsuario()
    }, [selectedUser, order])

    const unfollow = async (buyerId, sellerId) => {
        const data = await unfollowSeller(buyerId, sellerId);
        if (data == "sucesso") fetchVendedoresSeguidosPorUsuario()
    }

    return (
        <>
            <ReturnTo />

            <CardFilterAscOrDesc
                title="Quem eu sigo"
                subtitle={`(${seguidos.length}) vendedores seguidos`}
                sortOrder={order}
                onSortOrderChange={(newOrder) => setOrder(newOrder)}
            />

            <div className="bg-white rounded-lg shadow-sm divide-y">
                {seguidos.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">Nenhum seguido encontrado</div>
                ) : (
                    seguidos.map((seguido) => (
                        <div key={seguido.userId} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                            <div className="h-12 w-12 rounded-full bg-[#3483fa] flex items-center justify-center overflow-hidden">
                                <div className="h-8 w-8 rounded-full bg-[#3483fa] flex items-center justify-center text-white font-medium">
                                    {Utils.getLetrasIniciaisDoNomeESobrenome(seguido.userName)}
                                </div>
                                <span className="hidden text-white font-medium">{seguido.userName.charAt(0)}</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900">{seguido.userName}</h3>
                            </div>

                            <button
                                onClick={() => unfollow(selectedUser.id, seguido.userId)}
                                className="px-4 py-2 text-sm text-[#3483fa] border border-[#3483fa] rounded-lg hover:bg-[#3483fa] hover:text-white transition-colors"
                            >
                                Deixar de seguir
                            </button>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}