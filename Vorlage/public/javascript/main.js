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
