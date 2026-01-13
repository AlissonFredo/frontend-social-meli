import { Outlet } from "react-router";
import Header from "../components/Header";

export default function Layout() {
    return (
        <div className="min-h-screen bg-meli-gray">
            <Header />

            <main className="max-w-7xl mx-auto px-4 py-8">
                <Outlet />
            </main>
        </div>
    )
}