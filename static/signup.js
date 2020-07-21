$(document).ready(function() {
    document.querySelectorAll(".avatar-img").forEach(avatar => {
        avatar.onclick = changeSelectedAvatar
    })
})

const userblue = "#cce5ff"
const userblueborder = "#004085"
const avatar_bg = "#8b878b"
const avatar_border = "#000000"

function changeSelectedAvatar() {
    const selected = document.getElementById("selected-avatar")
    document.querySelectorAll(".avatar-img").forEach(avatar => {
        if (avatar.src === selected.src) {
            avatar.style.background = avatar_bg
            avatar.style.border_color = avatar_border
            console.log("matched avatar")
        }
    })

    selected.src = this.src
    this.style.background = userblue
    this.style.border_color = userblueborder
}
