function getAllBooks() {
  var jsonString = localStorage.getItem("myBooks");
  var jsonObj = JSON.parse(jsonString);
  console.log(jsonObj);

  for(var i=0; i<jsonObj.books.length; i++) {
    var trow = document.createElement("tr");

    //using innerHTML with template string
    trow.innerHTML = `
        <th scope="row">${jsonObj.books[i].bookId}</th>
        <td>${jsonObj.books[i].bookTitle}</td>
        <td>${jsonObj.books[i].authorName}</td>
        <td>${jsonObj.books[i].publisherName}</td>
        <td class="table_buttons">
          <a 
            class="edit" 
            href="adminBooksEdit.html"
            onclick="rememberBook('${jsonObj.books[i].bookId}', '${jsonObj.books[i].bookTitle}', '${jsonObj.books[i].authorName}', '${jsonObj.books[i].publisherName}')"
            title="Edit Book" 
            data-toggle="tooltip"
          >
            <i class="material-icons">edit</i>
          </a>
          <a 
            class="delete" 
            href="adminBooks.html" 
            onclick="deleteBookHandler('${jsonObj.books[i].bookTitle}')" 
            title="Delete Book" 
            data-toggle="tooltip"
          >
            <i class="material-icons">delete</i>
          </a>
        </td>`;

    document.getElementsByTagName("tbody")[0].appendChild(trow);
  }
}


function addBookHandler() {
  //gather entered form data
  var bookTitle = document.getElementById("addBookTitle").value;
  var bookAuthor = document.getElementById("addBookAuthor").value;
  var bookPublisher = document.getElementById("addBookPublisher").value;
  
  if(bookTitle==="" || bookAuthor==="" || bookPublisher==="") {
    alert("Fields cannot be empty.");
    return;
  }
  if(bookTitle.length>25 || bookAuthor.length>25 || bookPublisher.length>25) {
    alert("Fields cannot exceed 25 characters.");
    return;
  }

  var saveObj = {
    "bookId": 4,
    "bookTitle": bookTitle,
    "authorName": bookAuthor,
    "publisherName": bookPublisher
  };

  var jsonString = localStorage.getItem("myBooks");
  var jsonObj = JSON.parse(jsonString);

  jsonObj.books.push(saveObj);
  localStorage.setItem("myBooks", JSON.stringify(jsonObj));
  
  window.location.href = "adminBooks.html"; //only redirect when successful
}


function rememberBook(id, title, author, publisher) {
  var saveObj = {
    "bookId": id,
    "bookTitle": title,
    "authorName": author,
    "publisherName": publisher
  };

  localStorage.setItem("bookToEdit", JSON.stringify(saveObj));
}


function fillSelectedBook() {
  var objString = localStorage.getItem("bookToEdit");
  var obj = JSON.parse(objString);

  //create the input tags to dynamically inject
  var editTitleInput = document.createElement("input");
  editTitleInput.setAttribute("type", "text");
  editTitleInput.setAttribute("class", "form-control");
  editTitleInput.setAttribute("id", "editBookTitle");
  editTitleInput.setAttribute("value", `${obj.bookTitle}`);
  editTitleInput.setAttribute("placeholder", "Title...");

  var editAuthorInput = document.createElement("input");
  editAuthorInput.setAttribute("type", "text");
  editAuthorInput.setAttribute("class", "form-control");
  editAuthorInput.setAttribute("id", "editBookAuthor");
  editAuthorInput.setAttribute("value", `${obj.authorName}`);
  editAuthorInput.setAttribute("placeholder", "Author...");

  var editPublisherInput = document.createElement("input");
  editPublisherInput.setAttribute("type", "text");
  editPublisherInput.setAttribute("class", "form-control");
  editPublisherInput.setAttribute("id", "editBookPublisher");
  editPublisherInput.setAttribute("value", `${obj.publisherName}`);
  editPublisherInput.setAttribute("placeholder", "Publisher...");

  document.getElementsByClassName("col-sm-10 e1")[0].appendChild(editTitleInput);
  document.getElementsByClassName("col-sm-10 e2")[0].appendChild(editAuthorInput);
  document.getElementsByClassName("col-sm-10 e3")[0].appendChild(editPublisherInput);
}


//for now, update by title
function updateBookHandler() {
  //gather entered form data
  var newBookTitle = document.getElementById("editBookTitle").value;
  var newBookAuthor = document.getElementById("editBookAuthor").value;
  var newBookPublisher = document.getElementById("editBookPublisher").value;

  //get what book to edit via the title
  var objString = localStorage.getItem("bookToEdit");
  var obj = JSON.parse(objString);
  var targetTitle = obj.bookTitle;

  var jsonString = localStorage.getItem("myBooks");
  var jsonObj = JSON.parse(jsonString);

  //find the book to edit in myBooks
  for(var i=0; i<jsonObj.books.length; i++) {
    //do updates
    if(jsonObj.books[i].bookTitle === targetTitle) {
      jsonObj.books[i].bookTitle = newBookTitle;
      jsonObj.books[i].authorName = newBookAuthor;
      jsonObj.books[i].publisherName = newBookPublisher;
    }
  }

  //save back to local storage
  localStorage.setItem("myBooks", JSON.stringify(jsonObj));
}


//for now, delete by title
function deleteBookHandler(title) {
  var jsonString = localStorage.getItem("myBooks");
  var jsonObj = JSON.parse(jsonString);

  for(var i=0; i<jsonObj.books.length; i++) {
    if(jsonObj.books[i].bookTitle === title) {
      jsonObj.books.splice(i, 1);  //remove 1 item from books array which is target obj i
      break;
    }
  }

  localStorage.setItem("myBooks", JSON.stringify(jsonObj));
}