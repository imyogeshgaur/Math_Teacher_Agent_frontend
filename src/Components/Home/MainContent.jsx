import ResultSection from "./ResultSection";
import "../../styles/MainContent.css";

const MainContent = ({
  t,
  input,
  setInput,
  handleSubmit,
  loading,
  error,
  data,
  user,
}) => {
  return (
    <div className="content">
      <div className="card">
        <h1>{t.title}</h1>

        <p className="welcome-text">
          {t.welcome} {user?.attributes?.email}
        </p>

        <textarea
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.placeholder}
          className="textarea"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="primary-btn"
        >
          {loading ? t.solving : t.solve}
        </button>

        {error && <p className="error">{error}</p>}

        {data && <ResultSection t={t} data={data} />}
      </div>
    </div>
  );
};

export default MainContent;
