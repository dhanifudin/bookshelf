const Hapi = require("@hapi/hapi");

const initServer = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

initServer();
