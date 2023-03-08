// export async function handle({ request, resolve }) {
//   const response = await resolve(request);

//   response.headers['Access-Control-Allow-Origin'] = '*';
//   response.headers['Access-Control-Allow-Headers'] = 'Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization';
//   response.headers['Access-Control-Request-Methods'] = 'GET, POST, PUT, DELETE';
//   response.headers['Access-Control-Allow-Credentials'] = 'true';

//   return response;
// }