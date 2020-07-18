$(document).ready(function() {

    // Resizing Messages
    const mql = window.matchMedia('(max-width: 767px)')
    resizeLoginContainer(mql)
    mql.addEventListener('change', resizeLoginContainer)
})


function resizeLoginContainer(mql) {
    const navbar = document.getElementById("navbar")
    const login_page = document.getElementById("login-page")

    const height = window.innerHeight - navbar.offsetHeight
    login_page.style.height = height + 'px'

    console.log(`resizeLoginContainer func - : ${window.innerHeight} ${navbar.offsetHeight} ${login_page.offsetHeight} ${height}`)

}

