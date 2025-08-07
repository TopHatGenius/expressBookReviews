const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Task 1 inprog - DONE it seems
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN - Task 2 - DONE
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  
  return res.status(200).json(books[isbn]);
 });
  
// Get book details based on author - Task 3
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const authorBooks = [];

  for (let bookID in books) {
    if (books[bookID].author === author) {
        authorBooks.push(books[bookID]);
    }
   }

   if (authorBooks.length > 0) {
    return res.status(200).json(authorBooks);
   } else {
    return res.status(404).json({message: "Invalid author"});
   }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
