/*
 * @flow
 */

/**
 * LinkingApi ...
 *
 * @module LinkingApi
 * @memberof loom-data
 *
 * @example
 * import Loom from 'loom-data';
 * // Loom.LinkingApi.link...
 *
 * @example
 * import { LinkingApi } from 'loom-data';
 * // LinkingApi.link...
 */

import Logger from '../utils/Logger';

import LinkingEntitySet, {
  isValid as isValidLinkingEntitySet
} from '../models/LinkingEntitySet';

import LinkingEntityType, {
  isValid as isValidLinkingEntityType
} from '../models/LinkingEntityType';

import {
  LINKING_API
} from '../constants/ApiNames';

import {
  SET_PATH,
  TYPE_PATH
} from '../constants/ApiPaths';

import {
  getApiAxiosInstance
} from '../utils/AxiosUtils';

const LOG = new Logger('LinkingApi');

/**
 * `POST /linking/type`
 *
 * @static
 * @memberof loom-data.LinkingApi
 * @returns {Promise<UUID>}
 *
 * TODO: add documentation
 * TODO: add better validation
 * TODO: add unit tests
 * TODO: create data models
 */
export function createLinkingEntityType(linkingEntityType :LinkingEntityType) :Promise<> {

  let errorMsg = '';

  if (!isValidLinkingEntityType(linkingEntityType)) {
    errorMsg = 'invalid parameter: linkingEntityType must be a valid LinkingEntityType';
    LOG.error(errorMsg, linkingEntityType);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(LINKING_API)
    .post(`/${TYPE_PATH}`, linkingEntityType)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /linking/set`
 *
 * @static
 * @memberof loom-data.LinkingApi
 * @returns {Promise<UUID>}
 *
 * TODO: add documentation
 * TODO: add better validation
 * TODO: add unit tests
 */
export function linkEntitySets(linkingEntitySet :LinkingEntitySet) :Promise<> {

  let errorMsg = '';

  if (!isValidLinkingEntitySet(linkingEntitySet)) {
    errorMsg = 'invalid parameter: linkingEntitySet must be a valid LinkingEntitySet';
    LOG.error(errorMsg, linkingEntitySet);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(LINKING_API)
    .post(`/${SET_PATH}`, linkingEntitySet)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /linking/set/{syncId}/{entitySetId}/{entityId}`
 *
 * @static
 * @memberof loom-data.LinkingApi
 * @returns {Promise<UUID>}
 *
 * TODO: add documentation
 * TODO: add better validation
 * TODO: add unit tests
 * TODO: create data models
 */
export function linkEntities() :Promise<> {

  return Promise.reject('LinkingApi.linkEntities() is not implemented');
}

/**
 * `PUT /linking/set/{syncId}/{entitySetId}/{entityId}`
 *
 * @static
 * @memberof loom-data.LinkingApi
 * @returns {Promise}
 *
 * TODO: add documentation
 * TODO: add better validation
 * TODO: add unit tests
 * TODO: create data models
 */
export function setLinkedEntities() :Promise<> {

  return Promise.reject('LinkingApi.setLinkedEntities() is not implemented');
}

/**
 * `DELETE /linking/set/{syncId}/{entitySetId}/{entityId}`
 *
 * @static
 * @memberof loom-data.LinkingApi
 * @returns {Promise}
 *
 * TODO: add documentation
 * TODO: add better validation
 * TODO: add unit tests
 * TODO: create data models
 */
export function removeLinkedEntities() :Promise<> {

  return Promise.reject('LinkingApi.removeLinkedEntities() is not implemented');
}

/**
 * `PUT /linking/set/{syncId}/{entitySetId}/{entityId}/{linkedEntityId}`
 *
 * @static
 * @memberof loom-data.LinkingApi
 * @returns {Promise}
 *
 * TODO: add documentation
 * TODO: add better validation
 * TODO: add unit tests
 * TODO: create data models
 */
export function addLinkedEntities() :Promise<> {

  return Promise.reject('LinkingApi.addLinkedEntities() is not implemented');
}

/**
 * `DELETE /linking/set/{syncId}/{entitySetId}/{entityId}/{linkedEntityId}`
 *
 * @static
 * @memberof loom-data.LinkingApi
 * @returns {Promise}
 *
 * TODO: add documentation
 * TODO: add better validation
 * TODO: add unit tests
 * TODO: create data models
 */
export function removeLinkedEntity() :Promise<> {

  return Promise.reject('LinkingApi.removeLinkedEntity() is not implemented');
}
