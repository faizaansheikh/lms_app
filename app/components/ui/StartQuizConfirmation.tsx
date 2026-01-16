import React, { useState } from 'react';

type Props = {
    quizName: string;
    onStart: () => void;
};

const StartQuizConfirmation: React.FC<Props> = ({ quizName, onStart }) => {
    const [showModal, setShowModal] = useState(true);

    const handleStart = () => {
        setShowModal(false);
        onStart(); // start quiz
    };

    return (
        <>


            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center shadow justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full text-center">
                        <h2 className="text-xl font-semibold mb-4">Ready to start?</h2>
                        <p className="mb-6">You are about to start the quiz: <strong>{quizName}</strong></p>
                        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 mb-4 text-start">
                            <h3 className="font-bold mb-2">Please Read Carefully:</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Do not refresh or close the page — your progress will be lost.</li>
                                <li>Do not copy, screenshot, or share questions — all attempts are monitored.</li>
                                <li>Answer each question carefully — you may not be able to change answers later.</li>
                                <li>Ensure a stable internet connection to avoid submission issues.</li>
                                <li>Each question carry equal mark you need to tick maximum correct options to <strong>pass the exam</strong></li>
                                <li>By clicking <strong>Start Quiz</strong>, you acknowledge and agree to these rules.</li>
                            </ul>
                        </div>

                        <div className="flex justify-between mt-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleStart}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
                            >
                                Start Quiz
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default StartQuizConfirmation;
