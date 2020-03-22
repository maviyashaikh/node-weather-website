const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/54d80f224ac027426c3e96fa969bc6b6/' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '?units=si'

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to waether service !', undefined)
        } else if (body.error) {
            callback('Unable to find location  !', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipIntensity + '% chance of rain.')
        }
    })
}

module.exports = forecast