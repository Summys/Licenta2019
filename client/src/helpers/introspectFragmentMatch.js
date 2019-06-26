import fetch from "node-fetch";

const fetchFragmentTypes = async graphqlEndPoint => {
  return fetch(graphqlEndPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      variables: {},
      query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `
    })
  }).then(result => result.json());
};

export default fetchFragmentTypes;
