
import taskModel from "./taskModel.js";


//create task
const createTask = async (req, res, next) => {
  try {
    //  Get data from request body
    const { title, description } = req.body;

    //  Basic validation
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    //  Create task and attach logged-in user as owner
    const task = await taskModel.create({
      title,
      description,
      user: req.user.id, // comes from JWT
    });

    //  Send response
    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};



const getMyTasks = async (req, res, next) => {
  try {
    //  Find tasks that belong to the logged-in user
    const tasks = await taskModel.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    //  Send response
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};






const updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;

    //  Find task by ID
    const task = await taskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    //  Check ownership or admin role
    if (
      task.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this task",
      });
    }

    //  Update allowed fields
    const updatedTask = await taskModel.findByIdAndUpdate(
      taskId,
      req.body,
      { new: true, runValidators: true }
    );

    //  Send response
    res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};


// DELETE /api/tasks/:id
const deleteTask = async (req, res, next) => {
  try {
    // Only admin allowed (extra safety)
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can delete tasks",
      });
    }

    const task = await taskModel.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully by admin",
    });
  } catch (error) {
    next(error);
  }
};


export { createTask, getMyTasks, updateTask, deleteTask};