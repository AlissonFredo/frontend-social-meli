import { useRef, useState } from "react";
import ReturnTo from "../components/ReturnTo";
import { ChevronDown, Loader2 } from "lucide-react";

export default function CreatePublication() {
    const [formState, setFormState] = useState("idle")

    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    const categoryRef = useRef(null)

    const [isTypeOpen, setIsTypeOpen] = useState(false)
    const typeRef = useRef(null)


    const categories = [
        "Eletrônicos",
        "Moda",
        "Casa e Decoração",
        "Esportes",
        "Automotivo",
        "Animais",
        "Brinquedos",
        "Livros",
        "Beleza",
        "Outros",
    ]

    const types = [
        "FASHION_ACCESSORIES",
        "ELECTRONICS_COMPUTERS",
        "HOME_FURNITURE_DECOR",
        "APPLIANCES",
        "BEAUTY_PERSONAL_CARE",
        "GROCERY_BEVERAGES",
        "HEALTH_WELLNESS",
        "SPORTS_OUTDOORS",
        "TOYS_BABY_KIDS",
        "PET_SUPPLIES",
        "AUTOMOTIVE",
        "TOOLS_HOME_IMPROVEMENT",
        "OFFICE_SCHOOL_SUPPLIES",
        "VIDEO_GAMES",
        "BOOKS_MUSIC_MOVIES",
        "OTHER"
    ]

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <>
            <ReturnTo />

            <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <h1 className="text-2xl font-semibold text-gray-900">Criar publicação</h1>
                <p className="text-gray-500 mt-1">Preencha os dados do produto que deseja vender</p>
            </div>

            <form onSubmit={() => { }} className="space-y-4">
                <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Título do produto *
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Ex: iPhone 15 Pro Max 256GB Novo Lacrado"
                            value={""}
                            onChange={() => { }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3483fa] focus:border-transparent"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Descrição
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Descreva seu produto com detalhes..."
                            value={""}
                            onChange={() => { }}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3483fa] focus:border-transparent resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Categoria *</label>
                            <div className="relative" ref={categoryRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                    className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#3483fa] text-left"
                                >
                                    <span
                                        className={
                                            /* formData.category ? "text-gray-900" : "text-gray-400" */
                                            "text-gray-400"
                                        }
                                    >
                                        {/* {formData.category || "Selecione uma categoria"} */}
                                        {"Selecione uma categoria"}
                                    </span>
                                    <ChevronDown
                                        className={`h-4 w-4 text-gray-400 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`}
                                    />
                                </button>

                                {isCategoryOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-60 overflow-auto">
                                        {categories.map((category) => (
                                            <button
                                                key={category}
                                                type="button"
                                                onClick={() => {
                                                    handleSelectChange("category", category)
                                                    setIsCategoryOpen(false)
                                                }}
                                                /* className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${formData.category === category ? "bg-gray-50 text-[#3483fa]" : "text-gray-700"}`} */
                                                className={`w-full px-4 py-2 text-left hover:bg-gray-100 $text-gray-700`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Tipo *</label>
                            <div className="relative" ref={typeRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsTypeOpen(!isTypeOpen)}
                                    className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#3483fa] text-left"
                                >
                                    <span
                                        className={
                                            /* formData.category ? "text-gray-900" : "text-gray-400" */
                                            "text-gray-400"
                                        }
                                    >
                                        {/* {formData.category || "Selecione uma categoria"} */}
                                        {"Selecione um tipo"}
                                    </span>
                                    <ChevronDown
                                        className={`h-4 w-4 text-gray-400 transition-transform ${isTypeOpen ? "rotate-180" : ""}`}
                                    />
                                </button>

                                {isTypeOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-60 overflow-auto">
                                        {types.map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => {
                                                    handleSelectChange("type", type)
                                                    setIsTypeOpen(false)
                                                }}
                                                /* className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${formData.category === category ? "bg-gray-50 text-[#3483fa]" : "text-gray-700"}`} */
                                                className={`w-full px-4 py-2 text-left hover:bg-gray-100 $text-gray-700`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                                Cor *
                            </label>
                            <input
                                id="color"
                                name="color"
                                type="text"
                                placeholder="Descreva a cor do seu produto..."
                                value={""}
                                onChange={() => { }}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3483fa] focus:border-transparent"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                                Marca *
                            </label>
                            <input
                                id="brand"
                                name="brand"
                                type="text"
                                placeholder="Descreva a marca do seu produto..."
                                value={""}
                                onChange={() => { }}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3483fa] focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            Preço *
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0,00"
                                value={0}
                                onChange={handleInputChange}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3483fa] focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between py-3 border-t">
                        <div>
                            <label htmlFor="freeShipping" className="font-medium text-gray-900">
                                Promoção
                            </label>
                            <p className="text-sm text-gray-500">Ofereça promoções para atrair mais compradores</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, freeShipping: !true }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${false ? "bg-[#3483fa]" : "bg-gray-300"}`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${false ? "translate-x-6" : "translate-x-1"}`}
                            />
                        </button>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
                            Desconto
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">%</span>
                            <input
                                id="discount"
                                name="discount"
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0,00"
                                value={0}
                                onChange={handleInputChange}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3483fa] focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <button
                        type="submit"
                        disabled={formState === "loading"}
                        className="w-full py-3 bg-[#3483fa] text-white text-lg font-medium rounded-lg hover:bg-[#2968c8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {formState === "loading" ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Publicando...
                            </>
                        ) : (
                            "Publicar produto"
                        )}
                    </button>
                </div>
            </form>
        </>
    )
}