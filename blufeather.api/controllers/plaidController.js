const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");
const TestConstants = require("../TestConstants");

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

module.exports = async function testPlaidConnection() {
  const client = new PlaidApi(configuration);

  const publicTokenRequest = {
    client_id: process.env.PLAID_CLIENT_ID,
    secret: process.env.PLAID_SECRET,
    institution_id: TestConstants.INSTITUTION,
    initial_products: TestConstants.PRODUCTS,
  };

  try {
    const publicTokenResponse = await client.sandboxPublicTokenCreate(
      publicTokenRequest
    );

    const publicToken = publicTokenResponse.data.public_token;
    // The generated public_token can now be exchanged
    // for an access_token
    const exchangeRequest = {
      public_token: publicToken,
    };
    const exchangeTokenResponse = await client.itemPublicTokenExchange(
      exchangeRequest
    );
    const accessToken = exchangeTokenResponse.data.access_token;
    return accessToken;
  } catch (error) {
    // handle error
    console.log(error);
  }
};
