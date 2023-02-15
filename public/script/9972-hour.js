const clockComponent = document.getElementById("clock-component")

const checkDay = date => {
    day = date.getDay()
    
    switch (day) {
        case 0: return "niedziela"
        case 1: return "poniedziałek"
        case 2: return "wtorek"
        case 3: return "środa"
        case 4: return "czwartek"
        case 5: return "piątek"
        case 6: return "sobota"
        default: return ""
    }
}


const currentTime = () => {
    var date = new Date()

    var hh = date.getHours()
    var mm = date.getMinutes()
    var ss = date.getSeconds()

    hh = (hh < 10) ? "0" + hh : hh
    mm = (mm < 10) ? "0" + mm : mm
    ss = (ss < 10) ? "0" + ss : ss
      
    var time = `<span style="font-size: 0.3rem"> ${ checkDay(date) }</span> <br> ${ hh }:${ mm }:${ ss }`
  
    clockComponent.innerHTML = time

    const t = setTimeout(() => { currentTime() }, 1000)
  
}
  
clockComponent.addEventListener("load", currentTime())
  