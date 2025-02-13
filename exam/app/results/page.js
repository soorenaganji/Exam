"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import examData from "../../data/exam.json";

export default function Results() {
  const router = useRouter();
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState({
    correct: [],
    incorrect: [],
    unanswered: [],
  });

  useEffect(() => {
    const savedAnswers = localStorage.getItem("answers");
    if (savedAnswers) {
      setUserAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  useEffect(() => {
    if (examData.questions.length > 0) {
      const correct = [];
      const incorrect = [];
      const unanswered = [];

      examData.questions.forEach((question, index) => {
        const correctAnswer = question.correctAnswer;
        if (userAnswers[index] === undefined) {
          unanswered.push(index + 1);
        } else if (userAnswers[index] === correctAnswer) {
          correct.push(index + 1);
        } else {
          incorrect.push(index + 1);
        }
      });

      setResults({ correct, incorrect, unanswered });
    }
  }, [userAnswers]);

  const totalQuestions = examData.questions.length;
  const correctCount = results.correct.length;
  const incorrectCount = results.incorrect.length;
  const unansweredCount = results.unanswered.length;

  const gradeOutOf50 = (correctCount / totalQuestions) * 50;
  const gradeOutOf100 = (correctCount / totalQuestions) * 100;
  const gradeOutOf30 = (correctCount / totalQuestions) * 30;

  const handleTerminateSession = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("answers");
      localStorage.removeItem("timeLeft");
      localStorage.removeItem("isSessionStarted");
    }
  };

  const handleRetakeExam = () => {
    handleTerminateSession();
    router.push("/exam");
  };

  return (
    <div className="p-6 text-center bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Exam Completed!
        </h2>
        <div className="mb-6">
          <p className="text-xl mb-2">
            Grade out of 50:{" "}
            <span className="font-semibold">{gradeOutOf50.toFixed(2)}</span>
          </p>
          <p className="text-xl mb-2">
            Grade out of 100:{" "}
            <span className="font-semibold">{gradeOutOf100.toFixed(2)}</span>
          </p>
          <p className="text-xl mb-2">
            Grade out of 30:{" "}
            <span className="font-semibold">{gradeOutOf30.toFixed(2)}</span>
          </p>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Results:
          </h3>
          <div className="text-lg mb-2 max-h-32">
            <p>Correct Answers:</p>
            <div className="font-semibold px-16 py-4 mx-auto">
              {results.correct.join(", ")}
            </div>
          </div>
          <div className="text-lg mb-2 max-h-32">
            <p>Incorrect Answers:</p>
            <div className="font-semibold px-16 py-4 mx-auto">
              {results.incorrect.join(", ")}
            </div>
          </div>
          <div className="text-lg mb-2 max-h-32">
            <p>Unanswered Questions:</p>
            <div className="font-semibold px-16 py-4 mx-auto">
              {results.unanswered.join(", ")}
            </div>
          </div>
        </div>
        <button
          onClick={handleRetakeExam}
          className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Retake Exam
        </button>
      </div>
    </div>
  );
}
