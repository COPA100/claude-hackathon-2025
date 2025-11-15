import { useState } from "react";

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

interface ListingCardProps {
    posting: ResearchPosting;
}

export default function ListingCard({ posting }: ListingCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                    <h2 className="text-xl font-semibold text-purple-600 mb-1">
                        {posting.title}
                    </h2>
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                                posting.status === "open"
                                    ? "bg-green-50 text-green-700 border border-green-200"
                                    : posting.status === "filled"
                                    ? "bg-gray-100 text-gray-700 border border-gray-200"
                                    : "bg-red-50 text-red-700 border border-red-200"
                            }`}
                        >
                            {posting.status.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                            {posting.compensation_type.toUpperCase()}
                        </span>
                        {posting.is_remote && (
                            <span className="px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                REMOTE
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <p
                className={`text-sm text-gray-700 mb-4 ${
                    !isExpanded ? "line-clamp-3" : ""
                }`}
            >
                {posting.description}
            </p>

            {!isExpanded ? (
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    {posting.research_areas && (
                        <div>
                            <span className="font-medium text-gray-700">
                                Research Areas:
                            </span>
                            <p className="text-gray-600">
                                {posting.research_areas}
                            </p>
                        </div>
                    )}
                    {posting.time_commitment && (
                        <div>
                            <span className="font-medium text-gray-700">
                                Time Commitment:
                            </span>
                            <p className="text-gray-600">
                                {posting.time_commitment}
                            </p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-y-4 mb-4 text-sm">
                    {posting.research_areas && (
                        <div>
                            <span className="font-medium text-gray-700">
                                Research Areas:
                            </span>
                            <p className="text-gray-600">
                                {posting.research_areas}
                            </p>
                        </div>
                    )}
                    {posting.requirements && (
                        <div>
                            <span className="font-medium text-gray-700">
                                Requirements:
                            </span>
                            <p className="text-gray-600">
                                {posting.requirements}
                            </p>
                        </div>
                    )}
                    {posting.time_commitment && (
                        <div>
                            <span className="font-medium text-gray-700">
                                Time Commitment:
                            </span>
                            <p className="text-gray-600">
                                {posting.time_commitment}
                            </p>
                        </div>
                    )}
                    {posting.duration && (
                        <div>
                            <span className="font-medium text-gray-700">
                                Duration:
                            </span>
                            <p className="text-gray-600">{posting.duration}</p>
                        </div>
                    )}
                    {posting.compensation_details && (
                        <div>
                            <span className="font-medium text-gray-700">
                                Compensation:
                            </span>
                            <p className="text-gray-600">
                                {posting.compensation_details}
                            </p>
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <span className="font-medium text-gray-700">
                                Posted:
                            </span>
                            <p className="text-gray-600">
                                {new Date(
                                    posting.posted_at
                                ).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <span className="font-medium text-gray-700">
                                Faculty ID:
                            </span>
                            <p className="text-gray-600">
                                {posting.faculty_id}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {posting.application_deadline && (
                <div className="flex items-center gap-4 text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <span>
                        <span className="font-medium">Deadline:</span>{" "}
                        {new Date(
                            posting.application_deadline
                        ).toLocaleDateString()}
                    </span>
                    {posting.start_date && (
                        <span>
                            <span className="font-medium">Start:</span>{" "}
                            {new Date(posting.start_date).toLocaleDateString()}
                        </span>
                    )}
                </div>
            )}

            <button
                className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition-colors"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                }}
            >
                {isExpanded ? "Show Less" : "View Details"}
            </button>
        </div>
    );
}
