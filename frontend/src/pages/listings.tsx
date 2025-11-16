import React from "react";
import { useState, useEffect } from "react";
import ListingCard from "../components/ListingCard";
import NewListing from "../components/NewListing";

interface ResearchPosting {
    posting_id: number;
    faculty_id: number;
    title: string;
    description: string;
    research_areas: string;
    requirements: string;
    time_commitment: string;
    duration: string;
    compensation_type: "paid" | "credit" | "volunteer";
    compensation_details: string;
    is_remote: boolean;
    start_date: string;
    application_deadline: string;
    status: "open" | "closed" | "filled";
    posted_at: string;
    updated_at: string;
}

function ListingsPage() {
    const [allData, setAllData] = useState<ResearchPosting[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showNewListing, setShowNewListing] = useState(false);

    useEffect(() => {
        // Mock data for testing
        // const mockPostings: ResearchPosting[] = [
        //     {
        //         posting_id: 1,
        //         faculty_id: 42,
        //         title: "Machine Learning Research Assistant",
        //         description:
        //             "We are seeking a motivated undergraduate student to assist with cutting-edge machine learning research focused on natural language processing and computer vision applications. This position offers hands-on experience with state-of-the-art deep learning frameworks and the opportunity to contribute to published research.",
        //         research_areas:
        //             "Machine Learning, Natural Language Processing, Computer Vision",
        //         requirements:
        //             "Python programming experience, familiarity with PyTorch or TensorFlow, strong mathematical background (linear algebra, calculus), GPA 3.5+",
        //         time_commitment: "10-15 hours per week",
        //         duration:
        //             "Spring 2026 semester (with possibility of extension)",
        //         compensation_type: "paid",
        //         compensation_details: "$18/hour",
        //         is_remote: true,
        //         start_date: "2026-01-15",
        //         application_deadline: "2025-12-01",
        //         status: "open",
        //         posted_at: "2025-11-10T14:30:00Z",
        //         updated_at: "2025-11-14T09:15:00Z",
        //     },
        //     {
        //         posting_id: 2,
        //         faculty_id: 37,
        //         title: "Biotechnology Lab Assistant",
        //         description:
        //             "Join our molecular biology lab studying gene expression and protein interactions. Ideal for students interested in biotechnology, biochemistry, or pre-med tracks. You'll gain practical experience with PCR, gel electrophoresis, and cell culture techniques.",
        //         research_areas: "Molecular Biology, Biochemistry, Genetics",
        //         requirements:
        //             "Completed BIO 201 and CHEM 102, lab experience preferred, attention to detail, able to work independently",
        //         time_commitment: "8-12 hours per week",
        //         duration: "1 year commitment preferred",
        //         compensation_type: "credit",
        //         compensation_details: "3 credits per semester",
        //         is_remote: false,
        //         start_date: "2026-01-20",
        //         application_deadline: "2025-11-30",
        //         status: "open",
        //         posted_at: "2025-11-08T10:20:00Z",
        //         updated_at: "2025-11-12T16:45:00Z",
        //     },
        //     {
        //         posting_id: 3,
        //         faculty_id: 55,
        //         title: "Climate Change Data Analysis - FILLED",
        //         description:
        //             "Research position focused on analyzing climate data sets and modeling environmental changes. This was a great opportunity for students interested in environmental science and data science.",
        //         research_areas:
        //             "Environmental Science, Data Science, Climate Modeling",
        //         requirements:
        //             "Strong statistics background, R or Python experience, environmental science coursework",
        //         time_commitment: "15-20 hours per week",
        //         duration: "Fall 2025 - Spring 2026",
        //         compensation_type: "paid",
        //         compensation_details: "$16/hour",
        //         is_remote: false,
        //         start_date: "2025-09-01",
        //         application_deadline: "2025-08-15",
        //         status: "filled",
        //         posted_at: "2025-07-15T09:00:00Z",
        //         updated_at: "2025-08-20T14:30:00Z",
        //     },
        //     {
        //         posting_id: 4,
        //         faculty_id: 28,
        //         title: "Community Health Survey Research",
        //         description:
        //             "Participate in a community-based participatory research project examining health disparities in underserved populations. Responsibilities include survey design, data collection, and community outreach.",
        //         research_areas:
        //             "Public Health, Social Sciences, Community Engagement",
        //         requirements:
        //             "Strong communication skills, interest in public health, bilingual (English/Spanish) preferred but not required",
        //         time_commitment: "6-10 hours per week",
        //         duration: "Flexible, minimum one semester",
        //         compensation_type: "volunteer",
        //         compensation_details:
        //             "Volunteer position with strong recommendation letter",
        //         is_remote: true,
        //         start_date: "2026-02-01",
        //         application_deadline: "2025-12-15",
        //         status: "open",
        //         posted_at: "2025-11-12T11:15:00Z",
        //         updated_at: "2025-11-12T11:15:00Z",
        //     },
        // ];

        // setAllData(mockPostings);
        // setLoading(false);

        // Uncomment below to use real API
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://172.25.83.86:8802/get_listings", {
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log(response);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();

                console.log(data);

                // Extract listings array from response object
                const listings = data.listings || data;
                setAllData(listings);
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

        fetchData();
    }, []);

    return (
        <div>
            {showNewListing ? (
                <NewListing onClose={() => setShowNewListing(false)} />
            ) : (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-purple-600">
                            Listings
                        </h1>
                        <button
                            onClick={() => setShowNewListing(true)}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition-colors"
                        >
                            + Create Posting
                        </button>
                    </div>

                    {loading && (
                        <p className="text-sm text-gray-600">
                            Loading listings...
                        </p>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                            <p className="text-sm">Error: {error}</p>
                        </div>
                    )}

                    {!loading && !error && (
                        <div className="space-y-4">
                            {allData && allData.length > 0 ? (
                                allData.map((posting) => (
                                    <ListingCard
                                        key={posting.posting_id}
                                        posting={posting}
                                    />
                                ))
                            ) : (
                                <p className="text-sm text-gray-600">
                                    No listings available.
                                </p>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default ListingsPage;
