document.querySelectorAll(".completed-checkbox").forEach((checkbox) => {
  checkbox.addEventListener("change", function() {
      const id = this.getAttribute("data-id");
      const completed = this.checked;
      fetch(`/todos/${id}`, {
          method: "PUT",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ completed: completed })
      });
  });
});


document.getElementById('filterCompleted').addEventListener('click', () => {
  window.location.href = '/todos?filter=completed';
});


document.getElementById('sortByName').addEventListener('click', () => {
  window.location.href = '/todos?sort=title';
});

let isSortedByTitleAscending = true; // tracking state sorting nach titel

const sortByNameButton = document.querySelector("#sortByName");
sortByNameButton.addEventListener("click", () => {
  window.location.href = `/todos?sort=title&asc=${isSortedByTitleAscending}`;
  isSortedByTitleAscending = !isSortedByTitleAscending; // state anpassen
});

let isSortedByDueDateAscending = true;

const sortByDueDateButton = document.querySelector('#sortByDueDate');
sortByDueDateButton.addEventListener('click', () => {
  window.location.href = `/todos?sort=dueDate&asc=${isSortedByDueDateAscending}`;
  isSortedByDueDateAscending = !isSortedByDueDateAscending;
});