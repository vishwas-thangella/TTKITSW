const CourseModel = require('../models/CourseModel');

const AddCourse = async (req,res) =>{
    try{
        const found = await CourseModel.findOne(req.body);
        if(found){
            throw new Error('Course already Exist !');
        }else{
            const course = new CourseModel(req.body);
            const saved = await course.save();
            if(saved){
                res.status(200).json({
                    success:true,
                    message:"course saved !"
                });
            }else{
                throw new Error('Failed to save !');
            }
        }
    }catch(e){
        res.status(200).json({
            success:false,
            message:e.message
        });
    }
};

const getallCourses = async (req,res)=>{
    try{
        const courses = await CourseModel.find();
        res.status(200).json({
            success:true,
            courses:courses
        });
    }catch(err){
        res.status(200).json({
            success:false,
            message:err.message
        });
    }
};

const DeleteCourse = async (req,res)=>{
    try{
        const found = await CourseModel.findOne({_id:req.params.id});
        if(found){
            const deleted = await CourseModel.deleteOne({_id:req.params.id});
            if(deleted){
                res.status(200).json({
                    success:true,
                    message:"Course Deleted SuccessFully !"
                });
            }else{
                throw new Error('Failed to delete ');
            }
        }else{
            throw new Error('Course not found ');
        }
    }catch(err){
        res.status(200).json({
            success:false,
            message:err.message
        });
    }
}

module.exports = { AddCourse, DeleteCourse, getallCourses };