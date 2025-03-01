const allApiData = require("../endpoint.json");


exports.getAllApi = (req, res, next) => {
        res.status(200).send({ allApi :allApiData});
  };