// components/Timer.js
export default function Timer({ timeLeft }) {
  return (
    <p className={ "text-blue-700"}>
      Time Left: {Math.floor(timeLeft / 60)}:
      {(timeLeft % 60).toString().padStart(2, "0")}
    </p>
  );
}
