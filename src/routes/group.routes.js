const controller = require("../controller/group.controller");
const {verifyToken} = require('../middleware/verifyToken')
module.exports = (app) => {
  app.post("/group",verifyToken, controller.add_group);
  app.get("/group", controller.getGroup_all);
  app.get("/group/:id", controller.getGroup_all_id);
  app.put("/group/:id", controller.update_group);
  app.delete("/group/:id", controller.delete_group);
};
