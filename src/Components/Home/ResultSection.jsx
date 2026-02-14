import "../../styles/ResultSection.css";

const ResultSection = ({ t, data }) => {
  return (
    <div className="result">
      <h3>{data.problem_type}</h3>

      <h4>{t.steps}</h4>
      <ul>
        {(data.steps || []).map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>

      <div className="final-answer">
        ✅ {data.final_answer}
      </div>
    </div>
  );
};

export default ResultSection;
