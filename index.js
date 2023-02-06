import * as http from 'http';

const serviceName = process.env.K_SERVICE || "log-request";
const port = process.env.PORT || 8080;

const server = http.createServer(async (req, res) => {
  const payload = {
    method: req.method,
    path: req.path,
    host: req.host,
    protocol: req.protocol,
    headers: req.headers,
    body: req.body,
  }

  console.log(`${serviceName} received a request:`);
  console.log(JSON.stringify(payload));
  return res.end(JSON.stringify(payload));
});
server.listen(port, () => console.info(`${serviceName} is listening on port ${port}`));