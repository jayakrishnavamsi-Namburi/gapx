import Roadmap from "../models/Roadmap.js";

export const updateProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { topicId, completed } = req.body;

    if (!topicId) {
      return res.status(400).json({
        success: false,
        message: "topicId is required",
      });
    }

    // Find the roadmap for this user
    const roadmap = await Roadmap.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    // Ensure the completedTopicsList exists
    if (!Array.isArray(roadmap.completedTopicsList)) {
      roadmap.completedTopicsList = [];
    }

    // Add or remove the topic from completed list
    if (completed) {
      if (!roadmap.completedTopicsList.includes(topicId)) {
        roadmap.completedTopicsList.push(topicId);
      }
    } else {
      roadmap.completedTopicsList = roadmap.completedTopicsList.filter(
        (item) => item !== topicId
      );
    }

    // Recalculate progress numbers
    const totalTopics = roadmap.progress.totalTopics || 0;
    const completedCount = roadmap.completedTopicsList.length;

    roadmap.progress.completedTopics = completedCount;
    roadmap.progress.percentComplete =
      totalTopics === 0
        ? 0
        : Math.round((completedCount / totalTopics) * 100);

    // Save without validating (important!)
    await roadmap.save({ validateBeforeSave: false });

    res.json({
      success: true,
      message: "Progress updated",
      progress: roadmap.progress,
      completedTopicsList: roadmap.completedTopicsList,
    });

  } catch (error) {
    console.error("Progress Update Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
