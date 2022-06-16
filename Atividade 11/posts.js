const addPost = async () => {
    const newPost = {
        "text": document.getElementById('post-text').value,
        "likes": 0
    }
    const config = {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    }
    const response = await fetch('http://localhost:3001/posts', config);
    const post = await response.json();
    appendPost(post);
    const template = document.getElementById('post-template');
    const postElement = document.importNode(template.content, true);
    const postItens = postElement.querySelectorAll('p');
    postItens[0].innerText = post.text;
    postItens[1].innerText = post.likes + " like(s)";
    window.location.assign('http://127.0.0.1:5500');
}

window.onload = () => {
    var btnaddPost = document.getElementById('add-post');
    btnaddPost.onclick = addPost;
    loadPosts();
}
appendPost = (post) => {
    const template = document.getElementById('post-template');
    const postElement = document.importNode(template.content, true);
    const postItens = postElement.querySelectorAll('p')
    postItens[0].innerText = post.text;
    postItens[1].innerText = post.likes + " like(s)";
    document.getElementById('timeline').append(postElement);
}

const loadPosts = async () => {
    const response = await fetch('http://localhost:3001/get')
    const posts = await response.json();
    posts.forEach(post => {
        appendPost(post);
    });
}