const supertokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const Dashboard = require("supertokens-node/recipe/dashboard");

const initializeSuperToken = () => {
  supertokens.init({
    framework: "express",
    supertokens: {
      connectionURI: `${process.env.SUPERTOKENS_CONNECT_URL}`,
      apiKey: `${process.env.SUPERTOKENS_API_KEY}`,
    },
    appInfo: {
      // learn more about this on https://supertokens.com/docs/session/appinfo
      appName: "Todo-list",
      apiDomain: `${process.env.API_DOMAIN}`,
      websiteDomain: `${process.env.WEBSITE_DOMAIN}`,
      apiBasePath: "/auth",
    },
    recipeList: [
      EmailPassword.init(),
      Session.init(), // initializes session features
      Dashboard.init({
        apiKey: `${process.env.DASHBOARD_API_KEY}`, // give a custom api key for domain
      }),
    ],
  });
};

module.exports = initializeSuperToken;
