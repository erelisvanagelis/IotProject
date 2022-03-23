import axios from "axios";
console.log(window.location.origin);
const api = axios.create({
  baseURL: window.location.origin,
});

export async function getSensorData() {
  try {
    const response = await api.get('/sensorData');
    return { success: true, response: { ...response.data } };
  } catch (error) {
    console.error(error);
    return { success: false, ...error };
  }
}

export async function getDeviceData() {
  try {
    const response = await api.get('/deviceData');
    // console.log("getDeviceData")
    console.log(response.data)
    return { success: true, response: { ...response.data } };
  } catch (error) {
    console.error(error);
    return { success: false, ...error };
  }
}

export async function updateDeviceState(device, state) {
  try {
    console.log(`device: ${device}, state: ${state}`);
    const response = await api.put(`/${device}/${state}`);
    console.log(response);
    return { success: true, ...response };
  } catch (error) {
    console.error(error);
    return { success: false, ...error };
  }
}
