
const popupConfirmationButton = document.getElementById("reload-after-pop-up")
popupConfirmationButton.addEventListener("click", () => {
    window.location.reload()
    return
})

// @ /stations

const searchInputStations = document.getElementById("search-input-stations")

const searchThroughStations = () => {
    const table = document.getElementById("stations-list")
    const tr = table.getElementsByTagName("tr")

    const filter = searchInputStations.value.toUpperCase()

    for (var i = 0; i < tr.length; i++) {
        const td0 = tr[i].getElementsByTagName("td")[0] // id
        const td1 = tr[i].getElementsByTagName("td")[1] // name
    
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

searchInputStations.addEventListener("keyup", () => {
    searchThroughStations()
    return
})

