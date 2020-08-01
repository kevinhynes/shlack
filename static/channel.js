$(document).ready(function() {

    // ensureLogIn()

    // // Resizing Messages
    // const mql = window.matchMedia('(max-width: 767px)')
    // mql.addEventListener('change', resizeMessages)
    // resizeMessages(mql)

    window.onresize = resizeMessages
    resizeMessages()
    scrollToBottom()

    // Connect to websocket
    const socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // When connected, configure buttons
    socket.on('connect', () => {
        const msg_send_btn = document.getElementById("msg-send-btn")
        const post = document.getElementById("msg-input")
        msg_send_btn.onclick = () => {
            socket.emit("message sent", {"body": post.value})
        }
        console.log(post)
        console.log(post.value)
    })

    // When a new vote is announced, add to the unordered list
    socket.on("message received", post => {
        const li = document.createElement('li');
        li.innerHTML = `Vote recorded: ${post.body}`;
        document.getElementById("messages").append(li);
    });

})


// function configSendMessage() {
//     const msg_send_btn = document.getElementById("msg-send-btn")
//     const post = document.getElementById("msg-input")
//     msg_send_btn.onclick = () => {
//         socket.emit("message sent", {"body": post.data})
//     }
//     console.log("configSendMessage")
// }



function resizeMessages() {
    const navbar = document.getElementById('navbar')
    const sidebar = document.getElementById('sidebar')
    const main = document.getElementById('main')
    const messageBox = document.getElementById('message-box')
    if (window.innerWidth < 767) {
        // Width is smaller than 767px
        sidebar.style.height = 'auto'

        const main_height = messageBox.offsetTop - sidebar.offsetTop - sidebar.offsetHeight
        main.style.height = main_height + 'px'
        console.log(`smaller than 767 - main_height ${main_height}`)

    } else {
        // Width is greater than 767px
        const main_height = messageBox.offsetTop - navbar.offsetHeight
        const sidebar_height = window.innerHeight - navbar.offsetHeight
        main.style.height = main_height + 'px'
        sidebar.style.height = sidebar_height + 'px'
        console.log(`larger than 767 - main_height ${main_height}`)

    }
}


function scrollToBottom() {
    const main = document.getElementById("main")
    main.scrollTop = main.scrollHeight - main.clientHeight
}


function ensureLogIn() {
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.response)
            if (!xhr.response['logged_in']) {
                $('#signInModal').modal('show')
                console.log('opening modal')
            } else {
                console.log('not opening modal')
            }
        }
    }
    xhr.open('GET', '/ensureLogIn')
    xhr.send()
}


// function resizeMessages(mql) {
//     console.log('media query received')
//
//     const navbar = document.getElementById('navbar')
//     const sidebar = document.getElementById('sidebar')
//     const main = document.getElementById('main')
//     const messageBox = document.getElementById('message-box')
//
//     if (mql.matches) {
//         // Width is smaller than 767px
//         sidebar.style.height = 'auto'
//
//         const main_height = messageBox.offsetTop - sidebar.offsetTop - sidebar.offsetHeight
//         main.style.height = main_height + 'px'
//         console.log(`smaller than 767 - main_height ${main_height}`)
//     } else {
//         // Width is greater than 767px
//         const main_height = messageBox.offsetTop - navbar.offsetHeight
//         const sidebar_height = window.innerHeight - navbar.offsetHeight
//         main.style.height = main_height + 'px'
//         sidebar.style.height = sidebar_height + 'px'
//         console.log(`larger than 767 - main_height ${main_height}`)
//
//     }
//     console.log(``)
// }
//

// document.addEventListener('DOMContentLoaded', (event) => {
//     document.getElementById('exampleModal').modal('show');
//     console.log('DOM fully loaded and parsed');
// });
