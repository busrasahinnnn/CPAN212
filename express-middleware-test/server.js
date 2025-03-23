const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Custom middleware for /route_test
const testValidationMiddleware = (req, res, next) => {
    const { test_validation } = req.query;
    console.log(`test_validation: ${test_validation}`);
    console.log(`Route: ${req.originalUrl} | Timestamp: ${new Date().toISOString()}`);
    next(); // Proceed to the next middleware or route handler
};

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to our server");
});

app.get("/route_test", testValidationMiddleware, (req, res) => {
    res.send("Middleware executed successfully");
});

// 404 Handler
app.use((req, res) => {
    res.status(404).send("Page not found");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
