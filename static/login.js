$(document).ready(function() {

    // Resizing Messages
    const mql = window.matchMedia('(max-width: 767px)')
    resizeLoginContainer(mql)
    mql.addEventListener('change', resizeLoginContainer)
})


function resizeLoginContainer(mql) {
    const navbar = document.getElementById('navbar')
    const login_container = document.getElementById("login-container")

    const height = window.innerHeight - navbar.offsetHeight
    login_container.style.height = height + 'px'

    console.log(`resizeLoginContainer func - : ${window.innerHeight} ${navbar.offsetHeight} ${login_container.offsetHeight} ${height}`)

}

