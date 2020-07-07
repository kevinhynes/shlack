$(document).ready(function() {
    // $('#exampleModal').modal('show')
    ensureLogIn()
    console.log('DOM fully loaded and parsed')
})

function isUserLoggedIn() {
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
}

async function ensureLogIn() {
    res = await isUserLoggedIn()
    console.log(res)
    if (!res) {
        $('#exampleModal').modal('show')
        console.log('opening modal')
    } else {
        console.log('not opening modal')
    }
}

// document.addEventListener('DOMContentLoaded', (event) => {
//     document.getElementById('exampleModal').modal('show');
//     console.log('DOM fully loaded and parsed');
// });


