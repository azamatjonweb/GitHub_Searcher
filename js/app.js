const form = document.querySelector(".form");
const form_input = document.querySelector(".search-btn");
const result = document.querySelector(".result");
const img = document.querySelector(".img");
const firtsName = document.querySelector(".name");
const about = document.querySelector(".bio");
const portfolio = document.querySelector(".portfolio");
const followers = document.querySelector(".followers");
const repositories = document.querySelector(".repos");
const following = document.querySelector(".following");
const projects = document.getElementById("profile-projects");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputValue = form_input.value;
    fetch(`https://api.github.com/users/${inputValue}`)
        .then((res) => res.json())
        .then((data) => GetData(data))
        .catch((error) => console.log(error));
    result.classList.remove("hidden");

    fetch(`https://api.github.com/users/${inputValue}/repos`)
    .then((reposRes) => reposRes.json())
    .then((reposData) => GetRepos(reposData))
    .catch((error) => console.log(error));
});

function GetData(data) {
    img.src = data.avatar_url;
    firtsName.textContent = data.name;
    about.textContent = data.bio;
    portfolio.innerHTML = `<a href=${data.blog}>Portfolio</a>`;
    followers.textContent = `${data.followers} followers`;
    repositories.textContent = `${data.public_repos} repositories`;
    following.textContent = `${data.following} following`;
};

function GetRepos(reposData) {
    reposData.forEach(repos => {
        console.log(repos.name);
        const createRepos = document.createElement("h2");
        projects.appendChild(createRepos);
        createRepos.textContent = repos.name;
        createRepos.innerHTML = `<a href="${repos.html_url}">${repos.name}<a>`
    });
};