import ReturnTo from "../components/ReturnTo";
import CardFilterAscOrDesc from "../components/CardFilterAscOrDesc";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UsersContext";
import { getSeguidoresDoVendedor } from "../services/userService";

export default function WhoFollowsMe() {
    const { selectedUser } = useUser();
    const [order, setOrder] = useState("asc")
    const [seguidores, setSeguidores] = useState([])

    const getLetrasIniciaisDoNomeESobrenome = (nome) => {
        return nome.trim().split(/\s+/).map((word) => word[0]).slice(0, 2).join("").toUpperCase()
    }

    useEffect(() => {
        const fetchSeguidoresDoVendedor = async () => {
            const data = await getSeguidoresDoVendedor(selectedUser.id, order);
            setSeguidores(data.followers)
        }

        fetchSeguidoresDoVendedor()
    }, [selectedUser, order])

    return (
        <>
            <ReturnTo />

            <CardFilterAscOrDesc
                title="Quem me segue"
                subtitle={`(${seguidores.length}) seguidores`}
                sortOrder={order}
                onSortOrderChange={(newOrder) => setOrder(newOrder)}
            />

            <div className="bg-white rounded-lg shadow-sm divide-y">
                {seguidores.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">Nenhum seguidor encontrado</div>
                ) : (
                    seguidores.map((seguidor) => (
                        <div key={seguidor.userId} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                            <div className="h-12 w-12 rounded-full bg-[#3483fa] flex items-center justify-center overflow-hidden">
                                <div className="h-8 w-8 rounded-full bg-[#3483fa] flex items-center justify-center text-white font-medium">
                                    {getLetrasIniciaisDoNomeESobrenome(seguidor.userName)}
                                </div>
                                <span className="hidden text-white font-medium">{seguidor.userName.charAt(0)}</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900">{seguidor.userName}</h3>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}