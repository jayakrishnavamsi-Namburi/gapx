import Task from "../models/Task.js";

// ✅ POST /api/tasks
export const createTask = async (req, res) => {
  try {
    const { title, description, scheduledAt, reminderMinutes } = req.body;

    if (!title || !scheduledAt) {
      return res.status(400).json({
        success: false,
        message: "title and scheduledAt are required",
      });
    }

    const task = await Task.create({
      user: req.user._id,
      title,
      description: description || "",
      scheduledAt: new Date(scheduledAt),
      reminderMinutes: reminderMinutes ?? 30,
    });

    return res.json({
      success: true,
      message: "Task created successfully ✅",
      task,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ GET /api/tasks
export const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ scheduledAt: 1 });

    return res.json({
      success: true,
      tasks,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ PUT /api/tasks/:id
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    const { title, description, scheduledAt, reminderMinutes, status } = req.body;

    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (scheduledAt) task.scheduledAt = new Date(scheduledAt);
    if (reminderMinutes !== undefined) task.reminderMinutes = reminderMinutes;
    if (status) task.status = status;

    // ✅ if time updated, reset reminder
    task.reminderSent = false;

    await task.save();

    return res.json({
      success: true,
      message: "Task updated ✅",
      task,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ PATCH /api/tasks/:id/complete
export const markTaskCompleted = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    task.status = "completed";
    await task.save();

    return res.json({
      success: true,
      message: "Task marked completed ✅",
      task,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Task.findOneAndDelete({ _id: id, user: req.user._id });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    return res.json({
      success: true,
      message: "Task deleted ✅",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
