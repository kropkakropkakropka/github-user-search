//const userFromInput = document.getElementById("username").value;
const button = document.getElementById("search-button");

function requestUserInfo(username){
    const xhr = new XMLHttpRequest();

    const url = `https://api.github.com/users/${username}`;

    xhr.open('GET', url, true);

    xhr.onload = function() {
    
        const data = JSON.parse(this.response);

        const avatar = data.avatar_url;
        const name = data.name;
        const login = data.login;
        const createDate = data.created_at;
        
    }

    xhr.send()
}

function getUserInfo(){
    const userFromInput = document.getElementById("username").value;
    requestUserInfo(userFromInput)
}

