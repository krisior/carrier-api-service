
// @ /create-connection

const parent = document.getElementById("via-entries")
        
addMoreViaElements = () => {
    const single = document.getElementById("single-via")
    const info = document.getElementById("additional-add-info")
    single.remove(); info.remove()

    var newViaWrapper = document.createElement("div")
    newViaWrapper.id = "multiple-via"

    for(var i = 0; i < 40; i++) {
        var newVia = document.createElement("span")
        newVia.innerHTML = 
        `<input type="search" list="stations" class="select-input" id="station-via-${i}" name="via${i}" placeholder="wybierz stację pośrednią (${i})">
        <datalist id="stations">
            <% stationsList.forEach(station => { %> 
            <option value="<%= station.name %>"> <%= station.s_id + " --- " + station.name %> </option>
            <% }) %>
        </datalist>
        &nbsp;<input type="time" class="time-connection time-via" id="station-via-Atime${i}" name="viaATime${i}">
        &nbsp;<input type="time" class="time-connection time-via" id="station-via-time${i}" name="viaTime${i}">
        &nbsp;<input type="text" class="platform-track-connection" id="platform${i}" name="viaP${i}" 
        style="margin: 0; height: 28px; width: 50px; font-size: 0.4rem" maxlength="6" placeholder="p / tor">
        `
        newViaWrapper.append(newVia)
    }
    
    parent.append(newViaWrapper)
}

const expandButton = document.getElementById("expand-via-40")
expandButton.addEventListener("click", () => {
    addMoreViaElements()
    return
})