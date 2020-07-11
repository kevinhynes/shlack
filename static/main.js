$(document).ready(function() {
    // ensureLogIn()
    console.log('DOM fully loaded and parsed')


    // Resizing Messages
    const mql = window.matchMedia('(max-width: 767px)')
    resizeMessages(mql)
    mql.addEventListener('change', resizeMessages)
})


function ensureLogIn() {
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.response)
            if (!xhr.response['logged_in']) {
                $('#exampleModal').modal('show')
                console.log('opening modal')
            } else {
                console.log('not opening modal')
            }
        }
    }
    xhr.open('GET', '/ensureLogIn')
    xhr.send()
}



function resizeMessages(mql) {
    console.log('media query received')
    console.log(`mql.matches ${mql.matches}`)

    const navbar = document.getElementById('navbar')
    const sidebar = document.getElementById('sidebar')
    const main = document.getElementById('main')
    const messageBox = document.getElementById('message-box')

    if (mql.matches) {
        // Width is smaller than 767px
        const main_height = messageBox.offsetTop - sidebar.offsetTop - sidebar.offsetHeight
        console.log(main_height + 'px')
        main.style.height = main_height + 'px'
    } else {
        // Width is greater than 767px
        const main_height = messageBox.offsetTop - navbar.offsetHeight
        const main_top_pos = navbar.offsetTop + navbar.clientHeight
        console.log(main_height + 'px')
        main.style.height = main_height + 'px'
    }

    // main.style.height = '400px';
    console.log(`navbar.offsetTop: ${navbar.offsetTop}, navbar.clientHeight: ${navbar.clientHeight}`)
    console.log(`main.offsetTop: ${main.offsetTop}, main.clientHeight: ${main.clientHeight}`)
    console.log(`messageBox.offsetTop: ${messageBox.offsetTop}, messageBox.clientHeight: ${messageBox.clientHeight}`)

}





// document.addEventListener('DOMContentLoaded', (event) => {
//     document.getElementById('exampleModal').modal('show');
//     console.log('DOM fully loaded and parsed');
// });
