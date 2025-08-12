const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

/*/ Task 1 (Without async-await)
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4));
}); */

// Task 10 (Task 1 using async-await)
public_users.get('/', async function (req, res) {
    try {
        const getAllBooks = () => Promise.resolve(books);
        const bookList = await getAllBooks();
        console.log("Books got");
        res.send(JSON.stringify(bookList, null, 4));
    } catch (err) {
        console.log("Error:", err);
        return res.status(500).json({message: "Could not get books"});
    }
});

/*/ Task 2 - Get books by ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  
  return res.status(200).json(books[isbn]);
 }); */

 //Task 11 (Task 2 using async-await)
 public_users.get('/isbn/:isbn', async function (req, res) {
    try {
        const isbn = req.params.isbn;
        const getBookByISBN = (isbn) => Promise.resolve(books[isbn]);
        const book = await getBookByISBN(isbn);
        
        return res.status(200).json(book);
    } catch (err) {
        return res.status(500).json({message: "Could not get book by ISBN"});
    }
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

// Get all books based on title - Task 4
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  const titleBooks = [];

  for (let bookID in books) {
    if (books[bookID].title === title) {
        titleBooks.push(books[bookID]);
    }
  }

  if (titleBooks.length > 0) {
    return res.status(200).json(titleBooks);
  } else {
    return res.status(404).json({message: "Title not found"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;

    if  (books[isbn]) {
        return res.status(200).json(books[isbn].reviews);
    } else {
        return res.status(404).json({message: "Book not found"});
    }
});

module.exports.general = public_users;
