// import { getToken } from "../../utils/token";

// const TopicCheckbox = ({ topic, topicId, roadmapId, completed }) => {
//   const toggleProgress = async () => {
//     await fetch(
//       `http://localhost:5000/api/roadmap/progress/${roadmapId}`,
//       {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${getToken()}`,
//         },
//         body: JSON.stringify({
//           topicId,
//           completed: !completed,
//         }),
//       }
//     );

//     window.location.reload(); // simple & safe
//   };

//   return (
//     <li style={{ marginBottom: "6px" }}>
//       <label>
//         <input
//           type="checkbox"
//           checked={completed}
//           onChange={toggleProgress}
//         />{" "}
//         {topic}
//       </label>
//     </li>
//   );
// };

// export default TopicCheckbox;





const TopicCheckbox = ({ topic, completed, onToggle }) => {
  return (
    <li style={{ marginBottom: "6px" }}>
      <label style={{ cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => onToggle(e.target.checked)}
        />{" "}
        {topic}
      </label>
    </li>
  );
};

export default TopicCheckbox;
