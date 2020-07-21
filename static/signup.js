$(document).ready(function() {

    document.querySelectorAll(".avatar-img").forEach(avatar => {
        avatar.onclick = changeSelectedAvatar
        console.log("signup.js function mapping")
    })
    console.log("signup.js document.ready")
})


function changeSelectedAvatar() {
    const selected = document.getElementById("selected-avatar")
    selected.src = this.src
    console.log("changeSelectedAvatar")
}
