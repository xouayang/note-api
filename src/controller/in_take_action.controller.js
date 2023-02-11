const sql = require('mssql')
const db = require('../config/db')
const uuid = require('uuid')
const asyncHandler = require('express-async-handler')
const {status_Code} = require('../helper/status_code')
// add in_contact
exports.add_take_action = asyncHandler(async (req, res) => {
  const noteId = uuid.v1();
  try {
    const { add_name, status, cdate, close_name, closedate } = req.body;
    if (!add_name || !status || !close_name) {
      return res
        .status(status_Code.bad_request)
        .json({ message: "field is required" });
    }
    const connection = await sql.connect(db);
    const query = await connection.request()
      .query(`INSERT INTO Tb_in_take_action(note_id,add_name,status,cdate,close_name,closedate)
     VALUES('${noteId}',N'${add_name}','${status}', '${cdate}', N'${close_name}','${closedate}')`)
    if (!query) {
      return res
        .status(status_Code.bad_request)
        .json({ message: message.required });
    } else {
      return res
      .status(status_Code.created)
      .json({ message:"Created" });
    }
  } catch (error) {
    return res
      .status(status_Code.Server_error)
      .json({ message: error.message });
  }
});
// all get_in_contact
exports.get_take_action = asyncHandler(async (req, res) => {
  try {
    const connection = await sql.connect(db);
    const query = await connection
      .request()
      .query(`SELECT * FROM Tb_in_take_action`);
    if (!query) {
      return res
        .status(status_Code.NotFound)
        .json({ message: message.NotFound });
    } else {
      return res
      .status(status_Code.success)
      .json(query.recordset);
    }
  } catch (error) {
    return res
      .status(status_Code.Server_error)
      .json({ message: error.message });
  }
});
// get_in_contact_id
exports.get_take_action_id = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await sql.connect(db);
    const query = await connection
      .request()
      .query(`SELECT * FROM Tb_in_take_action WHERE note_id = '${id}'`);
    if (!query) {
      return res
        .status(status_Code.NotFound)
        .json({ message: message.NotFound });
    } else {
      return res
      .status(status_Code.success)
      .json(query.recordset[0]);
    }
  } catch (error) {
    return res
      .status(status_Code.Server_error)
      .json({ message: error.message });
  }
});
// delete in_contact
exports.delete_take_action = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await sql.connect(db);
    const query = await connection
      .request()
      .query(`DELETE FROM Tb_in_take_action WHERE note_id = '${id}'`);
    if (!query) {
      return res
        .status(status_Code.bad_request)
        .json({ message:"Can't update" });
    } else {
      return res
      .status(status_Code.success)
      .json({ message:"Deleted" });
    }
  } catch (error) {
    return res
      .status(status_Code.Server_error)
      .json({ message: error.message });
  }
});
// update
exports.update_take_action = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { add_name, status, cdate, close_name, closedate } = req.body;
    const connection = await sql.connect(db);
    const query = await connection.request()
      .query(`UPDATE Tb_in_take_action SET add_name ='${add_name}',status='${status}',cdate='${cdate}',
      close_name = N'${close_name}', closedate='${closedate}' WHERE note_id = '${id}'`);
    if (!query) {
      return res
        .status(status_Code.bad_request)
        .json({ message:"field is required" });
    } else {
      return res
      .status(status_Code.success)
      .json({ message:"Updated" });
    }
  } catch (error) {
    return res
      .status(status_Code.Server_error)
      .json({ message: error.message });
  }
});
