import { useEffect, useState } from "react";

const Education = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/getEdu")
      .then((response) => response.json())
      .then((data) => setEducation(data.education))
      .catch((error) => console.error("Error fetching education:", error));
  }, []);

  return (
    <section>
      <h2>Education</h2>
      <ul>
        {education.map((edu, index) => (
          <li key={index}>
            <strong>{edu.degree}</strong> - {edu.institution}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Education;
