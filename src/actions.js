import ashue from 'as-hue-command';

function receiveAllLights(data) {
  return {
    type: 'receiveAllLights',
    lights: data
  };
}

export function getAllLights() {
  return dispatch => {
    return ashue.lights.all()
      .then(data => dispatch(receiveAllLights(data)));
  };
}
