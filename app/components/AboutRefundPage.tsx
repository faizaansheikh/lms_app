"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AboutRefundPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const queryTab = searchParams.get("q");

    const [activeTab, setActiveTab] = useState<"about" | "refund">("refund");

    // Set tab based on query param


    // Update URL when tab changes
    const handleTabChange = (tab: "about" | "refund") => {
        setActiveTab(tab);
        router.push(`?q=${tab}`, { scroll: false });
    };

    useEffect(() => {
       
        if (queryTab === "refund") {
            setActiveTab("refund");
        } else {
            setActiveTab("about");
        }
    }, [queryTab]);
    return (
        <div className="min-h-screen bg-gray-50 pt-4 mt-32 mb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">

                {/* Content */}
                <div className="px-6 sm:px-10 py-12 text-gray-700 leading-relaxed">
                    <h1 className="text-3xl pb-8 sm:text-4xl font-bold tracking-wide">
                        {activeTab === "about" ? "About" : "Student Refund Policy"}
                    </h1>
                    {activeTab === "about" && (
                        <div className="space-y-12">

                            <section>
                                <h2 className="text-2xl font-bold mb-6 mt-2">
                                    Your Gateway to a Rewarding Healthcare Career
                                </h2>
                                <p>
                                    At Chrissy Medical Academy, we believe that entering the medical
                                    field shouldn't take years of schooling and mountain-sized student
                                    debt. We are dedicated to providing fast-track, high-quality
                                    medical training designed to get you out of the classroom and into
                                    a meaningful career in weeks, not years.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold mb-6">
                                    Our Mission
                                </h2>
                                <p>
                                    Our mission is simple: To empower the next generation of healthcare heroes.
                                    Whether you are starting your very first job in medicine or looking
                                    to add new certifications to your resume, we provide the tools,
                                    hands-on skills, and confidence you need to pass your state exams
                                    and excel in the workplace.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold mb-6">
                                    Why Choose Chrissy Medical Academy?
                                </h2>
                                <ul className="list-disc pl-6 space-y-3">
                                    <li><strong>Expert Instruction:</strong> Courses taught by experienced professionals.</li>
                                    <li><strong>Flexible Learning:</strong> In-person and online prep courses.</li>
                                    <li><strong>Proven Success:</strong> Focused exam preparation training.</li>
                                    <li><strong>Affordable Excellence:</strong> Competitive tuition rates.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold mb-6">
                                    Our Programs
                                </h2>
                                <ul className="list-disc pl-6 space-y-3">
                                    <li>CNA Prep Training</li>
                                    <li>Med Tech</li>
                                    <li>EKG Technician</li>
                                    <li>CPR & BLS</li>
                                    <li>Phlebotomy & Caregiver Training</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold mb-6">
                                    Start Your Journey Today
                                </h2>
                                <p>
                                    At Chrissy Medical Academy, your success is our success. We take pride
                                    in seeing our graduates land jobs at top-tier hospitals and facilities.
                                </p>
                            </section>

                        </div>
                    )}

                    {activeTab === "refund" && (
                        <div className="space-y-12">

                            <section>
                                <h2 className="text-2xl font-bold mb-6 mt-2">
                                    1. Refund Policy (Digital Products)
                                </h2>
                                <p>
                                    All sales are final. Once you have purchased a course and gained
                                    access to the student portal, no refunds or credits will be issued.
                                </p>
                                <p className="mt-4">
                                    Accessing the course—even if not completed—constitutes a "used"
                                    product under our digital goods policy.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold mb-6">
                                    2. Technical Support
                                </h2>
                                <p>
                                    If you are unable to access your course, contact
                                    <strong> chrissymedical@gmail.com</strong>.
                                </p>
                                <p className="mt-4">
                                    Technical issues on the student's end do not qualify for refunds.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold mb-6">
                                    3. Course Access & Expiration
                                </h2>
                                <p>
                                    Access is granted for the duration specified at purchase.
                                    Extensions may include additional fees.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold mb-6">
                                    4. Academic Integrity & Usage
                                </h2>
                                <p>
                                    Sharing login credentials or redistributing materials will result
                                    in termination without refund.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold mb-6">
                                    5. Disclaimer of Results
                                </h2>
                                <p>
                                    We provide prep training but do not guarantee passing scores.
                                    Success depends on individual effort.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold mb-6">
                                    6. Contact Information
                                </h2>
                                <p>Email: chrissymedical@gmail.com</p>
                                <p className="mt-2">
                                    Support Hours: Monday – Friday (24–48 hour response time)
                                </p>
                            </section>

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
