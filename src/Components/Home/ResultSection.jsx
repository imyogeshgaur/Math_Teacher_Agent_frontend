import { useEffect, useState } from "react";
import "../../styles/ResultSection.css";

const ResultSection = ({ t, data }) => {
  const [typedSteps, setTypedSteps] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    if (!data?.steps) return;

    setTypedSteps([]);
    setCurrentText("");
    setStepIndex(0);
    setShowFinal(false);

    let charIndex = 0;
    let currentStep = 0;

    const interval = setInterval(() => {
      const stepText = data.steps[currentStep];

      if (charIndex < stepText.length) {
        setCurrentText(stepText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setTypedSteps((prev) => [...prev, stepText]);
        setCurrentText("");
        charIndex = 0;
        currentStep++;

        if (currentStep >= data.steps.length) {
          clearInterval(interval);
          setTimeout(() => setShowFinal(true), 500);
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="result">
      <h3>{t.type}{data.problem_type}</h3>

      <h4>{t.steps}</h4>

      <ul className="steps-list">
        {typedSteps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}

        {!showFinal && currentText && (
          <li>
            {currentText} |
          </li>
        )}
      </ul>

      {showFinal && (
        <div className="final-answer">
          🙋‍♂️ {data.final_answer}
        </div>
      )}
    </div>
  );
};

export default ResultSection;
