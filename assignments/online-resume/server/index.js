const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data
const education = [
  { degree: "Diploma in Computer Programming", institution: "Humber College", year: "May 2024 - Aug2025" },
  { degree: "Bachelor's Degree in Primary School Teaching", institution: "University of Kocaeli", year: "Sept 2010 - Aug 2014" },
  { degree: "Salesforce BootCamp Graduate", institution: "Salesforce BootCamp", year: "Jan 2021 - June 2021" }
];

const experience = [{ role: "UI/UX Designer", company: "Foteza", years: "September 2024-Present" }];

const overview = {
  name: "Busra Sahin",
  bio: "A passionate developer with experience in web technologies.",
  about: [
    "Exceptional Communication and Collaboration: Proven ability to effectively engage with diverse stakeholders, fostering collaboration and ensuring project alignment with organizational goals.",
    "Technical Proficiency in Programming: Skilled in programming languages, including JavaScript (Node.js, React.js), HTML, Python, Java, SQL, Unix, and Linux, enabling robust development across diverse platforms.",
    "Data Expertise: Experienced in designing and implementing data models using Oracle Developer and Oracle Database Modeler, with a solid understanding of statistical concepts for data-driven decision-making.",
    "UI/UX Design and Front-End Development: Adept at creating intuitive designs using Figma, Relume, and Adobe XD, complemented by hands-on front-end development with HTML, CSS, React.js, and Node.js to deliver seamless user experiences.",
    "Agile and Development Methodologies: Experienced in Agile and Waterfall methodologies, with a strong understanding of the development lifecycle, GitHub for version control, and Scrum practices for continuous project improvement."
  ]
};

const certifications = [
  "Salesforce Administrator Certification",
  "Salesforce Developer Certification"
];

// Endpoints
app.get("/getEdu", (req, res) => res.json(education));
app.get("/getExp", (req, res) => res.json(experience));
app.get("/getOverview", (req, res) => res.json(overview));
app.get("/getCertifications", (req, res) => res.json(certifications));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));