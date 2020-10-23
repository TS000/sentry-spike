import { v4 as uuidv4 } from 'uuid';

let newHeaders = new Headers();
newHeaders.append("reqID", uuidv4());

const newInit = {
  method: 'GET',
  headers: newHeaders,
  mode: 'cors',
  cache: 'default'
};

  export const url = "http://localhost:3030/url";

  export const debugURL = "http://localhost:3030/url"

  export const request = new Request(debugURL, newInit);