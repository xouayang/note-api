const controller = require("../controller/in_contact.controller");
module.exports = (app) => {
  app.post("/contact", controller.add_in_contact);
  app.get("/contact", controller.get_in_contact);
  app.get("/contact/:id", controller.get_in_contact_id);
  app.put("/contact/:id", controller.update_in_contact);
  app.delete("/contact/:id", controller.delete_in_contact);
};