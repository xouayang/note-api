const sql = require('mssql');
const db = require('../config/db');
const asyncHandler = require('express-async-handler');
const {status_Code} = require('../helper/status_code');
const uuid = require('uuid');
// add noted_details 
exports.add_note_details = asyncHandler(async (req,res) => {
        const note_id = uuid.v4();
    try {
        const {MEMBER_ID,MEMBER_NAME} = req.payload;
        const {group_id,detail,customer_name,village,
            ditrict,Provice,whatsapp,tel_detail,gmail,
            facebook,cdate,expired_date,in_contact_or_action,
            Status,closedate} = req.body;
            if(!detail || !customer_name || !village || !ditrict ||!Provice || ! whatsapp
                || !tel_detail || !gmail || !facebook || !cdate || !expired_date || !in_contact_or_action) {
                return res.status(status_Code.bad_request).json({message:"The body is not Empty"})
           }
        const connection = await sql.connect(db);
        const query = await connection.request().query(`
        INSERT INTO Tb_Note_detail(note_id,member_id_create,name_create,group_id,detail,customer_name,village,
        ditrict,Provice,whatsapp,tel_detail,gmail,facebook,cdate,expired_date,in_contact_or_action,
        status,closedate) VALUES('${note_id}','${MEMBER_ID}','${MEMBER_NAME}','${group_id}',N'${detail}',N'${customer_name}',
        N'${village}',N'${ditrict}',N'${Provice}','${whatsapp}',N'${tel_detail}','${gmail}',N'${facebook}',
        '${cdate}','${expired_date}','${in_contact_or_action}','${Status}','${closedate}')`);
        if(!query) {
            return res
            .status(status_Code.bad_request)
            .json({message:"field is required"})
        } else {
            return res
            .status(status_Code.created)
            .json({message:"Created"})
        }
    } catch (error) {
      return res
      .status(status_Code.Server_error)
      .json({message:error.message})  
    }
});
// get all note_details
exports.getAll_noteDetails = asyncHandler(async (req, res) => {
    try {
      const connection = await sql.connect(db);
      const query = await connection.request().query(`SELECT * FROM Tb_Note_detail`);
      if(query == null) {
        return res
        .status(status_Code.NotFound)
        .json({message:"Not found data"})
      } else {
        return res
        .status(status_Code.success)
        .json(query.recordset)
      }
    } catch (error) {
     return res
     .status(status_Code.Server_error)
     .json({message:error.message})  
    }
});
// get by id note_detalis
exports.getAll_noteDetails_id = asyncHandler (async (req, res) => {
    try {
        const {id} = req.params;
        const connection = await sql.connect(db);
        const query = await connection.request().query(`SELECT * FROM Tb_Note_detail WHERE note_id = '${id}'`);
        if(!query) {
            return res
            .status(status_Code.bad_request)
            .json({message:"Not found data"})
        } else {
            return res
            .status(status_Code.success)
            .json(query.recordset[0])   
        }
    } catch (error) {
      return res
      .status(status_Code.Server_error)
      .json({message:error.message})   
    }
})
// Delete note_details
exports.delete_note_details = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const connection = await sql.connect(db);
        const query = await connection.request().query(`DELETE FROM Tb_Note_detail WHERE note_id = '${id}'`);
        if(!query) {
            return res
            .status(status_Code.bad_request)
            .json({message:"Bad request"})
        } else {
            return res
            .status(status_Code.success)
            .json({message:"Deleted"})
        }
    } catch (error) {
     return res
     .status(status_Code.Server_error)
     .json({message:error.message})   
    }
}) 
// update note_details 
exports.update_note_details  = asyncHandler (async (req, res) => {
    try {
       const {id} = req.params;
       const {member_id_create,name_create,group_id,detail,customer_name,village,
        ditrict,Provice,whatsapp,tel_detail,gmail,
        facebook,cdate,expired_date,in_contact_or_action,
        Status,closedate} = req.body;
       const connection = await sql.connect(db);
       const query = await connection.request().query(`UPDATE Tb_Note_detail SET member_id_create = '${member_id_create}',name_create='${name_create}',
        group_id= '${group_id}',
        detail = N'${detail}', customer_name = N'${customer_name}',
        village = N'${village}',ditrict = N'${ditrict}',
        Provice = N'${Provice}',whatsapp = '${whatsapp}',
        tel_detail= '${tel_detail}', gmail = '${gmail}',facebook = N'${facebook}'
        ,cdate = '${cdate}',expired_date = '${expired_date}'
        ,in_contact_or_action = '${in_contact_or_action}',
       status = '${Status}', closedate = '${closedate}' WHERE note_id = '${id}'`);
       if(!query) {
        return res
        .status(status_Code.bad_request)
        .json({message:"Can't Update"})
       } else {
        return res
        .status(status_Code.success)
        .json({message:"Updated"})
       }
    } catch (error) {
     return res
     .status(status_Code.Server_error)
     .json({message:error.message})   
    }
});