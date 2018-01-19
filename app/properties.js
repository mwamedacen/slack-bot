import properties from 'properties';

const cached = {};

export const loadProperties = () =>
  new Promise((resolve, reject) => {
    properties.parse('app/properties/message', { path: true }, (error, obj) => {
      if (error) return reject(error);

      cached.properties = obj;
      return resolve(obj);
    });
  });

export function getProperties() {
  return cached.properties;
}
