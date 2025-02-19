// script.js (สำหรับ index.html)
document.addEventListener("DOMContentLoaded", async () => {
    const userList = document.getElementById("user-list");
    
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        
        const users = await response.json();
        userList.innerHTML = users.map(user => `
            <div class="user-card">
                <h2>${user.name}</h2>
                <p>Email: ${user.email}</p>
                <a href="user-detail.html?id=${user.id}" class="details-btn">ดูรายละเอียด</a>
            </div>
        `).join("");
    } catch (error) {
        userList.innerHTML = `<p class="error">${error.message}</p>`;
    }
});