"use client";
// components/ExamPage.js
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import examData from "./exam.json";
import Sidebar from "./components/Sidebar";
import Question from "./components/Question";
import Timer from "./components/Timer";

export default function ExamPage() {
  const router = useRouter();
  const [isOnLastQuestion, setIsOnLastQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem("answers");
    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTimeLeft = localStorage.getItem("timeLeft");
    return savedTimeLeft ? parseInt(savedTimeLeft, 10) : 50 * 60;
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSessionStarted, setIsSessionStarted] = useState(() => {
    const savedIsSessionStarted = localStorage.getItem("isSessionStarted");
    return savedIsSessionStarted ? JSON.parse(savedIsSessionStarted) : false;
  });

  useEffect(() => {
    if (currentQuestion == 49) {
      setIsOnLastQuestion(true);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
    }
    if (isSessionStarted) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isSessionStarted]);

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem("timeLeft", timeLeft);
  }, [timeLeft]);

  useEffect(() => {
    localStorage.setItem("isSessionStarted", JSON.stringify(isSessionStarted));
  }, [isSessionStarted]);

  const handleAnswer = (questionIndex, answer) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    router.push("/results");
  };

  const handleTerminateSession = () => {
    setIsSessionStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(50 * 60);
    localStorage.removeItem("answers");
    localStorage.removeItem("timeLeft");
    localStorage.removeItem("isSessionStarted");
  };

  return (
    <>
      <div
        className={
          isSessionStarted
            ? "hidden"
            : "w-full flex items-start justify-center mt-16"
        }
      >
        <button
          className="w-36 mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
          onClick={() => setIsSessionStarted(true)}
        >
          Start
        </button>
      </div>
      <div className={isSessionStarted ? "flex h-screen" : "hidden"}>
        <div className="w-4/5 p-6 bg-white shadow-lg rounded-lg flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Question {currentQuestion + 1}
            </h2>
            <Timer timeLeft={timeLeft} />
          </div>
          <Question
            question={examData.questions[currentQuestion]}
            questionIndex={currentQuestion}
            handleAnswer={handleAnswer}
            selectedAnswer={answers[currentQuestion]}
          />
          <div className="flex justify-between mt-6">
            {currentQuestion > 0 && (
              <button
                onClick={() =>
                  setCurrentQuestion((prev) => Math.max(prev - 1, 0))
                }
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
              >
                Previous
              </button>
            )}
            <button
              onClick={() =>
                setCurrentQuestion((prev) =>
                  Math.min(prev + 1, examData.questions.length - 1)
                )
              }
              className={
                isOnLastQuestion
                  ? "hidden"
                  : "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              }
            >
              Next
            </button>
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={handleSubmit}
              className={
                isOnLastQuestion
                  ? "w-full mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                  : "hidden"
              }
            >
              Submit
            </button>
          </div>
          <div className="mt-auto mx-auto">
            <button
              onClick={handleTerminateSession}
              className="w-64 mx-auto mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
            >
              Terminate Session
            </button>
          </div>
        </div>
        <Sidebar
          questions={examData.questions}
          setCurrentQuestion={setCurrentQuestion}
          currentQuestion={currentQuestion}
        />
      </div>
    </>
  );
}
