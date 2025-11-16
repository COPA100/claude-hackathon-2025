import { useState } from "react";

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

interface ApplicantCardProps {
    listingTitle: string;
    applicants: Applicant[];
}

export default function ApplicantCard({
    listingTitle,
    applicants,
}: ApplicantCardProps) {
    const [expandedApplicant, setExpandedApplicant] = useState<number | null>(
        null
    );
    const [showContact, setShowContact] = useState<number | null>(null);

    const toggleApplicant = (applicantId: number) => {
        setExpandedApplicant(
            expandedApplicant === applicantId ? null : applicantId
        );
    };

    const toggleContact = (applicantId: number) => {
        setShowContact(showContact === applicantId ? null : applicantId);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-purple-600 mb-4">
                {listingTitle}
            </h2>

            <p className="text-sm text-gray-600 mb-4">
                Top {applicants.length} Applicants
            </p>

            <div className="space-y-3">
                {applicants.map((applicant) => (
                    <div
                        key={applicant.applicant_id}
                        className="border border-gray-200 rounded-lg"
                    >
                        <div
                            className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() =>
                                toggleApplicant(applicant.applicant_id)
                            }
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                        <span className="text-purple-700 font-semibold">
                                            {applicant.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")
                                                .slice(0, 2)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {applicant.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {applicant.major}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-right">
                                        <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-semibold">
                                            Score: {applicant.score}/10
                                        </span>
                                    </div>
                                    <svg
                                        className={`w-5 h-5 text-gray-400 transition-transform ${
                                            expandedApplicant ===
                                            applicant.applicant_id
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {expandedApplicant === applicant.applicant_id && (
                            <div className="px-4 pb-4 pt-2 border-t border-gray-100 space-y-3">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium text-gray-700">
                                            Major:
                                        </span>
                                        <p className="text-gray-600">
                                            {applicant.major}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-700">
                                            Graduation Year:
                                        </span>
                                        <p className="text-gray-600">
                                            {applicant.grad_year}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-700">
                                            GPA:
                                        </span>
                                        <p className="text-gray-600">
                                            {applicant.gpa.toFixed(2)}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-700">
                                            Availability:
                                        </span>
                                        <p className="text-gray-600">
                                            {applicant.availability}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <span className="font-medium text-gray-700 text-sm">
                                        Bio:
                                    </span>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {applicant.bio}
                                    </p>
                                </div>

                                <div>
                                    <span className="font-medium text-gray-700 text-sm">
                                        Experience:
                                    </span>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {applicant.experience}
                                    </p>
                                </div>

                                <div>
                                    <span className="font-medium text-gray-700 text-sm">
                                        Interests:
                                    </span>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {applicant.interests}
                                    </p>
                                </div>

                                <div className="pt-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleContact(
                                                applicant.applicant_id
                                            );
                                        }}
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
                                    >
                                        {showContact === applicant.applicant_id
                                            ? "Hide Contact Info"
                                            : "Show Contact Info"}
                                    </button>

                                    {showContact === applicant.applicant_id && (
                                        <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-700">
                                                        Email:
                                                    </span>
                                                    <a
                                                        href={`mailto:${applicant.email}`}
                                                        className="text-purple-600 hover:text-purple-700"
                                                    >
                                                        {applicant.email}
                                                    </a>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-700">
                                                        Phone:
                                                    </span>
                                                    <a
                                                        href={`tel:${applicant.phone}`}
                                                        className="text-purple-600 hover:text-purple-700"
                                                    >
                                                        {applicant.phone}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
