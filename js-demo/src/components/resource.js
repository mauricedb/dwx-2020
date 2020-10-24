import { createFetchResource } from '../utils/createResource';

const resource = createFetchResource(
  (key) => `https://the-problem-solver-sample-data.azurewebsites.net${key}`
);

export default resource;
