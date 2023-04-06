const mongoose = require('mongoose');

const ConnectToDb = async () =>{
    await mongoose.connect('mongodb+srv://vishwas:vishwas@cluster0.p1bj4xh.mongodb.net/TimeTable').then(resp=>{
        console.log('Database Connected  to : '+resp.connection.host);
    }).catch(err=>{
        console.log(err)
    })
};

module.exports = ConnectToDb;