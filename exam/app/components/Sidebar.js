"use client";
export default function Sidebar({
  questions,
  setCurrentQuestion,
  currentQuestion,
  isSidebarOpen,
  toggleSidebar,
}) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 p-4 overflow-y-auto shadow-lg rounded-lg transform transition-transform md:relative md:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        className="block md:hidden mb-4 p-2 bg-gray-800 text-white rounded-md"
        onClick={toggleSidebar}
      >
        <div className="hamburger open">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <h2 className="text-xl font-bold mb-4 text-gray-800">Questions</h2>
      {questions.map((_, index) => (
        <button
          key={index}
          className={`block w-full text-left p-2 my-2 rounded-md transition duration-300 ${
            currentQuestion === index
              ? "bg-blue-500 text-white"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
          onClick={() => {
            setCurrentQuestion(index);
            toggleSidebar();
          }}
        >
          Question {index + 1}
        </button>
      ))}
    </aside>
  );
}
