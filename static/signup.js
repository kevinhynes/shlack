$(document).ready(function() {
    document.querySelectorAll(".avatar-img").forEach(avatar => {
        avatar.onclick = changeSelectedAvatar
    })
})

const userblue = "#cce5ff"
const userblueborder = "#004085"
const avatar_bg = "#8b878b"
const avatar_border = "#000000"
let prev_selected = null

function changeSelectedAvatar() {
    const selected = document.getElementById("selected-avatar")

    if (prev_selected) {
        prev_selected.style.background = avatar_bg
        prev_selected.style.border_color = avatar_border
    }
    
    prev_selected = this
    selected.src = this.src
    this.style.background = userblue
    this.style.border_color = userblueborder
}
