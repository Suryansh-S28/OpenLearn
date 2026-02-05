const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const query = searchInput.value.toLowerCase().trim();

    const match = courses.find(course =>
      course.keywords.some(keyword =>
        keyword.includes(query)
      )
    );

    if (match) {
      window.location.href = match.page;
    } else {
      alert("No course found");
    }
  }
});
