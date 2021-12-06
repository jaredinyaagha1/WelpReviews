const axios = require("axios");

async function getBooks(query) {
  let url = "https://www.googleapis.com/books/v1/volumes";
  const resp = await axios.get(url, {
    params: {
      q: query,
      langRestrict: "en",
      printType: "books",
      maxResults: 40,
    },
  });
  let results = await resp.data.items;
  return results;
}

async function getBooksByAuthor(name) {
  let url = "https://www.googleapis.com/books/v1/volumes";
  const resp = await axios.get(url, {
    params: {
      q: `inauthor:${name}`,
      langRestrict: "en",
      printType: "books",
      maxResults: 40,
    },
  });
  let results = await resp.data.items;
  return results;
}

async function getBooksByTitle(title) {
  let url = "https://www.googleapis.com/books/v1/volumes";
  const resp = await axios.get(url, {
    params: {
      q: `intitle:${title}`,
      langRestrict: "en",
      printType: "books",
      maxResults: 40,
    },
  });
  let results = await resp.data.items;
  return results;
}

async function getBooksBySubject(subject) {
  let url = "https://www.googleapis.com/books/v1/volumes";
  const resp = await axios.get(url, {
    params: {
      q: `insubject:${subject}`,
      langRestrict: "en",
      printType: "books",
      maxResults: 40,
    },
  });
  let results = await resp.data.items;
  return results;
}

module.exports = {
  getBooks,
  getBooksByAuthor,
  getBooksByTitle,
  getBooksBySubject,
};
