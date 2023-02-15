// @ /create-user

const togglePasswordVisibility = () => {
    const passwordElement_1a = document.getElementById("password");
    const passwordElement_1b = document.getElementById("confirm_password");
    const passwordElement_Eye = document.getElementById("eye-icon-password")

    if (passwordElement_1a.type === "password") {
        passwordElement_1a.type = "text";
        passwordElement_1b.type = "text";
        passwordElement_Eye.className = "fa-solid fa-eye"
    } else {
        passwordElement_1a.type = "password";
        passwordElement_1b.type = "password";
        passwordElement_Eye.className = "fa-solid fa-eye-slash"
    }
}

const toggleVisButton = document.getElementById("toggle-vis")
toggleVisButton.addEventListener("click", () => {
    togglePasswordVisibility()
    return
})

// @ /create-user

const hasLowerCase = str => {
    return str.toUpperCase() != str
} 

const hasUpperCase = str => {
    return str.toLowerCase() != str
}

const isNumeric = str => {
    for(var i = 0; i < str.length; i++) {
        if(!isNaN(parseFloat(str[i]))) return true
    }
    return false
}

const checkPasswordValidity = password => {
    const number = document.getElementById("one-number")
    const low = document.getElementById("one-low")
    const upper = document.getElementById("one-up")
    const characterCheck = document.getElementById("eight-ch")

    if (password.length > 8) {
        characterCheck.style.color = "green"
    } else {
        characterCheck.style.color = "var(--font-search-color)"
    }

    if (hasLowerCase(password)) {
        low.style.color = "green"
    } else {
        low.style.color = "var(--font-search-color)"
    }

    if (hasUpperCase(password)) {
        upper.style.color = "green"
    } else {
        upper.style.color = "var(--font-search-color)"
    }

    if (isNumeric(password)) {
        number.style.color = "green"
    } else {
        number.style.color = "var(--font-search-color)"
    }
}

const passwordInputField = document.getElementById("password")
passwordInputField.addEventListener("keyup", () => {
    checkPasswordValidity(passwordInputField.value)
    return
})