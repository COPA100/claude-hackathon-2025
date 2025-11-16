import React from "react";
import { useState, useEffect } from "react";
import ApplicantCard from "../components/ApplicantCard";

interface Applicant {
    applicant_id: number;
    name: string;
    score: number;
    experience: string;
    major: string;
    grad_year: string;
    gpa: number;
    bio: string;
    availability: string;
    interests: string;
    email: string;
    phone: string;
}

interface ListingWithApplicants {
    listing_id: number;
    listing_title: string;
    applicants: Applicant[];
}

export default function ApplicantsPage() {
    const [allData, setAllData] = useState<ListingWithApplicants[] | null>(
        null
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchApplicantsForAllListings = async () => {
            try {
                setLoading(true);

                // First, get all listings
                const listingsResponse = await fetch(
                    "http://172.25.83.86:8802/get_listings",
                    {
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!listingsResponse.ok) {
                    throw new Error(
                        `Failed to fetch listings: ${listingsResponse.status}`
                    );
                }

                const data = await listingsResponse.json();

                // Extract listings array from response object
                const listings = data.listings || data;

                // Ensure listings is an array
                const listingsArray = Array.isArray(listings)
                    ? listings
                    : [listings];

                // For each listing, fetch the top applicants ONE AT A TIME
                const listingsWithApplicants: ListingWithApplicants[] = [];

                for (const listing of listingsArray) {
                    try {
                        const response = await fetch(
                            "http://172.25.83.86:8802/top_candidates",
                            {
                                method: "GET",
                                mode: "cors",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    listing_id: listing.listing_id,
                                }),
                            }
                        );

                        if (!response.ok) {
                            console.error(
                                `Failed to fetch applicants for listing ${listing.listing_id}`
                            );
                            listingsWithApplicants.push({
                                listing_id: listing.listing_id,
                                listing_title: listing.title,
                                applicants: [],
                            });
                            continue;
                        }

                        const data = await response.json();

                        // Ensure applicants is an array
                        const applicants = Array.isArray(data)
                            ? data
                            : data.applicants || [];

                        listingsWithApplicants.push({
                            listing_id: listing.listing_id,
                            listing_title: listing.title,
                            applicants: applicants,
                        });
                    } catch (error) {
                        console.error(
                            `Error fetching applicants for listing ${listing.listing_id}:`,
                            error
                        );
                        listingsWithApplicants.push({
                            listing_id: listing.listing_id,
                            listing_title: listing.title,
                            applicants: [],
                        });
                    }
                }

                setAllData(listingsWithApplicants);
                setError(null);
            } catch (e) {
                console.error("Error fetching data:", e);
                if (e instanceof TypeError && e.message === "Failed to fetch") {
                    setError(
                        "Cannot connect to server. Check if the backend is running and CORS is enabled."
                    );
                } else {
                    setError(
                        e instanceof Error ? e.message : "An error occurred"
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        fetchApplicantsForAllListings();

        // Mock data for testing
        // const mockData: ListingWithApplicants[] = [
        //     {
        //         listing_id: 1,
        //         listing_title: "Machine Learning Research Assistant",
        //         applicants: [
        //             {
        //                 applicant_id: 101,
        //                 name: "Sarah Johnson",
        //                 score: 9.2,
        //                 experience:
        //                     "2 years of Python development, completed ML course with A+, worked on personal NLP projects",
        //                 major: "Computer Science",
        //                 grad_year: "2026",
        //                 gpa: 3.85,
        //                 bio: "Passionate about AI and machine learning with a focus on natural language processing. Eager to contribute to cutting-edge research.",
        //                 availability: "12-15 hours/week",
        //                 interests: "Deep Learning, NLP, Computer Vision",
        //                 email: "sarah.johnson@university.edu",
        //                 phone: "(555) 123-4567",
        //             },
        //             {
        //                 applicant_id: 102,
        //                 name: "Michael Chen",
        //                 score: 8.7,
        //                 experience:
        //                     "Strong math background, completed Data Structures and Algorithms, worked as TA for Intro to AI",
        //                 major: "Computer Science & Mathematics",
        //                 grad_year: "2025",
        //                 gpa: 3.92,
        //                 bio: "Double major seeking to apply theoretical knowledge to practical ML research problems.",
        //                 availability: "10-12 hours/week",
        //                 interests: "Machine Learning, Optimization, Statistics",
        //                 email: "m.chen@university.edu",
        //                 phone: "(555) 234-5678",
        //             },
        //             {
        //                 applicant_id: 103,
        //                 name: "Emily Rodriguez",
        //                 score: 8.5,
        //                 experience:
        //                     "Completed machine learning internship at tech startup, proficient in PyTorch and TensorFlow",
        //                 major: "Data Science",
        //                 grad_year: "2026",
        //                 gpa: 3.78,
        //                 bio: "Practical experience in deploying ML models. Looking to expand research skills.",
        //                 availability: "15 hours/week",
        //                 interests:
        //                     "Applied ML, Data Engineering, Computer Vision",
        //                 email: "emily.r@university.edu",
        //                 phone: "(555) 345-6789",
        //             },
        //             {
        //                 applicant_id: 104,
        //                 name: "James Park",
        //                 score: 8.3,
        //                 experience:
        //                     "Research experience in robotics lab, strong programming skills in Python and C++",
        //                 major: "Electrical Engineering",
        //                 grad_year: "2025",
        //                 gpa: 3.68,
        //                 bio: "Interested in intersection of robotics and ML. Previous research in autonomous systems.",
        //                 availability: "8-10 hours/week",
        //                 interests:
        //                     "Robotics, Computer Vision, Reinforcement Learning",
        //                 email: "james.park@university.edu",
        //                 phone: "(555) 456-7890",
        //             },
        //             {
        //                 applicant_id: 105,
        //                 name: "Aisha Patel",
        //                 score: 8.0,
        //                 experience:
        //                     "Strong statistical background, completed coursework in ML and AI, hackathon winner",
        //                 major: "Statistics",
        //                 grad_year: "2026",
        //                 gpa: 3.71,
        //                 bio: "Statistics major with passion for applying statistical methods to ML problems.",
        //                 availability: "10-15 hours/week",
        //                 interests:
        //                     "Statistical Learning, Bayesian Methods, NLP",
        //                 email: "a.patel@university.edu",
        //                 phone: "(555) 567-8901",
        //             },
        //         ],
        //     },
        //     {
        //         listing_id: 2,
        //         listing_title: "Biotechnology Lab Assistant",
        //         applicants: [
        //             {
        //                 applicant_id: 201,
        //                 name: "Jessica Liu",
        //                 score: 9.5,
        //                 experience:
        //                     "Completed BIO 201 and CHEM 102 with A grades, 1 year lab experience in genetics lab",
        //                 major: "Biochemistry",
        //                 grad_year: "2026",
        //                 gpa: 3.91,
        //                 bio: "Pre-med student with extensive lab experience. Meticulous and detail-oriented.",
        //                 availability: "10-12 hours/week",
        //                 interests:
        //                     "Molecular Biology, Genetics, Protein Synthesis",
        //                 email: "jessica.liu@university.edu",
        //                 phone: "(555) 678-9012",
        //             },
        //             {
        //                 applicant_id: 202,
        //                 name: "David Martinez",
        //                 score: 8.9,
        //                 experience:
        //                     "Research assistant in organic chemistry lab, proficient in PCR and gel electrophoresis",
        //                 major: "Biology",
        //                 grad_year: "2025",
        //                 gpa: 3.82,
        //                 bio: "Biology major with hands-on lab techniques experience. Excellent teamwork skills.",
        //                 availability: "8-12 hours/week",
        //                 interests: "Cell Biology, Genetics, Biochemistry",
        //                 email: "d.martinez@university.edu",
        //                 phone: "(555) 789-0123",
        //             },
        //             {
        //                 applicant_id: 203,
        //                 name: "Rachel Kim",
        //                 score: 8.6,
        //                 experience:
        //                     "Completed advanced biochemistry courses, cell culture experience from summer internship",
        //                 major: "Biotechnology",
        //                 grad_year: "2026",
        //                 gpa: 3.75,
        //                 bio: "Enthusiastic about biotechnology applications in medicine.",
        //                 availability: "12-15 hours/week",
        //                 interests:
        //                     "Biotech, Genetic Engineering, Medical Research",
        //                 email: "rachel.kim@university.edu",
        //                 phone: "(555) 890-1234",
        //             },
        //         ],
        //     },
        // ];

        // setAllData(mockData);
        // setLoading(false);
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-purple-600">
                    Applicants
                </h1>
            </div>

            {loading && (
                <p className="text-sm text-gray-600">Loading applicants...</p>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    <p className="text-sm">Error: {error}</p>
                </div>
            )}

            {!loading && !error && (
                <div className="space-y-4">
                    {allData && allData.length > 0 ? (
                        allData.map((listing) => (
                            <ApplicantCard
                                key={listing.listing_id}
                                listingTitle={listing.listing_title}
                                applicants={listing.applicants}
                            />
                        ))
                    ) : (
                        <p className="text-sm text-gray-600">
                            No applicants available.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
