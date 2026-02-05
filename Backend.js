console.log(courses);

const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestions");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  suggestionsBox.innerHTML = "";

  if (!query) {
    suggestionsBox.style.display = "none";
    return;
  }

  const matches = courses.filter(course =>
    course.title.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    suggestionsBox.style.display = "none";
    return;
  }

  matches.forEach(course => {
    const div = document.createElement("div");
    div.className = "suggestion-item";
    div.textContent = course.title;

    div.onclick = () => {
      window.location.href = course.page;
    };

    suggestionsBox.appendChild(div);
  });

  suggestionsBox.style.display = "block";
});




