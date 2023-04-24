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

function addNewComment(question, comment) {
  const commentText = document.getElementById("comment").value;
  const commentList = document.querySelector("ul");
  const newComment = document.createElement("li");
  newComment.classList.add("border-b", "border-gray-200", "py-2");
  newComment.textContent = commentText;
  commentList.appendChild(newComment);
  document.getElementById("comment").value = "";
}

let hasVoted = false;
function vote(option, question) {
  if (hasVoted) {
    return;
  }

  const voteBtn1 = document.getElementById("option1");
  const voteBtn2 = document.getElementById("option2");
  const voteCount1btn = document.getElementById("voteCount1");
  const voteCount2btn = document.getElementById("voteCount2");

  if (option === "option1") {
    question.voteCount1 += 1;
    voteCount1btn.textContent = question.voteCount1;
  } else if (option === "option2") {
    question.voteCount2 += 1;
    voteCount2btn.textContent = question.voteCount2;
  }

  hasVoted = true;
  voteBtn1.disabled = true;
  voteBtn2.disabled = true;
  const voteCount1Display = document.getElementById("voteCount1");
  const voteCount2Display = document.getElementById("voteCount2");
  const totalVotesDisplay = document.getElementById("totalVotes");

  // Set the display property to block
  voteCount1Display.style.display = "block";
  voteCount2Display.style.display = "block";
  totalVotesDisplay.style.display = "block";
}


function nextQuestion(questionData) {
  // need to access the question object from the "server", which is just in the controller hardcoded as a questions variable
  const question = questionData;
  const voteCount1btn = document.getElementById("voteCount1");
  const voteCount2btn = document.getElementById("voteCount2");
  const voteBtn1 = document.getElementById("option1");
  const voteBtn2 = document.getElementById("option2");

}
