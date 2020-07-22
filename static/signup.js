$(document).ready(function() {
    document.querySelectorAll(".avatar-img").forEach(avatar => {
        avatar.onclick = changeSelectedAvatar
    })
    initializeAvatar()
})

const userblue = "#cce5ff"
const userblueborder = "#004085"
const avatar_bg = "#8b878b"
const avatar_border = "#000000"
let prev_selected = null


function changeSelectedAvatar() {
    const selected = document.getElementById("selected-avatar")
    const registration_form = document.getElementById("registration-form")

    if (prev_selected) {
        prev_selected.style.background = avatar_bg
        prev_selected.style.border_color = avatar_border
    }

    prev_selected = this
    selected.src = this.src
    this.style.background = userblue
    this.style.border_color = userblueborder

    registration_form.avatar.value = selected.src
}


function initializeAvatar() {
    console.log("initializeAvatar()")

    const selected = document.getElementById("selected-avatar")
    const registration_form = document.getElementById("registration-form")
    document.querySelectorAll(".avatar-img").forEach(avatar => {
        if (avatar.src === selected.src) {
            prev_selected = avatar
            console.log("initializeAvatar() prev_selected")
            console.log(prev_selected)
            console.log(prev_selected.src)
            console.log(selected.src)
        }
    })

    registration_form.avatar.value = selected.src
}
