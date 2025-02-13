// components/Question.js
export default function Question({
  question,
  questionIndex,
  handleAnswer,
  selectedAnswer,
}) {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <p className="text-lg font-semibold text-gray-800 text-justify ">
        {question.question}
      </p>
      <div className="mt-4 space-y-4">
        {question.choices?.map((choice, index) => (
          <label key={index} className="block cursor-pointer">
            <input
              type="radio"
              name={`question-${questionIndex}`}
              value={choice}
              checked={selectedAnswer === choice}
              onChange={() => handleAnswer(questionIndex, choice)}
              className="hidden"
            />
            <span
              className={`block p-4 rounded-md border ${
                selectedAnswer === choice
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-200 hover:bg-gray-300 border-gray-300"
              }`}
            >
              {choice}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
