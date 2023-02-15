
const popupConfirmationButton = document.getElementById("reload-after-pop-up")
popupConfirmationButton.addEventListener("click", () => {
    window.location.reload()
    return
})

// @ /connections

const searchInputConnections = document.getElementById("search-input-connections")

const searchThroughConnections = () => {
    const table = document.getElementById("connections-list")
    const tr = table.getElementsByTagName("tr")

    const filter = searchInputConnections.value.toUpperCase()

    for (var i = 0; i < tr.length; i++) {
        const td0 = tr[i].getElementsByTagName("td")[1] // number
        const td1 = tr[i].getElementsByTagName("td")[2] // name
    
        if (td0 && td1) {
            const txtValue0 = td0.textContent || td0.innerText
            const txtValue1 = td1.textContent || td1.innerText
            if (txtValue0.toUpperCase().indexOf(filter) > -1 ||
                txtValue1.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = ""
            } else {
                tr[i].style.display = "none"
            }
        }
    }
}

searchInputConnections.addEventListener("keyup", () => {
    searchThroughConnections()
    return
})

