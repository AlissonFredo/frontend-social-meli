import ReturnTo from "../components/ReturnTo";
import CardFilterAscOrDesc from "../components/CardFilterAscOrDesc";

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
    const getLetrasIniciaisDoNomeESobrenome = (nome) => {
        return nome.trim().split(/\s+/).map((word) => word[0]).slice(0, 2).join("").toUpperCase()
    }

    return (
        <>
            <ReturnTo />

            <CardFilterAscOrDesc title = "Quem me segue" subtitle = "{8} seguidores" />

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