import { Link } from "react-router";
import UserSelector from "./UserSelector";

export default function Header() {
    return (
        <header className="bg-meli-yellow">
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                    <Link to="/" className="flex-shrink-0">
                        <div className="text-2xl font-bold text-meli-blue">
                            mercado<span className="text-meli-blue-dark">livre</span>
                        </div>
                    </Link>

                    <UserSelector />
                </div>
            </div>
        </header>
    )
}

