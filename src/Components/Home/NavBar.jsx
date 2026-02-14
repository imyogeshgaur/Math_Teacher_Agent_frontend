import { useState, useEffect } from "react";
import { translations } from "../../lang/langObj";
import "./NavBar.css";

const Navbar = ({
  t,
  language,
  setLanguage,
  logout,
  deleteUser,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [menuOpen]);

  const handleLanguageSelection = (e)=>{
    setLanguage(e.target.value)
    localStorage.setItem("lang",e.target.value)
  }
  return (
    <>
      <nav className="navbar">
        <button className="danger-btn desktop-only" onClick={deleteUser}>
          Delete Account
        </button>

        <h2 className="nav-title desktop-only">{t.welcomeUser}</h2>

        <div className="nav-right desktop-only">
          <select
            value={language}
            onChange={handleLanguageSelection}
            className="select"
          >
            {Object.keys(translations).map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>

          <button className="danger-btn" onClick={logout}>
            {t.logout}
          </button>
        </div>

        <div
          className="hamburger mobile-only"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </div>
      </nav>

      <div
        className={`overlay ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      <div className={`drawer ${menuOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <span>{t.welcomeUser}</span>
          <span className="close-btn" onClick={() => setMenuOpen(false)}>
            ✕
          </span>
        </div>

        <button className="danger-btn" onClick={deleteUser}>
          Delete Account
        </button>

        <select
          value={language}
          onChange={handleLanguageSelection}
          className="select"
        >
          {Object.keys(translations).map((lang) => (
            <option key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </option>
          ))}
        </select>

        <button className="danger-btn" onClick={logout}>
          {t.logout}
        </button>
      </div>
    </>
  );
};

export default Navbar;
