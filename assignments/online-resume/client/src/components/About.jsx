import { useEffect, useState } from "react";

const About = () => {
  const [about, setAbout] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/getOverview")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched About Data:", data); // Debugging
        setAbout(data.about || []); // Ensure about exists
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching about:", error);
        setError("Failed to fetch about section.");
        setLoading(false);
      });
  }, []);

  return (
    <section>
      <h2>About Me</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : about.length > 0 ? (
        <ul>
          {about.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      ) : (
        <p>No about information available.</p>
      )}
    </section>
  );
};

export default About;
