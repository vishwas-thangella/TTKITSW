const FacultyModel = require('../models/FacultyModel');

const AddFaculty = async (req,res) =>{
    try{
        const Found = await FacultyModel.findOne(req.body);
        if(Found){
            throw new Error('Faculty Exists !')
        }else{
            const Faculty = new FacultyModel(req.body);
            const saved = await Faculty.save();
            if(saved){
                res.status(200).json({
                    success:true,
                    message:"Faculty Saved !"
                });
            }else{
                throw new Error('Failed to save !')
            }
        }
    }catch(err){
        res.status(200).json({
            success:false,
            message:err.message
        });
    }
};

const DeleteFaculty = async (req,res) =>{
    try{
        const Found = await FacultyModel.findOne({_id:req.params.id});
        if(Found){
            const deleted = await FacultyModel.deleteOne({_id:req.params.id});
            if(deleted){
                res.status(200).json({
                    success:true,
                    message:"Faculty Deleted !"
                });
            }else{
                throw new Error('Failed to Delete Faculty !')
            }
        }else{
            throw new Error('Faculty Not Found !');
        }
    }catch(err){
        res.status(200).json({
            success:false,
            message:err.message
        });
    }
};

const getAllFaculties = async (req,res)=>{
    try{
        const faculties = await FacultyModel.find();
        res.status(200).json({
            success:true,
            faculties:faculties
        });
    }catch(err){
        res.status(200).json({
            success:false,
            message:err.message
        });
    }
};

const getDeptFac = async (req,res) =>{
    try{
        const faculties = await FacultyModel.find({dept:req.params.dept});
        res.status(200).json({
            success:true,
            faculties
        });
    }catch(e){
        res.status(200).json({
            success:false,
            message:e.message
        });
    }
}

module.exports = { AddFaculty, DeleteFaculty, getAllFaculties, getDeptFac };