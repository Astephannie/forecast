export async function getOneCall({ lat, lon }) {
  try {
    const response = await fetch(`/api/get-one-call/?lat=${lat}&lon=${lon}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getCity({ lat, lon }) {
  try {
    const response = await fetch(`/api/get-city/?lat=${lat}&lon=${lon}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
