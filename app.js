const express = require("express")

const hbs = require('hbs')

const router = require("./routes/web")

const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static("./public"))

app.set("views", "views")
app.set('view engine', 'hbs')

app.use("/", router)

app.listen(3000, () => {
    console.log("Runnig at port 3000")
})