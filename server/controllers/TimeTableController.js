const TimeTable = require('../models/TimeTableModel');

const AddTimeTable = async (req,res)=>{
    try{
        const Time = new TimeTable(req.body);
        const saved = await Time.save();
        if(saved){
            res.status(200).json({
                success:true,
                message:"saved successfully"
            });
        }else{
            throw new Error('Failed to save !');
        }
    }catch(er){
        res.status(200).json({
            success:false,
            message:er.message
        });
    }
};

const getTimeTable = async (req,res)=>{
    try{
        const timetable = await TimeTable.find();
        res.status(200).json({
            success:true,
            TimeTables:timetable
        });
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
};

const DeleteTimeTable = async (req,res) =>{
    try{
        const found = await TimeTable.findOne({_id:req.params.id});
        if(!found){
            throw new Error('TimeTable Not Found !');
        }else{
            const deleted = await TimeTable.deleteOne({_id:req.params.id});
            if(deleted){
                res.status(200).json({
                    success:true,
                    message:"Deleted Successfully"
                });
            }else{
                throw new Error('Failed to delete ');
            }
        }
    }catch(err){
        res.status(200).json({
            success:false,
            message:err.message
        });
    }
};

const getTTDates = async (req,res)=>{
    try{
        const TimeTables = await TimeTable.find();
        const dates = [];
        TimeTables.map(tt=>{
            dates.push({date:tt.createdAt});
        });
        res.status(200).json({
            success:true,
            dates
        });
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
}

const GetSingleTT = async (req,res)=>{
    try{
        let SingleTTClasses = [];
        const SingleTT = await TimeTable.findOne({createdAt:req.params.date});
        let index = undefined;
        SingleTT.TimeTable.map(tt=>{
            index = tt.Classes.findIndex(item=>item.className===req.params.class);
        });
        SingleTT.TimeTable.map(tt=>{
            SingleTTClasses.push(tt.Classes[index].data);
        })
        res.status(200).json({
            success:true,SingleTTClasses
        });
    }catch(err){
        res.status(200).json({
            success:false,
            message:err.message
        });
    }
};

// const FilteredTT = async (req,res)=>{
//     try{
//         const SingleTT = await TimeTable.findOne({createdAt:req.params.date}); 
//     }catch(er){
//         res.status(500).json({
//             success:false,
//             message:er.message
//         });
//     }
// }

module.exports = { AddTimeTable, getTimeTable ,DeleteTimeTable , getTTDates, GetSingleTT};