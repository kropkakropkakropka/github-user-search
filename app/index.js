const button = document.getElementById('search-button');
const input = document.getElementById('input');

const profilePic = document.getElementById('profile');
const username = document.getElementById('username');
const login = document.getElementById('login');
const date = document.getElementById('date');

const userRepos = document.getElementById('repos');
const userFollowers = document.getElementById('followers');
const userFollowing = document.getElementById('following');

const userLocation = document.getElementById('location');
const userBlog = document.getElementById('blog');
const userTwitter = document.getElementById('twitter');
const userCompany = document.getElementById('company');

button.addEventListener('click', () => {
    if (input.value != ""){
        getUserInfo(input.value)
    }
})
input.addEventListener('keydown', (e) =>{
    if(e.key == "Enter"){
        if (input.value != ""){
            getUserInfo(input.value)
        }
    }
})

function getUserInfo(username){
    const url = `https://api.github.com/users/${username}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        displayUserInfo(data);
    })
    .catch(error =>{
        throw error;
    })
}

function displayUserInfo(data){

    profilePic.src = data.avatar_url;
    username.innerText = data.name;
    login.innerText = '@' + data.login;
    date.innerText = data.created_at;

    userRepos.innerText = data.public_repos;
    userFollowers.innerText = data.followers;
    userFollowing.innerText = data.following;

    userLocation.innerText = (data.location == null) ? "Not Available" : data.location;
    userBlog.innerText = (data.blog == "") ? "Not Available" : data.blog;
    userTwitter.innerText = (data.twitter_username == null) ? "Not Available" : data.twitter_username;
    userCompany.innerText = (data.company == null) ? "Not Available" : data.company;
    console.log(data)
}

