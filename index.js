const http =require('http');
const app = require ('./app');
const PORT = 5002;

const server = http.createServer(app);


server.listen(PORT, ()=>{
    console.log(`App is started on port ${PORT}`)
})
