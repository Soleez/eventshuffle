const http = require('http')
const app = require('./app')
const conf = require('./utils/config')

const server = http.createServer(app)

server.listen(conf.PORT, () => {
  console.log(`Server running on port ${conf.PORT}`);
});
