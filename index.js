import * as http from 'http';

const serviceName = process.env.K_SERVICE || "log-request";
const port = process.env.PORT || 8080;

function returnPayload(response, payload) {
  console.log(`${serviceName} received a request:`);
  console.log(JSON.stringify(payload));
  response.end(JSON.stringify(payload));
}

const server = http.createServer(async (request, response) => {
  const payload = {
    method: request.method,
    url: request.url,
    headers: request.headers,
  }

  if(request.method === 'POST') {
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      payload.body = body;
      returnPayload(response, payload);
    });
  } else {
    return returnPayload(response, payload);
  }
});
server.listen(port, () => console.info(`${serviceName} is listening on port ${port}`));