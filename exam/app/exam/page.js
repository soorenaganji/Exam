"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import examData from "../../data/exam.json";
import Sidebar from "../components/Sidebar";
import Question from "../components/Question";
import Timer from "../components/Timer";

export default function ExamPage() {
  const router = useRouter();
  const [isOnLastQuestion, setIsOnLastQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(50 * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAnswers = localStorage.getItem("answers");
      const savedTimeLeft = localStorage.getItem("timeLeft");
      const savedIsSessionStarted = localStorage.getItem("isSessionStarted");

      if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
      if (savedTimeLeft) setTimeLeft(parseInt(savedTimeLeft, 10));
      if (savedIsSessionStarted)
        setIsSessionStarted(JSON.parse(savedIsSessionStarted));
    }
  }, []);

  useEffect(() => {
    if (currentQuestion === examData.questions.length - 1) {
      setIsOnLastQuestion(true);
    } else {
      setIsOnLastQuestion(false);
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
    if (typeof window !== "undefined") {
      localStorage.setItem("answers", JSON.stringify(answers));
    }
  }, [answers]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("timeLeft", timeLeft);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "isSessionStarted",
        JSON.stringify(isSessionStarted)
      );
    }
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
    if (typeof window !== "undefined") {
      localStorage.removeItem("answers");
      localStorage.removeItem("timeLeft");
      localStorage.removeItem("isSessionStarted");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
        <button
          className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md md:hidden"
          onClick={toggleSidebar}
        >
          <div className={`hamburger ${isSidebarOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <div
          className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity md:hidden ${
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleSidebar}
        ></div>
        <Sidebar
          questions={examData.questions}
          setCurrentQuestion={setCurrentQuestion}
          currentQuestion={currentQuestion}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <div className="flex-1 p-6 bg-white shadow-lg rounded-lg flex flex-col mt-16">
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
      </div>
    </>
  );
}
