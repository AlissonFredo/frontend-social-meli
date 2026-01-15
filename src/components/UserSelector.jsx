import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useUsersCache } from "../hooks/useUsersCache";
import { useUser } from "../contexts/UsersContext";
import { Utils } from "../utils";

export default function UserSelector() {
    const dropdownRef = useRef(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const { users, isLoading } = useUsersCache();
    const { selectedUser, setSelectedUser } = useUser();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="flex items-center gap-2">
            <div className="relative" ref={dropdownRef}>
                <button
                    disabled={isLoading}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="cursor-pointer flex items-center gap-2 p-2 hover:bg-[#f5ce00] rounded"
                >
                    <div className="h-8 w-8 rounded-full bg-[#3483fa] flex items-center justify-center overflow-hidden">
                        <div className="h-8 w-8 rounded-full bg-[#3483fa] flex items-center justify-center text-white font-medium">
                            {Utils.getLetrasIniciaisDoNomeESobrenome(selectedUser ? selectedUser.nome : "Entrar")}
                        </div>
                        <span className="hidden text-white font-medium">{(selectedUser ? selectedUser.nome : "Entrar").charAt(0)}</span>
                    </div>
                    <span className="hidden md:inline text-sm text-[#2968c8] font-medium">
                        {(selectedUser ? selectedUser.nome : "Entrar").split(" ")[0]}
                    </span>
                    <ChevronDown className="h-4 w-4 text-[#2968c8]" />
                </button>

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border py-1 z-50">
                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase border-b">Usuários</div>

                        <div className="max-h-60 overflow-y-auto">
                            {users && users.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => setSelectedUser(user)}
                                >
                                    <div className="h-8 w-8 rounded-full bg-[#3483fa] flex items-center justify-center">
                                        <span className="text-white text-sm font-medium">{Utils.getLetrasIniciaisDoNomeESobrenome(user.nome)}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-900">{user.nome}</span>
                                        <span className={`text-xs ${user.tipo == "BUYER" ? "text-blue-600" : "text-green-600"}`}>
                                            {user.tipo == "BUYER" ? "Comprador" : "Vendedor"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}