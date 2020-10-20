const fakeArr = {
    description: "bug",
    email: "e@d.com",
    firstName: "timmy",
    lastName: "tammy",
    oAuthApplicationType: "stealth api",
    oAuthRedirectURI: "https://redirecterersd.com",
    organization: "Cool Co."
  };

  const url = "http://localhost:3030/url";

  export const request = new Request(url, {
    body: JSON.stringify(fakeArr),
    headers: {
      accept: "application/json",
      "content-type": "application/json"
    },
    method: "POST"
  });