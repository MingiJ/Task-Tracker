const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const Task = require('../models/taskModel')

// @desc Get categories
// @access Public
// @route GET /api/categories

const getCategories = asyncHandler(async (req, res) => {
  const count = await Category.countDocuments();
  const categories = await Category.aggregate(
    [{
        $lookup: {
            from: 'tasks',
            localField: '_id',
            foreignField: 'category',
            as: 'tasks'
        }
    },{
        $addFields: {
            taskCount: {
                $size: '$tasks'
            }
        }
    },{
        $project: {
            name:1,
            taskCount:1
        }
    }] 
  )
    
  res.send({ count, categories });
});

// @desc create category
// @access Public
// @route POST /api/categories
const createCategory = asyncHandler(async (req, res) => {
  //check whether the name has been passed
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please input category name");
  }
  const category = await Category.create({
    name: req.body.name,
  });

  res.status(201).json(category);
});

// @desc Delete category and associated task
// @access Public
// @route DELETE /api/categories
const deleteCategory = asyncHandler(async (req, res)=>{
    await Category.findByIdAndRemove(req.params.id)
    await Task.deleteMany({category: req.params.id})
    res.json({id:`${req.params.id}`})
})

//export the controllers
module.exports = {
  getCategories,
  createCategory,
  deleteCategory
};
