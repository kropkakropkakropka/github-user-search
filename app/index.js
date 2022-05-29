const root = document.documentElement.style;
const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nove","Dec"];
const button = document.getElementById('search-button');
const input = document.getElementById('input');

const profilePic = document.getElementById('profile');
const username = document.getElementById('username');
const login = document.getElementById('login');
const date = document.getElementById('date');
const description = document.getElementById('description')

const userRepos = document.getElementById('repos');
const userFollowers = document.getElementById('followers');
const userFollowing = document.getElementById('following');

const userLocation = document.getElementById('location');
const userBlog = document.getElementById('blog');
const userTwitter = document.getElementById('twitter');
const userCompany = document.getElementById('company');


const info = document.getElementById('info')
const bottomInfo = document.getElementById('bottom-info')
const noUser = document.querySelector('.no-user')

const modeButton = document.getElementById('mode-toggle')

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
    //hmm
    if(data.message == "Not Found"){
        console.log("siema")
        info.style.display = 'none'
        bottomInfo.style.display = 'none'
        noUser.style.display = 'flex';
    }
    else{
        info.style.display = 'grid'
        bottomInfo.style.display = 'flex'
        noUser.style.display = 'none';
        profilePic.src = data.avatar_url;
        username.innerText = (data.name == null) ? "No name was found" : data.name;
        login.innerText = '@' + data.login;
        login.href = `https://api.github.com/users/${data.login}`;
        dateSplitted = data.created_at.split('-');
        date.innerText = `Joined ${dateSplitted[2].split('T')[0]} ${month[dateSplitted[1] - 1]} ${dateSplitted[0]}`;
        description.innerText = (data.bio == null) ? "No bio" : data.bio;
    
        userRepos.innerText = data.public_repos;
        userFollowers.innerText = data.followers;
        userFollowing.innerText = data.following;
    
        userLocation.innerText = (data.location == null) ? "Not Available" : data.location;
        userBlog.innerText = (data.blog == "") ? "Not Available" : data.blog;
        userTwitter.innerText = (data.twitter_username == null) ? "Not Available" : data.twitter_username;
        userCompany.innerText = (data.company == null) ? "Not Available" : data.company;
    }

}

modeButton.addEventListener('click', () =>{
    if(modeButton.classList.contains('dark')){
        lightMode()
        modeButton.classList.remove('dark')
        modeButton.classList.add('light')
    }
    else if (modeButton.classList.contains('light')){
        darkMode()
        modeButton.classList.remove('light')
        modeButton.classList.add('dark')
    }
}) 

function darkMode(){
    root.setProperty("--clr-main", "#141D2F");
    root.setProperty("--clr-second", "#1E2A47");
    root.setProperty("--clr-second-font", "#ced6e0");
    root.setProperty("--clr-main-font", "#ffffff");
}
function lightMode(){
    root.setProperty("--clr-main", "#ced6e0");
    root.setProperty("--clr-second", "#ffffff");
    root.setProperty("--clr-second-font", "#141D2F");
    root.setProperty("--clr-main-font", "#1E2A47");
}