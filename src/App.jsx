import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [timer, setTimer] = useState(0);
  const [input, setInput] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const countDownTimer = () => {
    const timeId = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timeId);
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setIntervalId(timeId);
  };

  const handleSet = () => {
    const seconds = parseInt(input);
    if (!isNaN(seconds) && seconds > 0) {
      setTimer(seconds);
      setInput("");
      setIsActive(false); // Ensure the timer is not active after setting
      setIsPaused(false); // Reset paused state
      clearInterval(intervalId); // Clear any existing interval
    }
  };

  const handleStart = () => {
    if (!isActive && timer > 0) {
      // Start only if timer is set
      setIsActive(true);
      setIsPaused(false);
      countDownTimer();
    }
  };

  const handlePause = () => {
    clearInterval(intervalId);
    setIsPaused(true);
    setIsActive(false);
  };

  const handleReset = () => {
    clearInterval(intervalId);
    setTimer(0);
    setIsActive(false);
    setIsPaused(false);
    setInput("");
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800">

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Countdown Timer
        </h1>
        <div className="flex items-center mb-6">
          <input
            type="number"
            className="flex h-9 w-full border bg-transparent px-3 py-1 text-sm shadow-sm flex-1 mr-4 rounded-xl border-gray-300"
            placeholder="Enter duration in seconds"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleSet}
            className="inline-flex items-center justify-center rounded-xl text-sm font-medium border shadow-sm h-9 px-4 py-2 bg-gray-700 text-white"
          >
            Set
          </button>
        </div>
        <div className="text-6xl font-bold text-gray-800 mb-8 text-center">
          {formatTime(timer)}
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleStart}
            className="inline-flex items-center justify-center rounded-xl text-sm font-medium border shadow-sm h-9 px-4 py-2 bg-gray-700 text-white"
          >
            {!isPaused ? 'Start' : 'Resume'}
          </button>
          <button
            onClick={handlePause}
            className="inline-flex items-center justify-center rounded-xl text-sm font-medium border shadow-sm h-9 px-4 py-2 bg-gray-700 text-white"
            disabled={!isActive}
          >
            Pause
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center rounded-xl text-sm font-medium border shadow-sm h-9 px-4 py-2 bg-gray-700   text-white"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
