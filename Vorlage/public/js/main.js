document.querySelectorAll(".completed-checkbox").forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    const id = this.getAttribute("data-id");
    const completed = this.checked;
    fetch(`/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: completed }),
    });
  });
});

const sortByTitleButton = document.querySelector("#sortByTitle");
sortByTitleButton.addEventListener("click", () => {
  window.location.href = `/todos?sortBy=title`;
});

const sortByDueDateButton = document.querySelector("#sortByDueDate");
sortByDueDateButton.addEventListener("click", () => {
  window.location.href = `/todos?sortBy=dueDate`;
});

const sortByCreationDateButton = document.querySelector("#sortByCreationDate");
sortByCreationDateButton.addEventListener("click", () => {
  window.location.href = `/todos?sortBy=creationDate`;
});

const sortByImportanceButton = document.querySelector("#sortByImportance");
sortByImportanceButton.addEventListener("click", () => {
  window.location.href = `/todos?sortBy=importance`;
});

const filterOnCompletedButton = document.querySelector("#filterOnCompleted");
filterOnCompletedButton.addEventListener("click", () => {
  window.location.href = `/todos?isFilterOnCompletedClicked=true`;
});

const changeStyleButton = document.querySelector("#changeStyle");
changeStyleButton.addEventListener("click", () => {
  window.location.href = `/todos?isChangeStyleClicked=true`;
});
