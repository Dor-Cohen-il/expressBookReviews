const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ "username": username, "password": password });

      return res.status(201).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(409).json({ message: "User already exists!" });
    }
  }
  return res.status(400).json({ message: "Unable to register user." });
});
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify({books}, null, 4));
});

public_users.get('/users',function (req, res) {
  //Write your code here
  res.send(JSON.stringify({users}, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn.trim();;

  let book = Object.values(books).find((book) => book.isbn === isbn);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json(book);
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;

  let book = Object.values(books).filter((book) => book.author === author);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json(book);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;

  let book = Object.values(books).filter((book) => book.title === title);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json(book);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  let book = Object.values(books).find((book) => book.isbn === isbn);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json(book.reviews);
});

module.exports.general = public_users;

/* AXIOS - ASYNC - AWAIT

let books = require("./booksdb.js");

//USED AXIOS

const axios = require('axios');

//GET ALL BOOKS

const getBooks = async () => {
    try {
        const response = await axios.get('http://localhost:5000/');
        console.log("List Books:");
        console.log(response.data);
    } catch (error) {
        console.error("Error view books:", error.message);
    }
  };
  
  getBooks();

//GET BOOK FOR ISBN

  const getBookByIsbn = async (isbn) => {
      try {
          const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
          console.log("Book Found By ISBN:");
          console.log(response.data);
      } catch (error) {
          console.error("Error view book", error.message);
      }
  };
  

  getBookByIsbn("9783161484100"); // ISBN EXAMPLE

//GET BOOK FOR AUTHOR

  const getBookByAuthor = async (author) => {
    try {
        const response = await axios.get(`http://localhost:5000/author/${author}`);
        console.log("Book Found By Author:");
        console.log(response.data);
    } catch (error) {
        console.error("Error view book/s", error.message);
    }
};


getBookByAuthor("Hans Christian Andersen");// AUTHOR EXAMPLE
  

//GET BOOK FOR TITLE

const getBookByTitle = async (title) => {
    try {
        const response = await axios.get(`http://localhost:5000/title/${title}`);
        console.log("Book Found By Title:");
        console.log(response.data);
    } catch (error) {
        console.error("Error view book/s", error.message);
    }
};


getBookByTitle("The Epic Of Gilgamesh");// TITLE EXAMPLE
 */
