const controller = require("../controller/in_take_action.controller");
module.exports = (app) => {
  app.post("/action", controller.add_take_action);
  app.get("/action", controller.get_take_action);
  app.get("/action/:id", controller.get_take_action_id);
  app.put("/action/:id", controller.update_take_action);
  app.delete("/action/:id", controller.delete_take_action);
};
