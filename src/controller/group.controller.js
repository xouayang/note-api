const sql = require('mssql');
const db = require('../config/db');
const asyncHandler = require('express-async-handler');
const {status_Code} = require('../helper/status_code');
const uuid = require('uuid')
// add group 
exports.add_group = asyncHandler(async (req, res) => {
    try {
       const {MEMBER_ID} = req.payload;
       const {group_name,member_id,user_type,add_by_member_id,cdate} = req.body; 
       const connection = await sql.connect(db);
       const query = await connection.request().query(`INSERT INTO Tb_group(group_name,member_id,
        user_type,add_by_member_id,cdate) VALUES('${group_name}','${MEMBER_ID}',
        '${user_type}','${MEMBER_ID}','${cdate}')`);
        if(!query){
         return res.status(status_Code.bad_request).json({message:"bad_request"})
        }else {
         return res.status(status_Code.created).json({message:"Success"})
        }
    } catch (error) {
    return res.status(status_Code.Server_error).json({message:error.message})    
    }
});
// get group all 
exports.getGroup_all = asyncHandler(async (req, res) => {
    try {
       const connection = await sql.connect(db);
       const query = await connection.request().query(`SELECT * FROM tb_group`);
       if(!query) {
        return res.status(status_Code.NotFound).json({message:"Not found data"})
       } else {
        return res.status(status_Code.success).json(query.recordset)
       }    
    } catch (error) {
     return res.status(status_Code.Server_error).json({message:error.message})   
    }
})
// get by id 
exports.getGroup_all_id = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const connection = await sql.connect(db);
        const query = await connection.request().query(`SELECT * FROM tb_group WHERE group_id = '${id}'`)
        return res.status(status_Code.success).json(query.recordset[0])
    } catch (error) {
    return res.status(status_Code.Server_error).json({message:error.message})    
    }
});
// update 
exports.update_group = asyncHandler(async (req, res) => {
    try {
       const {id} = req.params;
       const {group_name,user_type,add_by_member_id,cdate} = req.body; 
       const connection = await sql.connect(db);
       const query = await connection.request().query(`UPDATE tb_group SET group_name = '${group_name}',
       user_type = '${user_type}', add_by_member_id = '${add_by_member_id}', cdate = '${cdate}'
       WHERE group_id = '${id}'`);
       if(!query) {
        return res
        .status(status_Code.bad_request)
        .json({message:"bad_request"})
       } else {
        return res
        .status(status_Code.success)
        .json({message:"success Updated"})
       }
    } catch (error) {
     return res
     .status(status_Code.Server_error)
     .json({message:error.message});   
    }
});
// delete group 
exports.delete_group = asyncHandler(async (req, res) => {
    try {
      const {id} = req.params;
      const connection = await sql.connect(db);
      const query = await connection.request().query(`DELETE FROM tb_group WHERE group_id = '${id}'`)  
      if(!query) {
        return res
        .status(status_Code.bad_request)
        .json({message:"bad_request"})
      } else {
        return res
        .status(status_Code.success)
        .json({message:"Success Deleted"})
      }
    } catch (error) {
     return res.status(status_Code.Server_error).json({message:error.message})   
    }
})