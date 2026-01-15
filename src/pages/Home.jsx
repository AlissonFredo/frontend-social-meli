import { ChevronRight, Newspaper, PlusCircle, UserCheck, Users } from "lucide-react"
import { Link } from "react-router"
import { useUser } from "../contexts/UsersContext";

export default function Home() {
    const { selectedUser } = useUser();

    const getLetrasIniciaisDoNomeESobrenome = (nome) => {
        return nome.trim().split(/\s+/).map((word) => word[0]).slice(0, 2).join("").toUpperCase()
    }

    const menuItems = [
        {
            title: "Quem me segue",
            description: "Veja quem está seguindo você",
            icon: Users,
            href: `/users/${selectedUser && selectedUser.id}/followers`,
            count: 0,
            isDisabled: selectedUser && selectedUser.tipo == "SELLER"
        },
        {
            title: "Quem eu sigo",
            description: "Vendedores que você acompanha",
            icon: UserCheck,
            href: `/users/${selectedUser && selectedUser.id}/followed`,
            count: 0,
            isDisabled: selectedUser && selectedUser.tipo == "BUYER"
        },
        {
            title: "Feed de publicações",
            description: "Novidades dos vendedores seguidos",
            icon: Newspaper,
            href: `/users/${selectedUser && selectedUser.id}/feed`,
            isDisabled: selectedUser && selectedUser.tipo == "BUYER"
        },
        {
            title: "Criar publicação",
            description: "Publique um novo produto",
            icon: PlusCircle,
            href: "/publish",
            isDisabled: selectedUser && selectedUser.tipo == "SELLER"
        },
    ]
    return (
        <>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-[#3483fa] flex items-center justify-center overflow-hidden">
                        <div className="h-8 w-8 rounded-full bg-[#3483fa] flex items-center justify-center text-white font-medium">
                            {getLetrasIniciaisDoNomeESobrenome(selectedUser ? selectedUser.nome : "Mercado Livre")}
                        </div>
                        <span className="hidden text-white text-xl font-medium">{selectedUser ? selectedUser.nome.charAt(0) : "Mercado Livre"}</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            {selectedUser ? `Olá, ${selectedUser.nome}` : "Olá!"}
                        </h1>
                        <p className="text-gray-500">Bem-vindo de volta ao Mercado Livre</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {menuItems.map((item) => {
                    const content = (
                        <div
                            className={`
                                bg-white rounded-lg shadow-sm p-6 transition-shadow 
                                ${item.isDisabled ? "hover:shadow-md" : "opacity-60 cursor-not-allowed"}
                            `}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-[#3483fa]/10 rounded-full">
                                        <item.icon className="h-6 w-6 text-[#3483fa]" />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-gray-900">
                                            {item.title}
                                            {item.count !== undefined && (
                                                <span className="ml-2 text-sm font-normal text-gray-500">({item.count})</span>
                                            )}
                                        </h2>
                                        <p className="text-sm text-gray-500">{item.description}</p>
                                    </div>
                                </div>
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                    )

                    return item.isDisabled ? (
                        <Link key={item.href} to={item.href}>
                            {content}
                        </Link>
                    ) : (
                        <div key={item.title} aria-disabled="true">
                            {content}
                        </div>
                    )
                })}
            </div>
        </>
    )
}