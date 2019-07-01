import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';
import gql from 'graphql-tag';
const endpointURL = 'https://api.hexometer.com/v1/ql';

const client = new ApolloClient ({
  link: new HttpLink({uri: endpointURL}),
  cache: new InMemoryCache()
});

//After ApolloClient this function is not used
// async function graphqlRequest(query, variables) {
//   const response = await fetch(endpointURL, {
//     method: 'POST',
//     headers: {'content-type': 'application/json'},
//     body: JSON.stringify({query, variables})
//   });
//   const responseBody = await response.json();
//   if (responseBody.errors) {
//     const message = responseBody.errors.map((error) => error.message).join('\n');
//     throw new Error(message);
//   }
//   return responseBody.data;
// }



export async function loadData() {
  const query = gql`{
      contentText {
        en {
        key
        value
      }
    }
    }`;
  const {data: {contentText}} = await client.query({query});
  return contentText.en;
}

export async function shearchByKeywords(id) {
  const query = gql`
   query enQuery($id: String!){
      contentText {
        en {
          ContentTextItem(key:$id){
        key
        value
      }
      }
    }
    }
  `;
    const {data: {contentText}} = await client.query({query, variables:{id}});
    console.log(contentText.en, "2");
    return contentText.en;
  }

shearchByKeywords();
