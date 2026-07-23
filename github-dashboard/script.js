const Username = document.getElementById("username")
const SearchButton = document.getElementById("searchBtn")
const Message = document.getElementById("message")
const Profile = document.getElementById("profile")



SearchButton.addEventListener("click", () => {
    const username = Username.value.trim()
    if(username===""){
        Message.textContent="enter a valid username"
        Profile.innerHTML = ""
    }else{
        Message.textContent="Searching..."
        Profile.innerHTML = ""
    }
    getusername(username)
})
async function getusername(username){
   try{
        const response = await fetch(` https://api.github.com/users/${username}` );

        if(!response.ok){
            throw new Error("user not found");
        }

        const data = await response.json();

        console.log(data);
        
        Message.textContent="user found";
        displayProfile(data);
    }
    catch(error){
        Message.textContent = error.message;
        Profile.innerHTML="";
    }
}

function displayProfile(data) {
       const {
        avatar_url,
        login,
        name,
        bio,
        location,
        public_repos,
        followers,
        following,
        html_url
    } = data;

    Profile.innerHTML = `
        <div class="profile-card">
            <img
                src="${avatar_url}"
                alt="${login} profile picture"
                width="150"
            >

            <h2>${name || login}</h2>

            <p>@${login}</p>

            <p>${bio || "No bio available"}</p>

            <p>Location: ${location || "Not available"}</p>

            <p>Public repositories: ${public_repos}</p>

            <p>Followers: ${followers}</p>

            <p>Following: ${following}</p>

            <a href="${html_url}" target="_blank">
                View GitHub Profile
            </a>
        </div>
    `;
}