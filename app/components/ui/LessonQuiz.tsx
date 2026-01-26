import { useState } from "react";
import { Progress, Button, message } from "antd";

const LessonQuiz = ({ quiz, updateLessonProgress }: any) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<any>({});
    const [submitted, setSubmitted] = useState(false);

    const total = quiz.questions.length;
    const currentQuestion = quiz.questions[currentIndex];

    const handleSelect = (answer: any) => {
        if (submitted) return;

        setAnswers((prev: any) => ({
            ...prev,
            [currentQuestion._id]: answer
        }));
    };

    const correctCount = quiz.questions.filter((q: any) => {
        const selected = answers[q._id];
        return selected?.Correct === "Correct";
    }).length;


    const percentage = Math.round((correctCount / total) * 100);
    const passed = percentage >= 60;

    const handleReset = () => {
        setCurrentIndex(0);
        setAnswers({});
        setSubmitted(false);
    };
    const handleSubmit = () => {
        if (quiz.locked) {
            setSubmitted(true)
            if (passed) {
                message.success('🎉 Passed! Score: 80%')
                handleReset()
                updateLessonProgress()
            } else {
                message.error('Please watch the lecture again!')
            }
        }else{
            message.warning('You have already completed this quiz!')
        }

    }

 
    return (
        <div className="w-full mx-auto px-4">

            {/* Quiz title */}
            <h2 className="text-xl font-semibold mb-3">
                {quiz.name}
            </h2>

            {/* Progress */}
            {submitted && <Progress
                percent={percentage || 0}
                status={submitted ? (passed ? "success" : "exception") : "active"}
                className="mb-4"
            />}

            {/* Question counter */}
            <p className="text-gray-500 mb-2">
                Question {currentIndex + 1} of {total}
            </p>

            {/* Question */}
            <div className="p-4 border rounded-lg mb-4">
                <p className="font-medium mb-3">
                    {currentQuestion.question}
                </p>

                {currentQuestion.answers.map((a: any, i: any) => {
                    const selected = answers[currentQuestion._id]?.Name === a.Name;

                    return (
                        <div
                            key={i}
                            onClick={() => handleSelect(a)}
                            className={`
                p-2 mb-2 border rounded cursor-pointer
                ${selected ? "bg-blue-100 border-blue-400" : "hover:bg-gray-100"}
                ${submitted && a.Correct === "Correct" ? "bg-green-100 border-green-500" : ""}
                ${submitted && selected && a.Correct !== "Correct" ? "bg-red-100 border-red-500" : ""}
              `}
                        >
                            {a.Name}
                        </div>
                    );
                })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between gap-2">
                <Button
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex(i => i - 1)}
                >
                    Previous
                </Button>

                {currentIndex < total - 1 ? (
                    <Button
                        type="primary"
                        disabled={!answers[currentQuestion._id]}
                        onClick={() => setCurrentIndex(i => i + 1)}
                    >
                        Next
                    </Button>
                ) : (
                    <Button
                        type="primary"
                        disabled={Object.keys(answers).length !== total || submitted}
                        onClick={() => handleSubmit()}
                    >
                        Submit Quiz
                    </Button>
                )}
            </div>

            {/* Result */}
            {/* Result */}
            {submitted && (
                <>
                    <div
                        className={`mt-4 p-4 rounded text-center font-semibold
      ${passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                        {passed
                            ? `🎉 Passed! Score: ${percentage}%`
                            : `❌ Failed! Score: ${percentage}% (60% required)`}
                    </div>

                    {!passed && <div className="flex justify-center mt-3 ">
                        <Button onClick={handleReset} className="bg-green-100" type="primary">
                            Attempt Again
                        </Button>
                    </div>}
                </>
            )}

        </div>
    );
};

export default LessonQuiz;
