import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ListingsPage from "./pages/listings";
import ApplicantsPage from "./pages/applicants";
import RecruitingPage from "./pages/recruiting";

function App() {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Navbar />
            <main className="mx-auto max-w-6xl px-4 py-6">
                <Routes>
                    <Route path="/applicants" element={<ApplicantsPage />} />
                    <Route path="/recruiting" element={<RecruitingPage />} />
                    <Route path="/" element={<ListingsPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
