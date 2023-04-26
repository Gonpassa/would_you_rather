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

closeModal.addEventListener("click", () => {
  commentModal.classList.add("hidden");
  commentModal.classList.remove("show");
});

// Add an event listener for the 'submit' event on the form
commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewComment();
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
/* function vote(option, question) {
  if (hasVoted) {
    return;
  }

  const optionBtn1 = document.getElementById("option1");
  const optionBtn2 = document.getElementById("option2");
  const voteCount1Display = document.getElementById("voteCount1");
  const voteCount2Display = document.getElementById("voteCount2");

  let voteCount1 = parseInt(
    voteCount1Display.getAttribute("data-vote-count"),
    10
  );
  let voteCount2 = parseInt(
    voteCount2Display.getAttribute("data-vote-count"),
    10
  );

  if (option === "option1") {
    voteCount1 += 1;
    voteCount1Display.setAttribute("data-vote-count", voteCount1);
  } else if (option === "option2") {
    voteCount2 += 1;
    voteCount2Display.setAttribute("data-vote-count", voteCount2);
  }

  // Set the text content for both vote counts
  voteCount1Display.textContent = `${question.option1}-${voteCount1}`;
  voteCount2Display.textContent = `${question.option2}-${voteCount2}`;

  hasVoted = true;
  optionBtn1.disabled = true;
  optionBtn2.disabled = true;

  const totalVotesDisplay = document.getElementById("totalVotes");

  // Set the display property to block
  voteCount1Display.style.display = "block";
  voteCount2Display.style.display = "block";

  const totalVotes = voteCount1 + voteCount2;
  totalVotesDisplay.setAttribute("data-vote-count", totalVotes);
  totalVotesDisplay.textContent = `Total votes: ${totalVotes}`;
  totalVotesDisplay.style.display = "block";

  const mainDiv = document.getElementById("main-div");
  mainDiv.classList.add("slide-out");
}
 */


//Get choices buttons
const choices = document.querySelectorAll('.choice')
Array.from(choices).forEach((choice) => {
  //Add click event to each button
  choice.addEventListener('click', updateVotes)
})

async function updateVotes(){
  //Select p tag inside button
  const option = this.querySelector('p')
  //Get question ID from attribute
  const questionId = option.getAttribute('data-id')

  //update db with comment
  try {
    const response = await fetch('questions/vote', {
        method: 'put',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          'optionSelected': option.textContent,
          'questionId': questionId,
        })
      })
    const data = await response.json()
    if(option.textContent == data.option1){
      option.innerText = `Votes: ${data.voteCount1}`
      document.querySelector('.secondOption').innerText = `Votes: ${data.voteCount2}`
    }else if(option.textContent == data.option2){
      option.innerText = `Votes: ${data.voteCount12}`
      document.querySelector('.firstOption').innerText = `Votes: ${data.voteCount1}`
    }

  } catch (err) {
    console.log(err);
  }
}