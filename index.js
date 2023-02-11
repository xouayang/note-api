const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()
const db = require('./src/config/db')
const sql = require('mssql')
const app = express();
app.use(express.json({limit:'100mb'}));
app.use(express.urlencoded({limit:'100mb', extended:true, parameterLimit:200000}));
app.use(cors());
app.use(helmet());

require('./src/routes/in_contact.routes')(app)
require('./src/routes/in_take.action.routes')(app)
require('./src/routes/note_details.routes')(app)
require('./src/routes/group.routes')(app)

sql.connect(db).then(() =>{
    try {
       console.log("Successed") 
    } catch (error) {
      console.log(error)  
    }
})
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`)
})