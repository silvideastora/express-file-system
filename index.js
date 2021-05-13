
const fs = require('fs')
const express = require('express')
const { json, response } = require('express')
const server = express()

// middleware
server.use(express.json())

server.get('/hola', (request, response) => {
    response.write('GET / Hola')
    response.end()
})


  server.post('/koders', (request,response) => {
    const name = request.body.name 
    const gender = request.body.gender

    const newKoder = { name, gender }

    const content = fs.readFileSync('koders.json', 'utf8')
    const json = JSON.parse(content)
    json.koders.push(newKoder)
    fs.writeFileSync('koders.json', JSON.stringify(json, null, 2),'utf8')
    response.json({
      success : true
    })
      


  })
  server.put('/koders',(request,response) => {
    response.write('Aquí puedes sustituir un koder')
    response.end()
  })

  server.get('/koders', (request, response) => {
      response.status()
      response.json({message: 'Aqui esta la lista de koder'})
  })

// /koders/1
// /koders/100
// /koders/abc
server.patch('/koders/:id', ( request , response) =>{
  const id = parseInt(request.params) // string
  const name = request.body.name

  const content = fs.readFileSync('koders.json', 'utf8')
  const json = JSON.parse(content)

  const newKoders = json.koders.reduce((koders, koderActual) => {
    if(id === koderActual.id) {
      koderActual.name = name
    }
    return [
      ...koders,
      koderActual
    ]
  }, [])

  json.koders = newKoders
  fs.writeFileSync('koders.json', JSON.stringify(json, null , 2), 'utf8')
response.json({
  success: true
})
})
// Practica
/* 
Crear un endpoint para borrar y otro para consultar por id
DELETE /koders/:id
GET /koders/:id
*/

server.delete('/koders/:id',(request, response) =>{
  const id = parseInt(request.params.id)
  const content = fs.readFileSync('koders.json', 'utf8')
  const json = JSON.parse(content)
  const newkoders = json.koders.filter(koder => koder.id !== id)
  json.koders = newkoders
  fs.writeFileSync('koders.json', JSON.stringify(json.koders, null, 2))
  response.json(newkoders)

 })



  server.listen(8080, () => {
    console.log('Server listening in port 8080')
  })


  // practica fs + express
  /*
  //Get /koders -> regresa un json con una lista de koders
  La lista de koders viene de un archivo
  */