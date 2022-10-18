import http = require('http')
import serverApp from './app';
import port = require('./utils/serverConfig')

const server = http.createServer(serverApp)

server.listen(port.default, () => {
  console.log(`Server running on port ${port.default}`)
});
