import { useRef, useState } from "react";
import ReturnTo from "../components/ReturnTo";
import { ChevronDown, Loader2 } from "lucide-react";
import { postCadastrarProduto } from "../services/productService";
import { useUser } from "../contexts/UsersContext";

export default function CreatePublication() {
    const { selectedUser } = useUser();
    const [formState, setFormState] = useState("idle")
    const [errorMessage, setErrorMessage] = useState([])

    console.log(errorMessage);


    const [formData, setFormData] = useState({
        category: "",
        price: "",
        productName: "",
        type: "",
        brand: "",
        color: "",
        notes: ""
    })

    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    const categoryRef = useRef(null)

    const [isTypeOpen, setIsTypeOpen] = useState(false)
    const typeRef = useRef(null)

    const categories = [
        { text: "Eletrônicos", value: 1 },
        { text: "Moda", value: 2 },
        { text: "Casa e Decoração", value: 3 },
        { text: "Esportes", value: 4 },
        { text: "Automotivo", value: 5 },
        { text: "Animais", value: 6 },
        { text: "Brinquedos", value: 7 },
        { text: "Livros", value: 8 },
        { text: "Beleza", value: 9 },
        { text: "Outros", value: 10 }
    ]

    const types = [
        { value: "FASHION_ACCESSORIES", text: "Acessorios De Moda" },
        { value: "ELECTRONICS_COMPUTERS", text: "Eletronicos e Computadores" },
        { value: "HOME_FURNITURE_DECOR", text: "Moveis, Decoracao e Casa" },
        { value: "APPLIANCES", text: "Eletrodomesticos" },
        { value: "BEAUTY_PERSONAL_CARE", text: "Beleza e Cuidado Pessoal" },
        { value: "GROCERY_BEVERAGES", text: "Alimentos e Bebidas" },
        { value: "HEALTH_WELLNESS", text: "Saude e Bem Estar" },
        { value: "SPORTS_OUTDOORS", text: "Esportes ao Ar Livre" },
        { value: "TOYS_BABY_KIDS", text: "Brinquedos de Bebes e Criancas" },
        { value: "PET_SUPPLIES", text: "Produtos Pet" },
        { value: "AUTOMOTIVE", text: "Automotivo" },
        { value: "TOOLS_HOME_IMPROVEMENT", text: "Ferramentas Melhorias Casa" },
        { value: "OFFICE_SCHOOL_SUPPLIES", text: "Materiais de Escritorio e Escola" },
        { value: "VIDEO_GAMES", text: "Video Jogos" },
        { value: "BOOKS_MUSIC_MOVIES", text: "Livros, Musica e Filmes" },
        { value: "OTHER", text: "Outros" }
    ]

    const mapInputs = [
        { key: "category", input: "Categoria" },
        { key: "price", input: "Preço" },
        { key: "product.productName", input: "Título do produto" },
        { key: "product.type", input: "Tipo" },
        { key: "product.brand", input: "Marca" },
        { key: "product.color", input: "Cor" },
        { key: "product.notes", input: "Descrição" }
    ]

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const validarCamposObrigatorios = () => {
        let errors = []
        if (!formData.category) errors.push({ field: "category", message: "O campo é obrigatorio." })
        if (!formData.price) errors.push({ field: "price", message: "O campo é obrigatorio." })
        if (!formData.productName) errors.push({ field: "product.productName", message: "O campo é obrigatorio." })
        if (!formData.type) errors.push({ field: "product.type", message: "O campo é obrigatorio." })
        if (!formData.brand) errors.push({ field: "product.brand", message: "O campo é obrigatorio." })
        if (!formData.color) errors.push({ field: "product.color", message: "O campo é obrigatorio." })
        if (errors.length > 0) setErrorMessage(errors)
        return errors.length > 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormState("loading")

        if (validarCamposObrigatorios()) {
            setFormState("error")
            return
        }

        let post = {
            userId: selectedUser.id,
            category: formData.category,
            price: formData.price,
            product: {
                productName: formData.productName,
                type: formData.type,
                brand: formData.brand,
                color: formData.color
            },
        }

        if (formData.notes) {
            post.product.notes = formData.notes
        }

        const result = await postCadastrarProduto(post)

        console.log(result);

        if (result.status === 200) {
            setFormState("success")

            setFormData({
                category: "",
                price: "",
                productName: "",
                type: "",
                brand: "",
                color: "",
                notes: ""
            })
        } else {
            setFormState("error")
            setErrorMessage(result.errors)
        }
    }

    return (
        <>
            <ReturnTo />

            <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <h1 className="text-2xl font-semibold text-gray-900">Criar publicação</h1>
                <p className="text-gray-500 mt-1">Preencha os dados do produto que deseja vender</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                            Título do produto *
                        </label>
                        <input
                            id="productName"
                            name="productName"
                            type="text"
                            placeholder="Ex: iPhone 15 Pro Max 256GB Novo Lacrado"
                            value={formData.productName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3483fa] focus:border-transparent"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                            Descrição
                        </label>
                        <textarea
                            id="notes"
                            name="notes"
                            placeholder="Descreva seu produto com detalhes..."
                            value={formData.notes}
                            onChange={handleInputChange}
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
                                    <span className={formData.category ? "text-gray-900" : "text-gray-400"} >
                                        {formData.category ? categories.find(valor => valor.value == formData.category).text : "Selecione uma categoria"}
                                    </span>
                                    <ChevronDown
                                        className={`h-4 w-4 text-gray-400 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`}
                                    />
                                </button>

                                {isCategoryOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-60 overflow-auto">
                                        {categories.map((category) => (
                                            <button
                                                key={category.value}
                                                type="button"
                                                onClick={() => {
                                                    handleSelectChange("category", category.value)
                                                    setIsCategoryOpen(false)
                                                }}
                                                className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${formData.category === category.value ? "bg-gray-50 text-[#3483fa]" : "text-gray-700"}`}
                                            >
                                                {category.text}
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
                                        className={formData.type ? "text-gray-900" : "text-gray-400"}
                                    >
                                        {formData.type ? types.find(value => value.value == formData.type).text : "Selecione um tipo"}
                                    </span>
                                    <ChevronDown
                                        className={`h-4 w-4 text-gray-400 transition-transform ${isTypeOpen ? "rotate-180" : ""}`}
                                    />
                                </button>

                                {isTypeOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-60 overflow-auto">
                                        {types.map((type) => (
                                            <button
                                                key={type.value}
                                                type="button"
                                                onClick={() => {
                                                    handleSelectChange("type", type.value)
                                                    setIsTypeOpen(false)
                                                }}
                                                className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${formData.type === type.value ? "bg-gray-50 text-[#3483fa]" : "text-gray-700"}`}
                                            >
                                                {type.text}
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
                                value={formData.color}
                                onChange={handleInputChange}
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
                                value={formData.brand}
                                onChange={handleInputChange}
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
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3483fa] focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {formState === "error" && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {errorMessage.map((erro, key) => (
                            <p key={key}>{`(${mapInputs.find(value => value.key == erro.field).input}): ${erro.message}`}</p>
                        ))}

                    </div>
                )}

                {formState === "success" && (
                    <div className="relative bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                        <button
                            type="button"
                            className="absolute top-2 right-2 text-green-700 hover:text-green-900"
                            aria-label="Fechar alerta de sucesso"
                            onClick={() => setFormState("idle")}
                        >
                            ×
                        </button>
                        <p>Cadastro realizado com sucesso!</p>
                    </div>
                )}

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