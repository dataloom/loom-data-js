/*
 * @flow
 */

/**
 * PermissionsApi gives access to OpenLattice's REST API for managing ACLs on existing EntityDataModel schemas.
 *
 * @module PermissionsApi
 * @memberof lattice
 *
 * @example
 * import Lattice from 'lattice';
 * // Lattice.PermissionsApi.get...
 *
 * @example
 * import { PermissionsApi } from 'lattice';
 * // PermissionsApi.get...
 */

import Logger from '../utils/Logger';
import { PERMISSIONS_API } from '../constants/ApiNames';
import { EXPLAIN_PATH, UPDATE_PATH } from '../constants/UrlConstants';
import { AclData, isValidAclData, isValidAclDataArray } from '../models/AclData';
import { isValidUUIDArray } from '../utils/ValidationUtils';
import { getApiAxiosInstance } from '../utils/axios';

const LOG = new Logger('PermissionsApi');

/**
 * `POST /permissions`
 *
 * Gets the ACL for the given ACL Key, only if the user is the owner of the ACL Key.
 *
 * @static
 * @memberof lattice.PermissionsApi
 * @param {UUID[]} aclKey
 * @returns {Promise<Acl>}
 *
 * @example
 * PermissionsApi.getAcl(["ec6865e6-e60e-424b-a071-6a9c1603d735"]);
 */
export function getAcl(aclKey :UUID[]) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUIDArray(aclKey)) {
    errorMsg = 'invalid parameter: aclKey must be a non-empty array of valid UUIDs';
    LOG.error(errorMsg, aclKey);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PERMISSIONS_API)
    .post('/', aclKey)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /permissions/explain`
 *
 * Retrieves the acl for a particular aclKey, with an explanation of where the permissions come from.
 *
 * @static
 * @memberof lattice.PermissionsApi
 * @param {UUID[]} aclKey
 * @returns {Promise<Object>}
 *
 * @example
 * PermissionsApi.getAclExplanation(["ec6865e6-e60e-424b-a071-6a9c1603d735"]);
 */
export function getAclExplanation(aclKey :UUID[]) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUIDArray(aclKey)) {
    errorMsg = 'invalid parameter: aclKey must be a valid UUID array';
    LOG.error(errorMsg, aclKey);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PERMISSIONS_API)
    .post(`/${EXPLAIN_PATH}`, aclKey)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PATCH /permissions`
 *
 * Updates the Ace for a particular ACL Key, only if the user is the owner of the ACL Key.
 *
 * @static
 * @memberof lattice.PermissionsApi
 * @param {AclData} aclData
 * @returns {Promise}
 *
 * @example
 * PermissionsApi.updateAcls(
 *   {
 *     "action": "ADD",
 *     "acl": {
 *       "aclKey": ["ec6865e6-e60e-424b-a071-6a9c1603d735"],
 *       "aces": [
 *         {
 *           "principal": {
 *             "type": "USER",
 *             "id": "userId"
 *           },
 *           "permissions": ["READ"]
 *         }
 *       ]
 *     }
 *   }
 * );
 */
export function updateAcl(aclData :AclData) :Promise<*> {

  let errorMsg = '';

  if (!isValidAclData(aclData)) {
    errorMsg = 'invalid parameter: aclData must be a valid AclData object';
    LOG.error(errorMsg, aclData);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PERMISSIONS_API)
    .patch('/', aclData)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PATCH /permissions/update`
 *
 * Updates the Ace for a set of ACL Keys, only if the user is the owner of the ACL Keys.
 *
 * @static
 * @memberof lattice.PermissionsApi
 * @param {AclData[]} aclData
 * @returns {Promise}
 *
 * @example
 * PermissionsApi.updateAcls(
 *   [{
 *     "action": "ADD",
 *     "acl": {
 *       "aclKey": ["ec6865e6-e60e-424b-a071-6a9c1603d735"],
 *       "aces": [
 *         {
 *           "principal": {
 *             "type": "USER",
 *             "id": "userId"
 *           },
 *           "permissions": ["READ"]
 *         }
 *       ]
 *     }
 *   }]
 * );
 */
export function updateAcls(aclData :AclData[]) :Promise<*> {

  let errorMsg = '';

  if (!isValidAclDataArray(aclData)) {
    errorMsg = 'invalid parameter: aclData must be an array of valid AclData objects';
    LOG.error(errorMsg, aclData);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PERMISSIONS_API)
    .patch(`/${UPDATE_PATH}`, aclData)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
