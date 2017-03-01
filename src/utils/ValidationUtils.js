/*
 * @flow
 */

import validateUUID from 'uuid-validate';

import PermissionTypes from '../constants/types/PermissionTypes';
import FullyQualifiedName from '../models/FullyQualifiedName';

import AccessCheck, {
  isValid as isValidAccessCheck
} from '../models/AccessCheck';

import Ace, {
  isValid as isValidAce
} from '../models/Ace';

import EntitySet, {
  isValid as isValidEntitySet
} from '../models/EntitySet';

import EntityType, {
  isValid as isValidEntityType
} from '../models/EntityType';

import Principal, {
  isValid as isValidPrincipal
} from '../models/Principal';

import PropertyType, {
  isValid as isValidPropertyType
} from '../models/PropertyType';

import Request, {
  isValid as isValidRequest
} from '../models/Request';

import RequestStatus, {
  isValid as isValidRequestStatus
} from '../models/RequestStatus';

import {
  isNonEmptyArray,
  isNonEmptyString
} from './LangUtils';

import type {
  Permission
} from '../constants/types/PermissionTypes';

const BASE_UUID :string = '00000000-0000-0000-0000-000000000000';

export function validateNonEmptyArray(value :any[], validatorFn :Function) :boolean {

  if (!isNonEmptyArray(value)) {
    return false;
  }

  for (let index = 0; index < value.length; index += 1) {
    if (!validatorFn(value[index])) {
      return false;
    }
  }

  return true;
}

export function isValidUuid(value :any) :boolean {

  return validateUUID(value) || value === BASE_UUID;
}

export function isValidUuidArray(uuids :UUID[]) :boolean {

  return validateNonEmptyArray(uuids, (id :UUID) => {
    return isValidUuid(id);
  });
}

export function isValidFqnArray(fqns :FullyQualifiedName[]) :boolean {

  return validateNonEmptyArray(fqns, (fqn :FullyQualifiedName) => {
    return FullyQualifiedName.isValid(fqn);
  });
}

export function isValidEntitySetArray(entitySets :EntitySet[]) :boolean {

  return validateNonEmptyArray(entitySets, (entitySet :EntitySet) => {
    return isValidEntitySet(entitySet);
  });
}

export function isValidEntityTypeArray(entityTypes :EntityType[]) :boolean {

  return validateNonEmptyArray(entityTypes, (entityType :EntityType) => {
    return isValidEntityType(entityType);
  });
}

export function isValidPropertyTypeArray(propertyTypes :PropertyType[]) :boolean {

  return validateNonEmptyArray(propertyTypes, (propertyType :PropertyType) => {
    return isValidPropertyType(propertyType);
  });
}

export function isValidAceArray(aces :Ace[]) :boolean {

  return validateNonEmptyArray(aces, (ace :Ace) => {
    return isValidAce(ace);
  });
}

export function isValidPermissionArray(permissions :Permission[]) :boolean {

  return validateNonEmptyArray(permissions, (permission :Permission) => {
    return isNonEmptyString(permission) && PermissionTypes[permission];
  });
}

export function isValidPrincipalArray(principals :Principal[]) :boolean {

  return validateNonEmptyArray(principals, (principal :Principal) => {
    return isValidPrincipal(principal);
  });
}

export function isValidAccessCheckArray(accessChecks :AccessCheck[]) :boolean {

  return validateNonEmptyArray(accessChecks, (accessCheck :AccessCheck) => {
    return isValidAccessCheck(accessCheck);
  });
}

export function isValidRequestArray(requests :Request[]) :boolean {

  return validateNonEmptyArray(requests, (request :Request) => {
    return isValidRequest(request);
  });
}

export function isValidRequestStatusArray(statuses :RequestStatus[]) :boolean {

  return validateNonEmptyArray(statuses, (requestStatus :RequestStatus) => {
    return isValidRequestStatus(requestStatus);
  });
}
