document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");
    const userName = params.get("name");
    const postsList = document.getElementById("posts-list");
    document.getElementById("user-name").textContent = userName || "Unknown";
    
    if (!userId) {
        postsList.innerHTML = `<p class="error">User ID is missing</p>`;
        return;
    }
    
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch posts");
        
        const posts = await response.json();
        postsList.innerHTML = posts.map(post => `
            <div class="post-card">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </div>
        `).join("");
    } catch (error) {
        postsList.innerHTML = `<p class="error">${error.message}</p>`;
    }
});