const SUPABASE_URL = 'https://shxefkrehmfropbodffn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoeGVma3JlaG1mcm9wYm9kZmZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0MTEzNjMsImV4cCI6MjAzMTk4NzM2M30.Lh9a-T6_mPm52FMUszNM1jROfBhRO2wXX6xpNkrto6Y';
const SUPABASE_TABLE = 'comments';

CommentIsLiked = [];
const userEmail = localStorage.getItem('userEmail');

document.getElementById('comment-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const commentInput = document.getElementById('comment-input');
    const commentText = commentInput.value.trim();

    if (commentText !== '') {
        const comment = {
            text: commentText,
            likes: 0,
            timestamp: new Date().toISOString(),
            user: userEmail
        };

        const response = await fetch(`${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify(comment)
        });

        if (response.ok) {
            alert('Comentario registrado exitosamente!');
            commentInput.value = '';
            fetchComments(); // Actualiza la lista de comentarios después de registrar uno nuevo
        } else {
            alert('Error al registrar el comentario.');
            console.error('Error:', await response.json());
        }
    }
});

async function fetchComments() {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}?select=*&order=id.desc`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
    });

    if (response.ok) {
        const comments = await response.json();
        const commentsContainer = document.getElementById('comments-container');
        commentsContainer.innerHTML = ''; // Limpia la lista antes de actualizar

        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');

            const commentUser = document.createElement('h4');
            commentUser.textContent = comment.user;

            const commentText = document.createElement('p');
            commentText.textContent = comment.text;

            const commentTimestamp = document.createElement('span');
            commentTimestamp.classList.add('timestamp');
            commentTimestamp.textContent = new Date(comment.timestamp).toLocaleString();

            const commentActions = document.createElement('div');
            commentActions.classList.add('comment-actions');

            const likeBtn = document.createElement('span');
            likeBtn.classList.add('like-btn');
            likeBtn.textContent = `👍 ${comment.likes}`;
            likeBtn.onclick = () => likeComment(comment.id, comment.likes);

            commentActions.appendChild(likeBtn);

            commentDiv.appendChild(commentUser);
            commentDiv.appendChild(commentText);
            commentDiv.appendChild(commentTimestamp);
            commentDiv.appendChild(commentActions);

            commentsContainer.appendChild(commentDiv);
        });
    } else {
        console.error('Error al obtener los comentarios:', await response.json());
    }
}

async function likeComment(commentId, currentLikes) {
    const updatedLikes = CommentIsLiked[commentId] ? currentLikes - 1 : currentLikes + 1;

    const response = await fetch(`${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}?id=eq.${commentId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({ likes: updatedLikes })
    });

    if (response.ok) {
        fetchComments(); // Actualiza la lista de comentarios después de actualizar los likes
    } else {
        console.error('Error al actualizar likes:', await response.json());
    }

    if(CommentIsLiked[commentId]){
        CommentIsLiked[commentId]=false;
    } else{
        CommentIsLiked[commentId]=true;
    }
}

// Llama a fetchComments al cargar la página para mostrar los comentarios existentes
document.addEventListener('DOMContentLoaded', fetchComments);