// const fakeArr = {
//     description: "bug",
//     email: "e@d.com",
//     firstName: "timmy",
//     lastName: "tammy",
//     oAuthApplicationType: "stealth api",
//     oAuthRedirectURI: "https://redirecterersd.com",
//     organization: "Cool Co."
//   };

  export const url = "http://localhost:3030/url";

  export const debugURL = "http://localhost:3030/debug-sentry"

  export const request = new Request(url, {
    body: "a=1",
    headers: {
      accept: "application/json",
      "content-type": "application/json"
    },
    method: "POST"
  });