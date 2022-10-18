import http = require('http')
import app from './app';
import port = require('./utils/serverConfig')

const server = http.createServer(app)

server.listen(port.default, () => {
  console.log(`Server running on port ${port.default}`)
});

