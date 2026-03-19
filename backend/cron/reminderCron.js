// import cron from "node-cron";
// import Task from "../models/Task.js";
// import User from "../models/User.js";
// import { sendEmail } from "../utils/sendEmail.js";

// export const startReminderCron = () => {
//   console.log("✅ Reminder Cron Started (runs every 1 minute)");

//   cron.schedule("* * * * *", async () => {
//     try {
//       const now = new Date();

//       // ✅ find tasks that need reminder
//       const tasks = await Task.find({
//         status: "pending",
//         reminderSent: false,
//         scheduledAt: { $gt: now }, // future tasks only
//       });

//       for (const task of tasks) {
//         const reminderTime = new Date(
//           new Date(task.scheduledAt).getTime() - task.reminderMinutes * 60 * 1000
//         );

//         if (now >= reminderTime) {
//           const user = await User.findById(task.user);

//           if (!user) continue;

//           await sendEmail(
//             user.email,
//             `⏰ Reminder: ${task.title}`,
//             `Hey ${user.name} 👋\n\nYour task is scheduled soon!\n\n✅ Task: ${task.title}\n🕒 Time: ${task.scheduledAt}\n📌 Note: ${task.description || "No description"}\n\n⏳ Reminder sent ${task.reminderMinutes} minutes before.\n\n- GapX Team 🚀`
//           );

//           task.reminderSent = true;
//           await task.save();

//           console.log("✅ Reminder mail sent for task:", task.title);
//         }
//       }
//     } catch (err) {
//       console.log("❌ Reminder Cron Error:", err.message);
//     }
//   });
// };




import cron from "node-cron";
import Task from "../models/Task.js";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

export const startReminderCron = () => {
  console.log("✅ Reminder Cron Started (runs every 1 minute)");

  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();

      const tasks = await Task.find({
        status: "pending",
        reminderSent: false,
        scheduledAt: { $gt: now },
      });

      for (const task of tasks) {
        const reminderTime = new Date(
          new Date(task.scheduledAt).getTime() - task.reminderMinutes * 60 * 1000
        );

        if (now >= reminderTime) {
          const user = await User.findById(task.user);
          if (!user) continue;

          await sendEmail(
            user.email,
            `⏰ Reminder: ${task.title}`,
            `Hey ${user.name} 👋\n\nTask: ${task.title}\nTime: ${task.scheduledAt}\n\n- GapX 🚀`
          );

          task.reminderSent = true;
          await task.save();

          console.log("✅ Reminder mail sent:", task.title);
        }
      }
    } catch (err) {
      console.log("❌ Reminder Cron Error:", err.message);
    }
  });
};
