async function main() {
    var { GraphQLClient, gql } = require("graphql-request");

    const endpoint = 'https://127.0.0.1:4000/graphql';
    const apiToken = '';
    const headers = {
      "content-type": "application/json",
      "x-api-key": apiToken,
      //'authorization': `Bearer ${apiToken}`,
    };
    const graphQLClient = new GraphQLClient(endpoint, {
        headers: headers
    })

    //episodes.forEach(async({title, description, cover, episodeNumber}) => {
    const runGQL = async (title, description, cover, episodeNumber)=>{
        const mutation = gql`
            mutation AddEpisode(
                $title: String!
                $description: String!
                $cover: String!
                $episodeNumber: Int!
            ) 
            {
                episodeCreate(
                    input: { 
                        title: $title
                        description: $description
                        cover: $cover
                        episodeNumber: $episodeNumber
                    }
                ) 
                {
                    episode {
                        id
                        title
                        description
                        cover
                        episodeNumber
                    }
                }
            }
        `;

        const variables = {
            title,
            description,
            cover,
            episodeNumber
        }
        const data = await graphQLClient.request(mutation, variables)

        console.log(JSON.stringify(data, undefined, 2))
    }
    
    runGQL('title1', 'description1', 'cover1', 1);
}

main().catch((error) => console.error(error))
