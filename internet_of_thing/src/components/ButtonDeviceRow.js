import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function ButtonDeviceRow({
  description,
  selectedValue,
  buttonsValueTitleSet,
  setSelectedValue,
}) {
  const handleAlignment = (event, value) => {
    console.log(value);
    if (value !== null) {
      setSelectedValue(value);
    }
  };

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
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ToggleButtonGroup
          value={selectedValue}
          exclusive={true}
          onChange={handleAlignment}
          fullWidth
        >
          {buttonsValueTitleSet.map((set, index) => (
            <ToggleButton value={set.value} style={{ flex: 1 }}>
              <span>{set.title}</span>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
