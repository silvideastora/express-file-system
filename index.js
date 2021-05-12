
const fs = require('fs')
const express = require('express')
const server = express()

// middleware
server.use(express.json())

server.get('/hola', (request, response) => {
    response.write('GET / Hola')
    response.end()
})


  server.post('/koders', (request,response) => {
     /* const cuerpo = request.body
      console.log('body:', cuerpo)
    response.json({
        message: 'ok'
    })*/
    fs.readFile('koders.json', 'utf8', function(error, data){
        
        // Display the file content
        response.json(JSON.parse(data))
    });
      
  })
  server.put('/koders',(request,response) => {
    response.write('Aquí puedes sustituir un koder')
    response.end()
  })

  server.get('/koders', (request, response) => {
      response.status()
      response.json({message: 'Aqui esta ka lista de koder'})
  })
 


  server.listen(8080, () => {
    console.log('Server listening in port 8080')
  })


  // practica fs + express
  /*
  //Get /koders -> regresa un json con una lista de koders
  La lista de koders viene de un archivo
  */