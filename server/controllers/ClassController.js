const ClassModel = require('../models/ClassModel');

const AddClass = async (req,res) => {
    try{
        const found = await ClassModel.findOne(req.body);
        if(found){
            throw new Error('Class already exists ');
        }else{
            const Class = new ClassModel(req.body);
            const saved = await Class.save();
            if(saved){
                res.status(200).json({
                    success:true,
                    message:'Class Saved !'
                });
            }else{
                throw new Error('Failed to save CLass');
            }
        }
    }catch(e){
        res.status(200).json({
            success:false,
            message:e.message
        });
    }
};

const getClassByDept = async (req,res) =>{
    try{
        const classes  = await ClassModel.find({dept:req.params.dept});
        res.status(200).json({
            success:true,
            classes:classes
        });
    }catch(e){
        res.status(200).json({
            success:false,
            message:e.message
        });
    }
}

const getAllClasses = async (req,res) =>{
    try{
        const Classes = await ClassModel.find();
        res.status(200).json({
            success:true,
            Classes:Classes
        });
    }catch(err){
        res.status(200).json({
            success:false,
            message:err.message
        });
    }
};

const DeleteClass = async (req,res)=>{
    try{
        const found = await ClassModel.findOne({_id:req.params.id});
        if(found){
            const deleted = await ClassModel.deleteOne({_id:req.params.id});
            if(deleted){
                res.status(200).json({
                    success:true,
                    message:"Deleted Successfully"
                });
            }else{
                throw new Error('Failed to delete !');
            }
        }else{
            throw new Error('Class not found !');
        }
    }catch(err){
        res.status(200).json({
            success:false,
            message:err.message
        });
    }
};

module.exports = { AddClass, getClassByDept, getAllClasses, DeleteClass };