import "./App.css";
import { Box, Container, Divider, Stack } from "@mui/material";
import SensorValueRow from "./components/SensorValueRow";
import { useEffect, useState } from "react";
import ButtonDeviceRow from "./components/ButtonDeviceRow";
import { ON_OF_SET, MEASUREMENTS } from "./util/Constants";
import { getDeviceData, getSensorData, updateDeviceState } from "./API/IoT";

function App() {
  const [sensorState, setSensorState] = useState({
    temp1: {
      description: "Temperature",
      measure: MEASUREMENTS.temperature,
      value: 0,
    },
    humid1: {
      description: "Humidity",
      measure: "%",
      value: 0,
    },
    flame1: {
      description: "Flame",
      measure: "",
      value: 0,
    },
  });
  const [deviceState, setDeviceState] = useState({
    light1: {
      description: "Light (1)",
      value: "off",
    },
    light2: {
      description: "Light (2)",
      value: "off",
    },
    light3: {
      description: "Light (3)",
      value: "off",
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetchSensorDataCalled");
      await new Promise((r) => setTimeout(r, 300));
      const copy = { ...sensorState };
      const response = await getSensorData();
      if (response.success) {
        Object.keys(response.response).map(
          (key, index) => (copy[key].value = response.response[key])
        );
      }
      setSensorState({ ...copy });
    };
    fetchData();
  }, [sensorState]);
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetchDeviceDataCalled");
      await new Promise((r) => setTimeout(r, 300));
      const copy = { ...deviceState };
      const response = await getDeviceData();
      if (response.success) {
        Object.keys(response.response).map(
          (key, index) => (copy[key].value = response.response[key])
        );
      }
      setDeviceState({ ...copy });
    };
    fetchData();
  }, [deviceState]);
  return (
    <div className="App-header">
      <Container
        maxWidth="lg"
        sx={{ backgroundColor: "#778899", minHeight: "100vh" }}
      >
        <Stack>
          <h2>Sensor Data:</h2>
          <Stack sx={{ marginLeft: 3 }}>
            {Object.keys(sensorState).map((key, index) => (
              <SensorValueRow
                description={sensorState[key].description}
                value={sensorState[key].value}
                measure={sensorState[key].measure}
              />
            ))}
          </Stack>
          <Divider />

          <h2>Device Status:</h2>
          <Stack sx={{ marginLeft: 3 }}>
            {Object.keys(deviceState).map((key, index) => (
              <ButtonDeviceRow
                description={deviceState[key].description}
                selectedValue={deviceState[key].value}
                buttonsValueTitleSet={ON_OF_SET}
                setSelectedValue={(value) => updateDeviceState(key, value)}
              />
            ))}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}

export default App;