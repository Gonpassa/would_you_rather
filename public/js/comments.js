const deleteBtn = document.querySelectorAll('.del');

Array.from(deleteBtn).forEach( elem => {
    elem.addEventListener('click', deleteComment);
});

async function deleteComment() {
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
        location.reload();
    } catch (err) {
        console.log(err);
    }
}