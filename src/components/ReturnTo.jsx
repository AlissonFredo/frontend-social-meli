import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function ReturnTo({ to = '/', text = 'Voltar para Home' }) {
    return (
        <div className="mb-6">
            <Link
                to={to}
                className="inline-flex items-center gap-2 text-[#3483fa] hover:text-[#2968c8] transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                {text}
            </Link>
        </div>
    )
}
