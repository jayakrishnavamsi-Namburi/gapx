const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3>{title}</h3>
          <button onClick={onClose}>✖</button>
        </div>

        <div style={styles.body}>{children}</div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    width: "400px",
    borderRadius: "6px",
    padding: "15px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    marginTop: "10px",
  },
};

export default Modal;
