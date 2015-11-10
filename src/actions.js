import ashue from 'as-hue-command';

function receiveAllLights(data) {
  return {
    type: 'receiveAllLights',
    lights: data
  };
}

function receiveLightStateUpdate(id, data) {
  return {
    type: 'receiveLightStateUpdate',
    id,
    light: {
      state: data
    }
  };
}

export function getAllLights() {
  return dispatch => {
    return ashue.lights.all()
      .then(data => dispatch(receiveAllLights(data)));
  };
}

export function toggleLight({id, value}) {
  return dispatch => {
    return ashue.lights.get(id).toggle(value)
      .then(data => dispatch(receiveLightStateUpdate(id, data)));
  };
}
