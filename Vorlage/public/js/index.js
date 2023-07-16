function addCheckboxListeners() {
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
}

function setSessionStorageItems() {
  sessionStorage.setItem('sortBy', document.getElementById('sortBy').value);
  sessionStorage.setItem('sortDirection', document.getElementById('sortDirection').value);
}

function addSortEventListeners() {
  const sortCriteria = ['title', 'dueDate', 'creationDate', 'importance'];

  sortCriteria.forEach(criteria => {
    document.getElementById(`sortBy${criteria.charAt(0).toUpperCase() + criteria.slice(1)}`).addEventListener('click', function () {
      updateSort(criteria);
    });
  });
}

function addToggleEventListeners() {
  document.getElementById('filterOnCompleted').addEventListener('click', function () {
    window.location.href = '/toggle-completed-filter';
  });

  document.getElementById('changeStyle').addEventListener('click', function () {
    window.location.href = '/toggle-dark-mode';
  });
}

function updateSort(sortBy) {
  const currentSortBy = sessionStorage.getItem('sortBy');
  const currentSortDirection = sessionStorage.getItem('sortDirection');

  if (sortBy === currentSortBy) {
    const newSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
    sessionStorage.setItem('sortDirection', newSortDirection);
  } else {
    sessionStorage.setItem('sortBy', sortBy);
    sessionStorage.setItem('sortDirection', 'asc');
  }

  const newSortBy = sessionStorage.getItem('sortBy');
  const newSortDirection = sessionStorage.getItem('sortDirection');
  window.location.href = `/?sortBy=${newSortBy}&sortDirection=${newSortDirection}`;
}

window.onload = function () {
  addCheckboxListeners();
  setSessionStorageItems();
  addSortEventListeners();
  addToggleEventListeners();
};


