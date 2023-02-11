const controller = require("../controller/note_details.controller");
const {verifyToken} = require('../middleware/verifyToken')
module.exports = (app) => {
  app.post("/note-detail",verifyToken, controller.add_note_details);
  app.get("/note-detail",controller.getAll_noteDetails);
  app.get("/note-detail/:id", controller.getAll_noteDetails_id);
  app.put("/note-detail/:id", controller.update_note_details);
  app.delete('/note-detail/:id', controller.delete_note_details);
};