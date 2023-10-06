const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
   res.statusCode = 200
   res.setHeader('Content-Type', 'text/html')
   res.end('<h1>Olá HTTP! Este é o meu primeiro server com HTML</h1><p>Testando minha página</p>')
})

server.listen(port, () => {
   console.log(`Servidor rodando na porta: ${port}`)
})