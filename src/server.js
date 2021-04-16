const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")
const { join } = require("path")

// Usando template engine
server.set("view engine", "ejs")
// Mudar localização da pasta views
server.set("views", join(__dirname, "views"))
// Habilitar arquivos staticos
server.use(express.static("./public"))
// Habilitando req.body
server.use(express.urlencoded({ extended: true }))
// Usando rotas
server.use(routes)

const PORT = 3333
server.listen(PORT, ()=>
  console.log("Running server on port " + PORT + "...")
)