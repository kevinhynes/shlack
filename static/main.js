$(document).ready(function() {
    ensureLogIn()
    console.log('DOM fully loaded and parsed')
})

async function isUserLoggedIn() {
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        console.log(xhr.response['logged_in'])
        return xhr.response['logged_in']
        }
    }
    xhr.open('GET', '/is_user_logged_in')
    xhr.send()
    // return true
}

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
    xhr.open('GET', '/is_user_logged_in')
    xhr.send()
}


// document.addEventListener('DOMContentLoaded', (event) => {
//     document.getElementById('exampleModal').modal('show');
//     console.log('DOM fully loaded and parsed');
// });


