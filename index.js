const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.listen(port, function(){
    console.log("Escuchando puerto " + port)
})

let alumnos = [
    {id:1, Nombre: 'Pepe'},
    {id:2, Nombre: 'Luis'},
    {id:3, Nombre: 'Juan'}
]

app.get('/alumnos', (req, res) => {
    res.send(alumnos)
  })

app.get("/alumnos/:id", (req, res) => {
    const alumnoId = parseInt(req.params.id)
    const alumno = alumnos.find((alumno) => alumno.id === alumnoId)
    if (!alumno){
        return res.status(404).send("Usuario no encontrado")
    }
    res.send(alumno)
})

app.post('/alumnos', (req, res) => {
    const {body} = req
    alumnos.push(body);
    res.send("Se agrego alumno")
  })

app.patch("/alumnos/:id", (req, res) => {
    const {body} = req
    const {Nombre} = body
    const {id} = req.params
    

    let alumno = alumnos.find((alum) => alum.id == id)
    alumno.Nombre = Nombre
    res.send("Se actualizo Alumno", + alumno)
})

app.delete("/alumnos/:id", (req, res) => {
    const {id} = req.params
    alumnos = alumnos.filter((alumno) => alumno.id != id);
    res.send("Alumno Eliminado")
})