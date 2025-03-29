const container = document.querySelector(".container");
const addButton = document.querySelector(".add");
const dialog = document.querySelector("dialog");
const dialogClose = document.querySelector("dialog button");
const myLibrary = [];

class Book {
  constructor(title, author, pages, read, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = index;
  }

  toggleRead() {
    this.read = this.read == 1 ? 0 : 1;
  }
}

addBookToLibrary("Harry Potter", "JK", "211", 1);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "310", 0);
addBookToLibrary("1984", "George Orwell", "328", 1);
addBookToLibrary("Pride and Prejudice", "Jane Austen", "279", 1);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", "180", 0);
addBookToLibrary("Moby-Dick", "Herman Melville", "635", 1);
addBookToLibrary("War and Peace", "Leo Tolstoy", "1225", 0);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", "281", 1);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", "277", 1);
addBookToLibrary("Brave New World", "Aldous Huxley", "311", 0);
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", "1178", 1);
addBookToLibrary("The Odyssey", "Homer", "351", 0);
addBookToLibrary("The Chronicles of Narnia", "C.S. Lewis", "767", 1);

function addBookToLibrary(title, author, pages, read, index) {
  if (!myLibrary.some((element) => element.title == title)) {
    index = myLibrary.length;
    const book = new Book(title, author, pages, read, index);

    myLibrary.push(book);
    displayLibrary();
  } else {
    alert("Already exists");
  }
}

function displayLibrary() {
  container.innerHTML = "";
  let read;
  myLibrary.forEach((element) => {
    if (element.read == 1) {
      read = "true";
    } else {
      read = "false";
    }
    let card = document.createElement("div");
    card.classList.add("cards");
    card.innerHTML = `
            <h3>${element.title}</h3>
            <ul>
            <li>Author: ${element.author}</li>
            <li>Pages: ${element.pages}</li>
            <li><input type="checkbox" id= read-${element.index} data-index=${
      element.index
    } ${element.read == 1 ? "checked" : ""}>
            <label for="read">Read</label>
            </li>
            </ul>
            <button class="remove" data-index=${element.index}>Remove</button>`;
    console.log(element);
    container.appendChild(card);
  });
}

addButton.addEventListener("click", () => {
  dialog.showModal();
});

dialogClose.addEventListener("click", () => {
  dialog.close();
});

const submit = document.querySelector(".submit");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");
const form = document.querySelector("form");
console.log(form);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) {
  } else {
    addBookToLibrary(title.value, author.value, pages.value, read.value);
    title.value = "";
    author.value = "";
    pages.value = "";
    dialog.close();
  }
});

container.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove")) {
    const bookindex = event.target.dataset.index;
    myLibrary.splice(bookindex, 1);
    updateindex();
    displayLibrary();
  } else if (event.target.id.includes("read-")) {
    const index = event.target.dataset.index;
    myLibrary[index].toggleRead();
  }
});

function updateindex() {
  var index = 0;
  myLibrary.forEach((element) => {
    element.index = index;
    index++;
  });
}
