const bookTable = document.querySelector("#bookTable");
const bookSubmitButton = document.querySelector("#bookSubmit");
const bookForm = document.querySelector("#add-book-form");
const newBookButton = document.querySelector("#new-book");
const tableBody = document.querySelector("#book-table-rows");
let deleteButtons = tableBody.querySelectorAll(".delete-button");
let bookEntryRows = document.querySelectorAll(".book");
let bookCollection = {};

function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);
  // (this.info = function () {
  //   return `${title} by ${author}, ${pages} pages, ${read}`;
  // });
}

const harryPotter = new Book("Harry Potter", "J.K Rowling", 200, true);
const kafka = new Book("Kafka by the Shore", "Murakami", 250, true);
let myLibrary = [harryPotter, kafka];

//creating a new row in the table for each book in the myLibrary array
function render() {
  tableBody.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let bookRow = document.createElement("tr");
    let bookTitle = document.createElement("td");
    let bookAuthor = document.createElement("td");
    let bookPages = document.createElement("td");
    let readStatus = document.createElement("td");
    let deleteButton = document.createElement("button");

    deleteButton.innerHTML = "delete";
    bookTitle.innerHTML = myLibrary[i].title;
    bookAuthor.innerHTML = myLibrary[i].author;
    bookPages.innerHTML = myLibrary[i].pages;
    readStatus.innerHTML = myLibrary[i].read;

    bookRow.appendChild(bookTitle);
    bookRow.appendChild(bookAuthor);
    bookRow.appendChild(bookPages);
    bookRow.appendChild(readStatus);
    bookRow.appendChild(deleteButton);
    bookRow.className = "book";
    deleteButton.className = "delete-button";
    bookRow.setAttribute("data-list", i);
    deleteButton.setAttribute("delete-row", i);
    tableBody.appendChild(bookRow);
  }
  //   bookEntryRows = document.querySelectorAll(".book");

  loopButtons();
}

//populate a new Book object from user inputs, and push to myLibrary array
function bookSubmit(e) {
  e.preventDefault();
  const authorInput = document.querySelector("#author").value;
  const titleInput = document.querySelector("#title").value;
  const pagesInput = document.querySelector("#pages").value;
  const readInput = document.querySelector("#read").checked;

  let newBookSubmission = new Book(
    titleInput,
    authorInput,
    pagesInput,
    readInput
  );
  myLibrary.push(newBookSubmission);
  localStorage.setItem(bookCollection, JSON.stringify(newBookSubmission));
  bookForm.reset();
  render();
  deleteButtons = tableBody.querySelectorAll(".delete-button");
  createDataAttribute(bookEntryRows, "data-list");
  createDataAttribute(deleteButtons, "delete-row");
}

const createDataAttribute = function (array, dataAttribute) {
  for (let i = 0; i < array.length; i++) {
    array[i].setAttribute(dataAttribute, i);
  }
};

//push new Book to myLibrary array
bookForm.addEventListener("submit", bookSubmit);

// //display the new book form when the New Book button is clicked
// newBookButton.addEventListener("click", function () {
//   bookForm.style.display = "unset";
// });

tableBody.addEventListener("click", loopButtons);

function loopButtons() {
  deleteButtons = tableBody.querySelectorAll(".delete-button");

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function () {
      myLibrary.splice(i);
      tableBody.deleteRow(i);
    });
  }

  deleteButtons = tableBody.querySelectorAll(".delete-button");
  bookEntryRows = document.querySelectorAll(".book");
  createDataAttribute(bookEntryRows, "data-list");
  createDataAttribute(deleteButtons, "delete-row");
}

render();
