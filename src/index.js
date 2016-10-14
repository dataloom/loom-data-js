/**
 * The `loom-data` library is a layer on top of Loom's REST APIs to simplify the process of reading data from and
 * writing data into the Loom DataStore. The library exposes a thin wrapper around each of Loom's REST APIs to
 * standardize the data models and formats used, and facilitate communication with Loom.
 *
 * @module loom-data
 */

/*
 * @flow
 */

import * as DataApi from './DataApi';
import * as EntityDataModelApi from './EntityDataModelApi';

import {
  configure
} from './config/Configuration';

declare var __VERSION__ :string;
const version :string = __VERSION__;

export {
  version,
  configure,
  DataApi,
  EntityDataModelApi
};

export default {
  version,
  configure,
  DataApi,
  EntityDataModelApi
};
