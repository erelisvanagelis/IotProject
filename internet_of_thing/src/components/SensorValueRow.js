export default function SensorValueRow({ description, value, measure }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div style={{ flex: 4 }}>
        <span>{description}</span>
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <span>{value}</span>
        <span>{measure}</span>
      </div>
    </div>
  );
}
