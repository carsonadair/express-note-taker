noteTitle = document.querySelector(".note-title");
noteText = document.querySelector(".note-textarea");
saveButton = document.querySelector(".save-note");
newButton = document.querySelector(".new-note");
noteList = document.querySelectorAll(".list-container .list-group");

const show = (elem) => {
  elem.style.display = "inline";
};
const hide = (elem) => {
  elem.style.display = "none";
};

let currentNote = {};

const getNotes = () =>
  fetch("/api/notes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

const saveNote = (note) =>
  fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

const rendercurrentNote = () => {
  if (currentNote.id) {
    noteTitle.setAttribute("readonly", true);
    noteText.setAttribute("readonly", true);
    noteTitle.value = currentNote.title;
    noteText.value = currentNote.text;
  } else {
    noteTitle.removeAttribute("readonly");
    noteText.removeAttribute("readonly");
    noteTitle.value = "";
    noteText.value = "";
  }
};

const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  saveNote(newNote).then(() => {
    display();
    rendercurrentNote();
  });
};

const handleNoteDelete = (e) => {
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute("data-note")).id;

  if (currentNote.id === noteId) {
    currentNote = {};
  }

  deleteNote(noteId).then(() => {
    display();
    rendercurrentNote();
  });
};

const handleNoteView = (e) => {
  e.preventDefault();
  currentNote = JSON.parse(e.target.parentElement.getAttribute("data-note"));
  rendercurrentNote();
};

const handleNewNoteView = () => {
  currentNote = {};
  rendercurrentNote();
};


const showAllNotes = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === "/notes") {
    noteList.forEach((el) => (el.innerHTML = ""));
  }

  let noteListItems = [];

  const createList = (text, deleteButton = true) => {
    const listEl = document.createElement("li");
    listEl.classList.add("list-group-item");

    const spanEl = document.createElement("span");
    spanEl.classList.add("list-item-title");
    spanEl.innerText = text;
    spanEl.addEventListener("click", handleNoteView);

    listEl.append(spanEl);

    if (deleteButton) {
      const deleteButtonEl = document.createElement("i");
      deleteButtonEl.classList.add(
        "fas",
        "fa-trash-alt",
        "float-right",
        "text-danger",
        "delete-note"
      );
      deleteButtonEl.addEventListener("click", handleNoteDelete);

      listEl.append(deleteButtonEl);
    }

    return listEl;
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(createList("No saved Notes", false));
  }

  jsonNotes.forEach((note) => {
    const li = createList(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  if (window.location.pathname === "/notes") {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

const display = () => getNotes().then(showAllNotes);

saveButton.addEventListener("click", handleNoteSave);
newButton.addEventListener("click", handleNewNoteView);
noteTitle.addEventListener("keyup", handleRenderSaveBtn);
noteText.addEventListener("keyup", handleRenderSaveBtn);

display();
