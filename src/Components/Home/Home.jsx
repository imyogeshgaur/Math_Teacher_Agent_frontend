import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../config/AuthContext";
import { translations } from "../../lang/langObj";

import Navbar from "./NavBar";
import MainContent from "./MainContent";

import "../../styles/Home.css";

const Home = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const lang = localStorage.getItem("lang");
  const [language, setLanguage] = useState(lang ?? "english");

  const { logout, user, deleteUser } = useAuth();
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;

  const t = translations[language];

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);
      setError("");
      setData(null);

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: input, language }),
      });

      if (!res.ok) throw new Error("API failed");

      const parsed = await res.json();
      setData(parsed);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <Navbar
        t={t}
        language={language}
        setLanguage={setLanguage}
        logout={logout}
        deleteUser={deleteUser}
      />

      <MainContent
        t={t}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
        data={data}
        user={user}
      />
    </div>
  );
};

export default Home;
