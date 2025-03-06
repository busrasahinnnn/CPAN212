import { useEffect, useState } from "react";

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/getCertifications")
      .then((response) => response.json())
      .then((data) => setCertifications(data.certifications))
      .catch((error) => console.error("Error fetching certifications:", error));
  }, []);

  return (
    <section>
      <h2>Certifications</h2>
      <ul>
        {certifications.map((cert, index) => (
          <li key={index}>{cert}</li>
        ))}
      </ul>
    </section>
  );
};

export default Certifications;
