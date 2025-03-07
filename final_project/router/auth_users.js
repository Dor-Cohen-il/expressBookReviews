const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = {
    "john": { password: "password123" }
};

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Check if both username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Check if user exists
    const user = users[username];
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ username: username }, "your_secret_key_here", { expiresIn: "1h" });

    return res.status(200).json({ message: "Login successful", token: token });
});

regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;

    if (!review) {
        return res.status(400).json({ message: "Review content is required" });
    }

    const book = books[isbn];

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    // Identify the logged-in user (from session or token)
    const username = req.user?.username;  // This depends on how you store authenticated user info

    if (!username) {
        return res.status(403).json({ message: "You must be logged in to post a review" });
    }

    // Save or update review
    book.reviews[username] = review;

    return res.status(200).json({ message: `Review by '${username}' has been added/updated`, reviews: book.reviews });
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
