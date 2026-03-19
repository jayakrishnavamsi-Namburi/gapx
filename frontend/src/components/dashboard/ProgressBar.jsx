const ProgressBar = ({ percent }) => {
  return (
    <div style={{ marginTop: "10px" }}>
      <div style={container}>
        <div
          style={{
            ...bar,
            width: `${percent}%`,
          }}
        />
      </div>
      <p style={{ fontSize: "14px", marginTop: "6px" }}>
        {percent}% Completed
      </p>
    </div>
  );
};

const container = {
  height: "10px",
  background: "#e5e7eb",
  borderRadius: "8px",
  overflow: "hidden",
};

const bar = {
  height: "100%",
  background: "#4f46e5",
  transition: "width 0.5s ease",
};

export default ProgressBar;
