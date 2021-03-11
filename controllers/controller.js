const axios = require("axios")
const API_KEYS = "94b98978f5d58c0ebaa75e9aa73242a1"

const Weather = require("../model/Weather")

exports.renderHomePage = (req, res) => {
    res.render("index", {
        title: "Weather Finder."
    })
}

exports.getWeather = (req, res) => {
    const city = req.body.city

    const weather = new Weather(city)

    weather.validateUserInput()

    if (weather.errors.length) {
        res.render("index", {
            title: "Weather Finder.",
            error: weather.errors.toString()
        })
    } else {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},in&appid=${API_KEYS}&units=metric`



        axios.get(url).then((response) => {
            console.log(response.data)
            if(response.data.cod == 200){
                const { temp: temperture } = response.data.main
                const { name: location } = response.data
                res.render("index", {
                    title: "Weather Finder.",
                    weather: "It is currently " + temperture + " in " + location
                })
            }
            else{
                res.render("index", {
                    title: "Weather Finder.",
                    error: response.data.message.toString()
                })
            }
        }).catch((err) => {
            // console.log(err)
            return
        })
    }
}

exports.renderAboutPage = (req, res) => {
    res.render("about")
}