let comments = [];

function addComment() {
    const commentInput = document.getElementById('comment-input');
    const commentText = commentInput.value.trim();

    if (commentText !== '') {
        const comment = {
            text: commentText,
            likes: 0,
            replies: [],
            timestamp: new Date().toLocaleString(),
        };

        comments.push(comment);
        renderComments();
        commentInput.value = '';
    }
}

function renderComments() {
    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.innerHTML = '';

    comments.forEach((comment, index) => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');

        const commentText = document.createElement('p');
        commentText.textContent = comment.text;

        const commentTimestamp = document.createElement('span');
        commentTimestamp.classList.add('timestamp');
        commentTimestamp.textContent = comment.timestamp;

        const commentActions = document.createElement('div');
        commentActions.classList.add('comment-actions');

        const likeBtn = document.createElement('span');
        likeBtn.classList.add('like-btn');
        likeBtn.textContent = `👍 ${comment.likes}`;
        likeBtn.onclick = () => likeComment(index);

        commentActions.appendChild(likeBtn);

        commentDiv.appendChild(commentText);
        commentDiv.appendChild(commentTimestamp);
        commentDiv.appendChild(commentActions);

        commentsContainer.appendChild(commentDiv);
    });
}

function likeComment(index) {
    comments[index].likes++;
    renderComments();
}

comments = [
    {
        text: '¡Encontré a mi mascota!',
        likes: 12,
        replies: [],
        timestamp: '2023-11-12 12:00 PM',
    },
    {
        text: 'La página me ayudó mucho.',
        likes: 4,
        replies: [],
        timestamp: '2023-11-02 2:00 PM',
    },
    {
        text: 'Más como estas páginas.',
        likes: 4,
        replies: [],
        timestamp: '2023-10-21 5:02 PM',
    },
    
];

renderComments();
