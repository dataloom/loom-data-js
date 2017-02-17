/*
 * @flow
 */

/**
 * DataApi gives access to Loom's REST API for reading and writing data against an existing EntityDataModel.
 *
 * @module DataApi
 * @memberof loom-data
 *
 * @example
 * import Loom from 'loom-data';
 * // Loom.DataApi.get...
 *
 * @example
 * import { DataApi } from 'loom-data';
 * // DataApi.get...
 */

import Immutable from 'immutable';

import isUndefined from 'lodash/isUndefined';

import Logger from '../utils/Logger';

import * as Configuration from '../config/Configuration';

import {
  DATA_API
} from '../constants/ApiNames';

import {
  ENTITY_DATA_PATH,
  TICKET_PATH
} from '../constants/ApiPaths';

import {
  getApiBaseUrl,
  getApiAxiosInstance
} from '../utils/AxiosUtils';

import {
  isEmptyArray,
  isNonEmptyObject
} from '../utils/LangUtils';

import {
  isValidUuid,
  isValidUuidArray
} from '../utils/ValidationUtils';

const LOG = new Logger('DataApi');

const FILE_TYPES :Immutable.Map<string, string> = Immutable.Map().withMutations((map :Map<string, string>) => {
  map.set('csv', 'csv');
  map.set('CSV', 'csv');
  map.set('json', 'json');
  map.set('JSON', 'json');
});

/**
 * `POST /data/entitydata/{entitySetId}`
 *
 * Gets all data for the given EntitySet UUID with respect to the given filters.
 *
 * @static
 * @memberof loom-data.DataApi
 * @param {UUID} entitySetId
 * @param {UUID[]} syncIds
 * @param {UUID[]} propertyTypeIds
 * @returns {Promise}
 *
 * @example
 * DataApi.getSelectedEntitySetData(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   ["0c8be4b7-0bd5-4dd1-a623-da78871c9d0e"],
 *   ["8f79e123-3411-4099-a41f-88e5d22d0e8d"]
 * );
 */
export function getEntitySetData(entitySetId :UUID, syncIds :UUID[], propertyTypeIds :UUID[]) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  let syncIdsCollection = syncIds;
  if (isUndefined(syncIds) || isEmptyArray(syncIds)) {
    syncIdsCollection = [];
  }
  else if (!isValidUuidArray(syncIds)) {
    errorMsg = 'invalid parameter: syncIds must be an array of valid UUIDs';
    LOG.error(errorMsg, syncIds);
    return Promise.reject(errorMsg);
  }

  let propertyTypeIdsCollection = propertyTypeIds;
  if (isUndefined(propertyTypeIds) || isEmptyArray(propertyTypeIds)) {
    propertyTypeIdsCollection = [];
  }
  else if (!isValidUuidArray(propertyTypeIds)) {
    errorMsg = 'invalid parameter: propertyTypeIds must be a non-empty array of valid UUIDs';
    LOG.error(errorMsg, propertyTypeIds);
    return Promise.reject(errorMsg);
  }

  const data = {
    syncIds: syncIdsCollection,
    properties: propertyTypeIdsCollection
  };

  return getApiAxiosInstance(DATA_API)
    .post(`/${ENTITY_DATA_PATH}/${entitySetId}`, data)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * Returns the URL to be used for a direct file download for all data for the given EntitySet UUID.
 *
 * @static
 * @memberof loom-data.DataApi
 * @param {UUID} entitySetId
 * @param {string} fileType
 * @returns {string}
 *
 * @example
 * DataApi.getAllEntitiesOfTypeFileUrl("ec6865e6-e60e-424b-a071-6a9c1603d735", "json");
 */
export function getEntitySetDataFileUrl(entitySetId :UUID, fileType :string) :?string {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return null;
  }

  if (!FILE_TYPES.contains(fileType)) {
    errorMsg = 'invalid parameter: fileType must be a valid file type string';
    LOG.error(errorMsg, fileType);
    return null;
  }

  // TODO: fix authToken issue with cookies so that we don't have to use this "token" query param

  const authToken = Configuration.getConfig().get('authToken');
  const split = authToken.split(' ');
  const token = split[1];

  // eslint-disable-next-line
  return `${getApiBaseUrl(DATA_API)}/${ENTITY_DATA_PATH}/${entitySetId}?fileType=${FILE_TYPES.get(fileType)}&token=${token}`;
}

/**
 * `PUT /data/entitydata/{entitySetId}/{syncId}`
 *
 * Creates an entry for the given entity data.
 *
 * @static
 * @memberof loom-data.DataApi
 * @param {UUID} entitySetId
 * @param {UUID} syncId
 * @param {Object} entities
 * @return {Promise}
 *
 * @example
 * DataApi.createEntityData(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *   {
 *     "id_1": [
 *       {
 *         "uuid_1": ["value_1", "value_2"],
 *         "uuid_2": ["value_3", "value_4"]
 *       }
 *     ]
 *   }
 * );
 */
export function createEntityData(entitySetId :UUID, syncId :UUID, entities :Object) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(syncId)) {
    errorMsg = 'invalid parameter: syncId must be a valid UUID';
    LOG.error(errorMsg, syncId);
    return Promise.reject(errorMsg);
  }

  // TODO: validate entities as Map<String, SetMultimap<UUID, Object>>

  if (!isNonEmptyObject(entities)) {
    errorMsg = 'invalid parameter: entities must be a non-empty object';
    LOG.error(errorMsg, entities);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .put(`/${ENTITY_DATA_PATH}/${entitySetId}/${syncId}`, entities)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PATCH /data/entitydata/{ticketId}/{syncId}`
 *
 * @static
 * @memberof loom-data.DataApi
 * @param {UUID} ticketId
 * @param {UUID} syncId
 * @param {Object} entities
 * @return {Promise}
 *
 * @example
 * DataApi.storeEntityData(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *   {
 *     "id_1": [
 *       {
 *         "uuid_1": ["value_1", "value_2"],
 *         "uuid_2": ["value_3", "value_4"]
 *       }
 *     ]
 *   }
 * );
 */
export function storeEntityData(ticketId :UUID, syncId :UUID, entities :Object) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(ticketId)) {
    errorMsg = 'invalid parameter: ticketId must be a valid UUID';
    LOG.error(errorMsg, ticketId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(syncId)) {
    errorMsg = 'invalid parameter: syncId must be a valid UUID';
    LOG.error(errorMsg, syncId);
    return Promise.reject(errorMsg);
  }

  // TODO: validate entities as Map<String, SetMultimap<UUID, Object>>

  if (!isNonEmptyObject(entities)) {
    errorMsg = 'invalid parameter: entities must be a non-empty object';
    LOG.error(errorMsg, entities);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .patch(`/${ENTITY_DATA_PATH}/${TICKET_PATH}/${ticketId}/${syncId}`, entities)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /data/ticket/{entitySetId}/{syncId}`
 *
 * @static
 * @memberof loom-data.DataApi
 * @param {UUID} entitySetId
 * @param {UUID} syncId
 * @return {Promise}
 *
 * @example
 * DataApi.acquireSyncTicket(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e"
 * );
 */
export function acquireSyncTicket(entitySetId :UUID, syncId :UUID) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(syncId)) {
    errorMsg = 'invalid parameter: syncId must be a valid UUID';
    LOG.error(errorMsg, syncId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .post(`/${TICKET_PATH}/${entitySetId}/${syncId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /data/ticket/{ticketId}`
 *
 * @static
 * @memberof loom-data.DataApi
 * @param {UUID} syncId
 * @return {Promise}
 *
 * @example
 * DataApi.acquireSyncTicket(
 *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e"
 * );
 */
export function releaseSyncTicket(ticketId :UUID) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(ticketId)) {
    errorMsg = 'invalid parameter: ticketId must be a valid UUID';
    LOG.error(errorMsg, ticketId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .delete(`/${TICKET_PATH}/${ticketId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
