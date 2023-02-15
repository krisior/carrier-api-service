
const popupConfirmationButton = document.getElementById("reload-after-pop-up")
popupConfirmationButton.addEventListener("click", () => {
    window.location.reload()
    return
})

// @ /users

const searchInputUsers = document.getElementById("search-input-users")

const searchThroughUsers = () => {
    const table = document.getElementById("users-list")
    const tr = table.getElementsByTagName("tr")

    const filter = searchInputUsers.value.toUpperCase()

    for (var i = 0; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName("td")[0] // username
    
        if (td) {
            const txtValue = td.textContent || td.innerText
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = ""
            } else {
                tr[i].style.display = "none"
            }
        }
    }
}

searchInputUsers.addEventListener("keyup", () => {
    searchThroughUsers()
    return
})

