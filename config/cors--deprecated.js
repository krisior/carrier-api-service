
const AOR = [
    'http://localhost:3500',
]

const corsoptions_10019 = {
    origin: (origin, callback) => {
        if (AOR.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
}

module.exports = corsoptions_10019