import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Question({
  question,
  questionIndex,
  handleAnswer,
  selectedAnswer,
}) {
  // Function to detect and render code snippets
  const renderQuestion = (text) => {
    if (text.startsWith("```java")) {
      const code = text
        .replace(/```java|```/g, "")
        .trim()
        .replace(/;(?!\s*\n)/g, ";\n")
        .replace(/\?(?!.*\?)/, "?\n");

      return (
        <div className="w-full overflow-auto">
          <SyntaxHighlighter
            language="java"
            style={oneDark}
            customStyle={{
              maxHeight: "300px", // Adjust as needed
              overflow: "auto",
              fontSize: "14px", // Adjust font size
              padding: "12px",
              borderRadius: "8px",
              maxWidth: "100%", // Ensure it does not overflow
              boxSizing: "border-box", // Include padding and border in the element's total width and height
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      );
    }
    return (
      <p className="text-lg font-semibold text-gray-800 text-justify">{text}</p>
    );
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mx-auto">
      {renderQuestion(question.question)}
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
