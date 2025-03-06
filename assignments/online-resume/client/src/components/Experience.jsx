import { useEffect, useState } from "react";

const Experience = () => {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/getExp")
      .then((response) => response.json())
      .then((data) => setExperience(data))
      .catch((error) => console.error("Error fetching experience:", error));
  }, []);

  return (
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
  );
};

export default Experience;
