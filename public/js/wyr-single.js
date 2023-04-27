// Existing code
const commentBtn = document.querySelector("[name='comment-btn']");
const closeModal = document.getElementById("close-modal");
const commentModal = document.getElementById("comment-modal");
const addComment = document.getElementById("add-comment");
const deleteBtn = document.querySelectorAll('.del');

// Add this line to select the form
const commentForm = document.querySelector("form");

let commentOpen = false;

commentBtn.addEventListener("click", () => {
  commentModal.classList.add("show");
  commentModal.classList.remove("hidden");
});

addComment.addEventListener("click", (e) => {
  e.preventDefault(); // Add this line to prevent the default behavior
  createComment();
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
    console.log(data);
    if(option.textContent == data.option1){
      option.innerText = `Votes: ${data.voteCount1}`
      document.querySelector('.secondOption').innerText = `Votes: ${data.voteCount2}`
    }else if(option.textContent == data.option2){
      option.innerText = `Votes: ${data.voteCount2}`
      document.querySelector('.firstOption').innerText = `Votes: ${data.voteCount1}`
    }

  } catch (err) {
    console.log(err);
  }
}

// Deleting comments functionality
Array.from(deleteBtn).forEach( elem => {
  elem.addEventListener('click', deleteComment);
});

async function deleteComment() {
  // I had to modify the .ejs file as well so comments had a data-id attribute with the comment id, so it could be passed into the delete function.
  const commentId = this.parentNode.dataset.id;
  try {
      const response = await fetch('/comments', {
          method: 'delete',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
              'commentId': commentId
          })
      });
      const data = await response.json();
      console.log(data);
      this.parentNode.classList.add('hidden');
  } catch (err) {
      console.log(err);
  }
}

// Creating comments functionality
async function createComment() {
  // Grabbing the question id from the DOM.
  const questionId = document.querySelector('.firstOption').getAttribute('data-id');
  const commentText = document.getElementById("comment").value;
  try {
    const response = await fetch('/comments', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            'commentText': commentText,
            'questionId': questionId
        })
    });
    const data = await response.json();
    console.log(data);
    // Everything else is just creating the new elements with the comment data and appending them to the comment section.
    const commentList = document.querySelector("ul");
    const newComment = document.createElement("li");
    const newUserName = document.createElement("p");
    const newContent = document.createElement("p");
    const newDelete = document.createElement("button");
    const newBreakLine = document.createElement("br");
    newComment.classList.add("flex","flex-row","items-start","w-[100%]","border-b","border-gray-500", "mb-2");
    newComment.setAttribute('data-id', data._id);
    newUserName.classList.add("text-gray-600", "break-words", "w-[33%]");
    newUserName.textContent = data.madeBy;
    newContent.classList.add("text-gray-600", "break-words","w-[33%]");
    newContent.textContent = commentText;
    newDelete.classList.add("del", "w-[33%]");
    newDelete.textContent = '🗑️';
    newBreakLine.classList.add("w-[100%]")
    newDelete.addEventListener('click', deleteComment);
    newComment.appendChild(newUserName);
    newComment.appendChild(newContent);
    newComment.appendChild(newDelete);
    console.log("newComment", newComment)
    commentList.appendChild(newComment);
    // Clears textarea.
    document.getElementById("comment").value = "";
  } catch (err) {
    console.log(err);
  }
}
