import React from "react";
import { useState } from "react";

interface NewListingProps {
    onClose?: () => void;
}

export default function NewListing({ onClose }: NewListingProps = {}) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [field, setField] = useState("");
    const [requirements, setRequirements] = useState("");
    const [gpa, setGpa] = useState("");
    const [gradType, setGradType] = useState("undergraduate");
    const [gradYear, setGradYear] = useState("");
    const [availability, setAvailability] = useState("");
    const [duration, setDuration] = useState("");
    const [compensationType, setCompensationType] = useState("paid");
    const [compensationDetails, setCompensationDetails] = useState("");
    const [isRemote, setIsRemote] = useState("no");
    const [startDate, setStartDate] = useState("");
    const [deadline, setDeadline] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = {
            title,
            description: desc,
            research_areas: field,
            requirements:
                requirements +
                (gpa ? ` GPA: ${gpa}+` : " GPA: 0.0+") +
                (gradType === "undergraduate" && gradYear
                    ? `, ${gradYear}`
                    : ""),
            time_commitment: availability,
            duration,
            compensation_type: compensationType,
            compensation_details: compensationDetails,
            is_remote: isRemote === "yes",
            start_date: startDate,
            application_deadline: deadline,
            status: "open",
        };

        console.log("Form data:", formData);
        // TODO: Send to API
    };

    return (
        <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-purple-600 mb-6">
                Create New Research Posting
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Position Title *
                    </label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Machine Learning Research Assistant"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                    </label>
                    <textarea
                        required
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Describe the research position, responsibilities, and what students will learn..."
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

                {/* Research Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Research Areas *
                    </label>
                    <input
                        type="text"
                        required
                        value={field}
                        onChange={(e) => setField(e.target.value)}
                        placeholder="e.g., Machine Learning, Biology, Chemistry"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

                {/* Requirements */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Requirements
                    </label>
                    <textarea
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        placeholder="List required skills, coursework, or experience..."
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

                {/* Student Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Student Type *
                    </label>
                    <div className="flex gap-6">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                value="undergraduate"
                                checked={gradType === "undergraduate"}
                                onChange={(e) => setGradType(e.target.value)}
                                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="ml-2 text-gray-700">
                                Undergraduate
                            </span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                value="graduate"
                                checked={gradType === "graduate"}
                                onChange={(e) => setGradType(e.target.value)}
                                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="ml-2 text-gray-700">Graduate</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                value="any"
                                checked={gradType === "any"}
                                onChange={(e) => setGradType(e.target.value)}
                                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="ml-2 text-gray-700">Any</span>
                        </label>
                    </div>
                </div>

                {/* Conditional: Year (only for undergrad) */}
                {gradType === "undergraduate" && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Year
                        </label>
                        <select
                            value={gradYear}
                            onChange={(e) => setGradYear(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="">Any Year</option>
                            <option value="Freshman">Freshman</option>
                            <option value="Sophomore">Sophomore</option>
                            <option value="Junior">Junior</option>
                            <option value="Senior">Senior</option>
                        </select>
                    </div>
                )}

                {/* GPA and Availability */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Minimum GPA
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="4.0"
                            value={gpa}
                            onChange={(e) => setGpa(e.target.value)}
                            placeholder="e.g., 3.5"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Time Commitment *
                        </label>
                        <input
                            type="text"
                            required
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                            placeholder="e.g., 10-15 hours/week"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Duration */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration *
                    </label>
                    <input
                        type="text"
                        required
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="e.g., Spring 2026 semester, 1 year, Flexible"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

                {/* Compensation Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Compensation Type *
                    </label>
                    <div className="flex gap-6">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                value="paid"
                                checked={compensationType === "paid"}
                                onChange={(e) =>
                                    setCompensationType(e.target.value)
                                }
                                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="ml-2 text-gray-700">Paid</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                value="credit"
                                checked={compensationType === "credit"}
                                onChange={(e) =>
                                    setCompensationType(e.target.value)
                                }
                                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="ml-2 text-gray-700">
                                Course Credit
                            </span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                value="volunteer"
                                checked={compensationType === "volunteer"}
                                onChange={(e) =>
                                    setCompensationType(e.target.value)
                                }
                                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="ml-2 text-gray-700">
                                Volunteer
                            </span>
                        </label>
                    </div>
                </div>

                {/* Compensation Details */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Compensation Details
                    </label>
                    <input
                        type="text"
                        value={compensationDetails}
                        onChange={(e) => setCompensationDetails(e.target.value)}
                        placeholder={
                            compensationType === "paid"
                                ? "e.g., $18/hour"
                                : compensationType === "credit"
                                ? "e.g., 3 credits per semester"
                                : "e.g., Recommendation letter provided"
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

                {/* Remote */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Remote Work *
                    </label>
                    <div className="flex gap-6">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                value="no"
                                checked={isRemote === "no"}
                                onChange={(e) => setIsRemote(e.target.value)}
                                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="ml-2 text-gray-700">
                                On Campus
                            </span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                value="yes"
                                checked={isRemote === "yes"}
                                onChange={(e) => setIsRemote(e.target.value)}
                                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="ml-2 text-gray-700">Remote</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                value="hybrid"
                                checked={isRemote === "hybrid"}
                                onChange={(e) => setIsRemote(e.target.value)}
                                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="ml-2 text-gray-700">Hybrid</span>
                        </label>
                    </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Start Date *
                        </label>
                        <input
                            type="date"
                            required
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Application Deadline *
                        </label>
                        <input
                            type="date"
                            required
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                    >
                        Create Posting
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
