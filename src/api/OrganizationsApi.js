/*
 * @flow
 */

/**
 * OrganizationsApi ...
 *
 * @module OrganizationsApi
 * @memberof lattice
 *
 * @example
 * import Lattice from 'lattice';
 * // Lattice.OrganizationsApi.get...
 *
 * @example
 * import { OrganizationsApi } from 'lattice';
 * // OrganizationsApi.get...
 */

import { Set } from 'immutable';

import Logger from '../utils/Logger';
import Organization, { isValidOrganization } from '../models/Organization';
import Role, { isValidRole } from '../models/Role';
import { ORGANIZATIONS_API } from '../constants/ApiNames';
import { getApiAxiosInstance } from '../utils/axios';
import { isNonEmptyString, isNonEmptyStringArray } from '../utils/LangUtils';
import { isValidUuid, isValidUuidArray } from '../utils/ValidationUtils';

import {
  ASSEMBLE_PATH,
  DESCRIPTION_PATH,
  EMAIL_DOMAINS_PATH,
  ENTITY_SETS_PATH,
  MEMBERS_PATH,
  PRINCIPALS_PATH,
  ROLES_PATH,
  TITLE_PATH
} from '../constants/UrlConstants';

const LOG = new Logger('OrganizationsApi');

/**
 * `GET /organizations/{uuid}`
 *
 * Gets the information for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @returns {Promise<Organization>}
 *
 * @example
 * OrganizationsApi.getOrganization("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getOrganization(organizationId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get(`/${organizationId}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /organizations`
 *
 * Gets all Organization information.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @returns {Promise<Organization[]>}
 *
 * @example
 * OrganizationsApi.getAllOrganizations();
 */
export function getAllOrganizations() :Promise<*> {

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get('/')
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /organizations`
 *
 * Creates a new Organization, if it does not already exist.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {Organization} organization
 * @returns {Promise<UUID>}
 *
 * @example
 * OrganizationsApi.createOrganization(
 *   {
 *     id: "",
 *     title: "MyOrganization",
 *     description: "what an organization",
 *     members: [
 *       { type: "USER", id: "principalId_0" }
 *     ],
 *     roles: [
 *       { type: "ROLE", id: "principalId_1" }
 *     ]
 *   }
 * );
 */
export function createOrganization(organization :Organization) :Promise<*> {

  let errorMsg = '';

  if (!isValidOrganization(organization)) {
    errorMsg = 'invalid parameter: organization must be a valid Organization';
    LOG.error(errorMsg, organization);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .post('/', organization)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /organization/{uuid}`
 *
 * Deletes the Organization for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @returns {Promise}
 *
 * @example
 * OrganizationsApi.deleteOrganization("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function deleteOrganization(organizationId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .delete(`/${organizationId}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{uuid}/title`
 *
 * Updates the title for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string} title
 * @returns {Promise}
 *
 * @example
 * OrganizationsApi.updateTitle(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "New Title"
 * );
 */
export function updateTitle(organizationId :UUID, title :string) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(title)) {
    errorMsg = 'invalid parameter: title must be a non-empty string';
    LOG.error(errorMsg, title);
    return Promise.reject(errorMsg);
  }

  const axiosConfig = {
    headers: {
      'Content-Type': 'text/plain'
    }
  };

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${TITLE_PATH}`, title, axiosConfig)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{uuid}/description`
 *
 * Updates the description for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string} description
 * @returns {Promise}
 *
 * @example
 * OrganizationsApi.updateDescription(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "new description"
 * );
 */
export function updateDescription(organizationId :UUID, description :string) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(description)) {
    errorMsg = 'invalid parameter: description must be a non-empty string';
    LOG.error(errorMsg, description);
    return Promise.reject(errorMsg);
  }

  const axiosConfig = {
    headers: {
      'Content-Type': 'text/plain'
    }
  };

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${DESCRIPTION_PATH}`, description, axiosConfig)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /organizations/{uuid}/email-domains`
 *
 * Gets the auto-approved email domains for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @returns {Promise<string[]>}
 *
 * @example
 * OrganizationsApi.getAutoApprovedEmailDomains("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getAutoApprovedEmailDomains(organizationId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get(`/${organizationId}/${EMAIL_DOMAINS_PATH}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{uuid}/email-domains/{domain}`
 *
 * Adds the given email domain to the auto-approved email domains for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string} emailDomain
 * @returns {Promise}
 *
 * @example
 * OrganizationsApi.addAutoApprovedEmailDomain(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "openlattice.com"
 * );
 */
export function addAutoApprovedEmailDomain(organizationId :UUID, emailDomain :string) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(emailDomain)) {
    errorMsg = 'invalid parameter: emailDomain must be a non-empty string';
    LOG.error(errorMsg);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${EMAIL_DOMAINS_PATH}/${emailDomain}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /organizations/{uuid}/email-domains`
 *
 * Adds the given email domains to the auto-approved email domains for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string[]} emailDomains
 * @returns {Promise}
 *
 * @example
 * OrganizationsApi.addAutoApprovedEmailDomains(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   [
 *     "openlattice.com"
 *   ]
 * );
 */
export function addAutoApprovedEmailDomains(organizationId :UUID, emailDomains :string[]) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyStringArray(emailDomains)) {
    errorMsg = 'invalid parameter: emailDomains must be a non-empty array of strings';
    LOG.error(errorMsg, emailDomains);
    return Promise.reject(errorMsg);
  }

  const emailDomainSet = Set().withMutations((set :Set<string>) => {
    emailDomains.forEach((emailDomain :string) => {
      set.add(emailDomain);
    });
  }).toJS();

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .post(`/${organizationId}/${EMAIL_DOMAINS_PATH}`, emailDomainSet)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{uuid}/email-domains`
 *
 * Sets the auto-approved email domains for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string[]} emailDomains
 * @returns {Promise}
 *
 * @example
 * OrganizationsApi.setAutoApprovedEmailDomains(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   [
 *     "openlattice.com"
 *   ]
 * );
 */
export function setAutoApprovedEmailDomains(organizationId :UUID, emailDomains :string[]) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyStringArray(emailDomains)) {
    errorMsg = 'invalid parameter: emailDomains must be a non-empty array of strings';
    LOG.error(errorMsg, emailDomains);
    return Promise.reject(errorMsg);
  }

  const emailDomainSet = Set().withMutations((set :Set<string>) => {
    emailDomains.forEach((emailDomain :string) => {
      set.add(emailDomain);
    });
  }).toJS();

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${EMAIL_DOMAINS_PATH}`, emailDomainSet)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /organizations/{uuid}/email-domains/{domain}`
 *
 * Removes the given email domain from the auto-approved email domains for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string} emailDomain
 * @returns {Promise}
 *
 * @example
 * OrganizationsApi.removeAutoApprovedEmailDomain(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "openlattice.com"
 * );
 */
export function removeAutoApprovedEmailDomain(organizationId :UUID, emailDomain :string) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(emailDomain)) {
    errorMsg = 'invalid parameter: emailDomain must be a non-empty string';
    LOG.error(errorMsg, emailDomain);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .delete(`/${organizationId}/${EMAIL_DOMAINS_PATH}/${emailDomain}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /organizations/{uuid}/email-domains`
 *
 * Removes the given email domains from the auto-approved email domains for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string[]} emailDomains
 * @returns {Promise}
 *
 * @example
 * OrganizationsApi.removeAutoApprovedEmailDomains(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   [
 *     "openlattice.com"
 *   ]
 * );
 */
export function removeAutoApprovedEmailDomains(organizationId :UUID, emailDomains :string[]) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyStringArray(emailDomains)) {
    errorMsg = 'invalid parameter: emailDomains must be a non-empty array of strings';
    LOG.error(errorMsg, emailDomains);
    return Promise.reject(errorMsg);
  }

  const emailDomainSet = Set().withMutations((set :Set<string>) => {
    emailDomains.forEach((emailDomain :string) => {
      set.add(emailDomain);
    });
  }).toJS();

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .request({
      url: `/${organizationId}/${EMAIL_DOMAINS_PATH}`,
      method: 'delete',
      data: emailDomainSet
    })
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /organizations/{orgId}/principals/roles/{roleId}`
 *
 * Gets the Role for the given Organization UUID corresponding to the given Role UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} roleId
 * @return {Promise}
 *
 * @example
 * OrganizationsApi.getRole("ec6865e6-e60e-424b-a071-6a9c1603d735", "fae6af98-2675-45bd-9a5b-1619a87235a8");
 */
export function getRole(organizationId :UUID, roleId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(roleId)) {
    errorMsg = 'invalid parameter: roleId must be a valid UUID';
    LOG.error(errorMsg, roleId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get(`/${organizationId}/${PRINCIPALS_PATH}/${ROLES_PATH}/${roleId}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /organizations/{orgId}/principals/roles`
 *
 * Gets all Roles for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @returns {Promise<Principal[]>}
 *
 * @example
 * OrganizationsApi.getAllRoles("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getAllRoles(organizationId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get(`/${organizationId}/${PRINCIPALS_PATH}/${ROLES_PATH}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /organizations/roles`
 *
 * Creates a new role, if it does not already exist.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} roleId
 * @param {string} memberId
 * @return {Promise}
 *
 * @example
 * OrganizationsApi.createRole(
 *   {
 *     "id": "",
 *     "organizationId": "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *     "title": "Admin",
 *     "description": "The Administrator",
 *   }
 * );
 */
export function createRole(role :Role) :Promise<*> {

  let errorMsg = '';

  if (!isValidRole(role)) {
    errorMsg = 'invalid parameter: role must be a valid Role';
    LOG.error(errorMsg, role);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .post(`/${ROLES_PATH}`, role)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /organizations/{orgId}/principals/roles/{roleId}`
 *
 * Deletes the role identified by the given org UUID and role UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} roleId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.deleteRole("ec6865e6-e60e-424b-a071-6a9c1603d735", "fae6af98-2675-45bd-9a5b-1619a87235a8");
 */
export function deleteRole(organizationId :UUID, roleId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(roleId)) {
    errorMsg = 'invalid parameter: roleId must be a valid UUID';
    LOG.error(errorMsg, roleId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .delete(`/${organizationId}/${PRINCIPALS_PATH}/${ROLES_PATH}/${roleId}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{orgId}/principals/roles/{roleId}/title`
 *
 * Updates the title of the role identified by the given org UUID and role UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} roleId
 * @param {string} title
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.updateRoleTitle(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "fae6af98-2675-45bd-9a5b-1619a87235a8",
 *   "ADMIN"
 * );
 */
export function updateRoleTitle(organizationId :UUID, roleId :UUID, title :string) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(roleId)) {
    errorMsg = 'invalid parameter: roleId must be a valid UUID';
    LOG.error(errorMsg, roleId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(title)) {
    errorMsg = 'invalid parameter: title must be a non-empty string';
    LOG.error(errorMsg, title);
    return Promise.reject(errorMsg);
  }

  const axiosConfig = {
    headers: {
      'Content-Type': 'text/plain'
    }
  };

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${PRINCIPALS_PATH}/${ROLES_PATH}/${roleId}/${TITLE_PATH}`, title, axiosConfig)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{orgId}/principals/roles/{roleId}/description`
 *
 * Updates the description of the role identified by the given org UUID and role UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} roleId
 * @param {string} description
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.updateRoleDescription(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "fae6af98-2675-45bd-9a5b-1619a87235a8",
 *   "The Administrator"
 * );
 */
export function updateRoleDescription(organizationId :UUID, roleId :UUID, description :string) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(roleId)) {
    errorMsg = 'invalid parameter: roleId must be a valid UUID';
    LOG.error(errorMsg, roleId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(description)) {
    errorMsg = 'invalid parameter: description must be a non-empty string';
    LOG.error(errorMsg, description);
    return Promise.reject(errorMsg);
  }

  const axiosConfig = {
    headers: {
      'Content-Type': 'text/plain'
    }
  };

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${PRINCIPALS_PATH}/${ROLES_PATH}/${roleId}/${DESCRIPTION_PATH}`, description, axiosConfig)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{orgId}/principals/roles/{roleId}/members/{memberId}`
 *
 * Assigns the role identified by the given org UUID and role UUID to the member of the organization identified by
 * the given member UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} roleId
 * @param {string} memberId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.addRoleToMember(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "fae6af98-2675-45bd-9a5b-1619a87235a8",
 *   "memberId"
 * );
 */
export function addRoleToMember(organizationId :UUID, roleId :UUID, memberId :string) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(roleId)) {
    errorMsg = 'invalid parameter: roleId must be a valid UUID';
    LOG.error(errorMsg, roleId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(memberId)) {
    errorMsg = 'invalid parameter: memberId must be a non-empty string';
    LOG.error(errorMsg, memberId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${PRINCIPALS_PATH}/${ROLES_PATH}/${roleId}/${MEMBERS_PATH}/${memberId}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /organizations/{orgId}/principals/roles/{roleId}/members/{memberId}`
 *
 * Removes the role identified by the given org UUID and role UUID from the member of the organization identified by
 * the given member UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID} roleId
 * @param {string} memberId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.removeRoleFromMember(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "fae6af98-2675-45bd-9a5b-1619a87235a8",
 *   "memberId"
 * );
 */
export function removeRoleFromMember(organizationId :UUID, roleId :UUID, memberId :string) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(roleId)) {
    errorMsg = 'invalid parameter: roleId must be a valid UUID';
    LOG.error(errorMsg, roleId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(memberId)) {
    errorMsg = 'invalid parameter: memberId must be a non-empty string';
    LOG.error(errorMsg, memberId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .delete(`/${organizationId}/${PRINCIPALS_PATH}/${ROLES_PATH}/${roleId}/${MEMBERS_PATH}/${memberId}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /organizations/{orgId}/principals/members`
 *
 * Gets all Roles for the given Organization UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @returns {Promise<Principal[]>}
 *
 * @example
 * OrganizationsApi.getAllMembers("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getAllMembers(organizationId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get(`/${organizationId}/${PRINCIPALS_PATH}/${MEMBERS_PATH}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /organizations/{orgId}/principals/members/{memberId}`
 *
 * Adds the member identified by the given member UUID to the organization identified by the given org UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string} memberId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.addMemberToOrganization(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "memberId"
 * );
 */
export function addMemberToOrganization(organizationId :UUID, memberId :string) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(memberId)) {
    errorMsg = 'invalid parameter: memberId must be a non-empty string';
    LOG.error(errorMsg, memberId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .put(`/${organizationId}/${PRINCIPALS_PATH}/${MEMBERS_PATH}/${memberId}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /organizations/{orgId}/principals/members/{memberId}`
 *
 * Removes the member identified by the given member UUID from the organization identified by the given org UUID.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string} memberId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * OrganizationsApi.removeMemberFromOrganization(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "memberId"
 * );
 */
export function removeMemberFromOrganization(organizationId :UUID, memberId :string) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(memberId)) {
    errorMsg = 'invalid parameter: memberId must be a non-empty string';
    LOG.error(errorMsg, memberId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .delete(`/${organizationId}/${PRINCIPALS_PATH}/${MEMBERS_PATH}/${memberId}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /organizations/{orgId}/entity-sets`
 *
 * Retrieves all the organization entity sets without filtering.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @return {Promise} - a Promise that resolves with a map from entity set ids to OrganizationEntitySetFlags
 *
 * @example
 * OrganizationsApi.getOrganizationEntitySets("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getOrganizationEntitySets(organizationId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .get(`/${organizationId}/${ENTITY_SETS_PATH}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /organizations/{orgId}/entity-sets`
 *
 * Retrieves all the organization entity sets filtered according to the flags provided.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {string[]} flags
 * @return {Promise} - a Promise that resolves with a map from entity set ids to OrganizationEntitySetFlags
 *
 * @example
 * OrganizationsApi.getFilteredOrganizationEntitySets(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   ["INTERNAL"]
 * );
 */
export function getFilteredOrganizationEntitySets(organizationId :UUID, flags :string[]) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyStringArray(flags)) {
    errorMsg = 'invalid parameter: flags must be a non-empty string array';
    LOG.error(errorMsg, flags);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .post(`/${organizationId}/${ENTITY_SETS_PATH}`, flags)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /organizations/{orgId}/entity-sets/assemble`
 *
 * Materializes entity sets into the organization database.
 *
 * @static
 * @memberof lattice.OrganizationsApi
 * @param {UUID} organizationId
 * @param {UUID[]} entitySetIds
 * @return {Promise} - a Promise that resolves with a map from entity set ids to OrganizationEntitySetFlags
 *
 * @example
 * OrganizationsApi.assembleEntitySets(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   ["0c8be4b7-0bd5-4dd1-a623-da78871c9d0e"]
 * );
 */
export function assembleEntitySets(organizationId :UUID, entitySetIds :UUID[]) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuidArray(entitySetIds)) {
    errorMsg = 'invalid parameter: entitySetIds must be a valid UUID array';
    LOG.error(errorMsg, entitySetIds);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ORGANIZATIONS_API)
    .post(`/${organizationId}/${ENTITY_SETS_PATH}/${ASSEMBLE_PATH}`, entitySetIds)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
