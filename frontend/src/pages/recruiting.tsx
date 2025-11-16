import { useState, useEffect } from "react";
import RecruitingCard from "../components/RecruitingCard";

interface ResearchPosting {
    posting_id?: number;
    listing_id?: number;
    title: string;
    description: string;
    department: string;
    professor_name: string;
    student_type: string;
    compensation_type: string;
    compensation_amount: number;
    hours_per_week: number;
    duration: string;
    required_skills: string;
    preferred_skills: string;
    min_gpa: number;
    application_deadline: string;
    start_date: string;
    is_remote: boolean;
    status: string;
}

export default function RecruitingPage() {
    const [listings, setListings] = useState<ResearchPosting[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Mock data for testing
        // const mockListings: ResearchPosting[] = [
        //     {
        //         listing_id: 1,
        //         title: "Machine Learning Research Assistant",
        //         description: "Seeking undergraduate research assistant for ML project",
        //         department: "Computer Science",
        //         professor_name: "Dr. Sarah Chen",
        //         student_type: "Undergraduate",
        //         compensation_type: "Paid",
        //         compensation_amount: 18,
        //         hours_per_week: 10,
        //         duration: "One Semester",
        //         required_skills: "Python, Machine Learning basics",
        //         preferred_skills: "PyTorch, TensorFlow",
        //         min_gpa: 3.5,
        //         application_deadline: "2025-12-01",
        //         start_date: "2026-01-15",
        //         is_remote: false,
        //         status: "Open",
        //     },
        //     {
        //         listing_id: 2,
        //         title: "Biotechnology Lab Assistant",
        //         description: "Lab research position in molecular biology",
        //         department: "Biology",
        //         professor_name: "Dr. Michael Rodriguez",
        //         student_type: "Any",
        //         compensation_type: "Paid",
        //         compensation_amount: 16,
        //         hours_per_week: 12,
        //         duration: "Academic Year",
        //         required_skills: "BIO 201, CHEM 102",
        //         preferred_skills: "Lab experience, PCR techniques",
        //         min_gpa: 3.3,
        //         application_deadline: "2025-11-25",
        //         start_date: "2026-01-10",
        //         is_remote: false,
        //         status: "Open",
        //     },
        //     {
        //         listing_id: 3,
        //         title: "Climate Change Data Analysis",
        //         description: "Research assistant for environmental data analysis project",
        //         department: "Environmental Science",
        //         professor_name: "Dr. Emily Zhang",
        //         student_type: "Graduate",
        //         compensation_type: "Stipend",
        //         compensation_amount: 2500,
        //         hours_per_week: 15,
        //         duration: "Full Year",
        //         required_skills: "Statistics, R or Python, Data Analysis",
        //         preferred_skills: "GIS, Climate modeling",
        //         min_gpa: 3.7,
        //         application_deadline: "2025-12-10",
        //         start_date: "2026-02-01",
        //         is_remote: true,
        //         status: "Open",
        //     },
        // ];

        // setListings(mockListings);
        // setLoading(false);

        // Uncomment below to use real API
        const fetchListings = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://172.25.83.86:8802/get_listings", {
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                // Extract listings array from response object
                const listings = data.listings || data;
                setListings(listings);
                setError(null);
            } catch (e) {
                console.error("Error fetching listings:", e);
                if (e instanceof TypeError && e.message === 'Failed to fetch') {
                    setError("Cannot connect to server. Check if the backend is running and CORS is enabled.");
                } else {
                    setError(e instanceof Error ? e.message : "An error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
        
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-purple-600">
                    Recruiting
                </h1>
            </div>

            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-600">
                    <span className="font-medium">How it works:</span> Our AI will analyze your job requirements and search through applicant profiles to find the most qualified candidates based on their experience, skills, and qualifications.
                </p>
            </div>

            {loading && (
                <p className="text-sm text-gray-600">Loading job postings...</p>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    <p className="text-sm">Error: {error}</p>
                </div>
            )}

            {!loading && !error && (
                <div className="space-y-4">
                    {listings && listings.length > 0 ? (
                        listings.map((listing) => (
                            <RecruitingCard
                                key={listing.posting_id || listing.listing_id || 0}
                                listingTitle={listing.title}
                                listingId={listing.posting_id || listing.listing_id || 0}
                            />
                        ))
                    ) : (
                        <p className="text-sm text-gray-600">
                            No job postings available.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}