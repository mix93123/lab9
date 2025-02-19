// user-detail.js (สำหรับ user-detail.html)
document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");
    const userDetail = document.getElementById("user-detail");
    
    if (!userId) {
        userDetail.innerHTML = `<p class="error">User ID is missing</p>`;
        return;
    }
    
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) throw new Error("User not found");
        
        const user = await response.json();
        userDetail.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
            <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
            <p><strong>Catchphrase:</strong> ${user.company.catchPhrase}</p>
            <p><strong>Business:</strong> ${user.company.bs}</p>
        `;
        
        document.getElementById("view-posts").addEventListener("click", () => {
            window.location.href = `user-posts.html?id=${user.id}&name=${encodeURIComponent(user.name)}`;
        });
    } catch (error) {
        userDetail.innerHTML = `<p class="error">${error.message}</p>`;
    }
});