"use client";
export default function Sidebar({
  questions,
  setCurrentQuestion,
  currentQuestion,
}) {
  return (
    <aside className="w-1/5 bg-gray-100 p-4 overflow-y-auto shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Questions</h2>
      {questions.map((_, index) => (
        <button
          key={index}
          className={`block w-full text-left p-2 my-2 rounded-md transition duration-300 ${
            currentQuestion === index
              ? "bg-blue-500 text-white"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
          onClick={() => setCurrentQuestion(index)}
        >
          Question {index + 1}
        </button>
      ))}
    </aside>
  );
}
