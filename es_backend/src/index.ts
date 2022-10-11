const http = require('http')
const serverApp = require('./app')
const conf = require('./utils/serverConfig')

const server = http.createServer(serverApp)

server.listen(conf.PORT, () => {
  console.log(`Server running on port ${conf.PORT}`)
});
