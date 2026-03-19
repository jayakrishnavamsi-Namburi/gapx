const RoadmapProgress = ({ completed, total }) => {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div>
      <p>
        Progress: {completed}/{total} ({percent}%)
      </p>
      <progress value={completed} max={total} />
    </div>
  );
};

export default RoadmapProgress;
