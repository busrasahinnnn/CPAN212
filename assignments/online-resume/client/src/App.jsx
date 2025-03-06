import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [overview, setOverview] = useState({ name: "", bio: "", about: [] });
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/getOverview").then((res) => setOverview(res.data));
    axios.get("http://localhost:8000/getEdu").then((res) => setEducation(res.data));
    axios.get("http://localhost:8000/getExp").then((res) => setExperience(res.data));
    axios.get("http://localhost:8000/getCertifications").then((res) => setCertifications(res.data));
  }, []);

  return (
    <div className="container">
      {/* Header Section */}
      <header>
        <h1>{overview.name}</h1>
        <p>{overview.bio}</p>
      </header>

      {/* About Section */}
      <section>
        <h2>About Me</h2>
        <ul>
          {overview.about.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </section>

      {/* Education Section */}
      <section>
        <h2>Education</h2>
        <ul>
          {education.map((edu, index) => (
            <li key={index}>
              <strong>{edu.degree}</strong> - {edu.institution} ({edu.year || "N/A"})
            </li>
          ))}
        </ul>
      </section>

      {/* Experience Section */}
      <section>
        <h2>Experience</h2>
        <ul>
          {experience.map((exp, index) => (
            <li key={index}>
              <strong>{exp.role}</strong> at {exp.company} ({exp.years})
            </li>
          ))}
        </ul>
      </section>

      {/* Certifications Section */}
      <section>
        <h2>Certifications</h2>
        <ul>
          {certifications.map((cert, index) => (
            <li key={index}>{cert}</li>
          ))}
        </ul>
      </section>

      {/* Footer */}
      <div className="footer">© 2025 Busra Sahin. All Rights Reserved.</div>
    </div>
  );
}

export default App;
