// Existing code
const commentBtn = document.querySelector("[name='comment-btn']");
const closeModal = document.getElementById("close-modal");
const commentModal = document.getElementById("comment-modal");
const addComment = document.getElementById("add-comment");

// Add this line to select the form
const commentForm = document.querySelector("form");

let commentOpen = false;

commentBtn.addEventListener("click", () => {
  commentModal.classList.add("show");
  commentModal.classList.remove("hidden");
});

addComment.addEventListener("click", (e) => {
  e.preventDefault(); // Add this line to prevent the default behavior
  addNewComment();
});

// Add an event listener for the 'submit' event on the form
commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewComment();
});

closeModal.addEventListener("click", () => {
  commentModal.classList.add("hidden");
  commentModal.classList.remove("show");
});

function addNewComment() {
  const comment = document.getElementById("comment").value;
  const commentList = document.querySelector("ul");
  const newComment = document.createElement("li");
  newComment.classList.add("border-b", "border-gray-200", "py-2");
  newComment.textContent = comment;
  commentList.appendChild(newComment);
  document.getElementById("comment").value = "";
}
