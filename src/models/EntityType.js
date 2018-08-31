/*
 * @flow
 */

import has from 'lodash/has';
import { Set, fromJS } from 'immutable';

import FullyQualifiedName from './FullyQualifiedName';
import SecurableTypes from '../constants/types/SecurableTypes';
import Logger from '../utils/Logger';

import {
  isDefined,
  isEmptyArray,
  isEmptyString,
  isNonEmptyString
} from '../utils/LangUtils';

import {
  isValidFqnArray,
  isValidUuid,
  isValidUuidArray,
  validateNonEmptyArray
} from '../utils/ValidationUtils';

import type { FQN } from './FullyQualifiedName';
import type { SecurableType } from '../constants/types/SecurableTypes';

const LOG = new Logger('EntityType');

/**
 * @class EntityType
 * @memberof lattice
 */
export default class EntityType {

  id :?UUID;
  type :FQN;
  title :string;
  description :?string;
  schemas :FQN[];
  key :UUID[];
  properties :UUID[];
  baseType :?UUID;
  category :?SecurableType;

  constructor(
    id :?UUID,
    type :FQN,
    title :string,
    description :?string,
    schemas :FQN[],
    key :UUID[],
    properties :UUID[],
    baseType :?UUID,
    category :?SecurableType
  ) {

    // required properties
    this.type = type;
    this.title = title;
    this.schemas = schemas;
    this.key = key;
    this.properties = properties;

    // optional properties
    if (isDefined(id)) {
      this.id = id;
    }

    if (isDefined(description)) {
      this.description = description;
    }

    if (isDefined(baseType)) {
      this.baseType = baseType;
    }

    if (isDefined(category)) {
      this.category = category;
    }
  }

  asImmutable() {

    const entityTypeObj = {};

    // required properties
    entityTypeObj.type = this.type;
    entityTypeObj.title = this.title;
    entityTypeObj.schemas = this.schemas;
    entityTypeObj.key = this.key;
    entityTypeObj.properties = this.properties;

    // optional properties
    if (isDefined(this.id)) {
      entityTypeObj.id = this.id;
    }

    if (isDefined(this.description)) {
      entityTypeObj.description = this.description;
    }

    if (isDefined(this.baseType)) {
      entityTypeObj.baseType = this.baseType;
    }

    if (isDefined(this.category)) {
      entityTypeObj.category = this.category;
    }

    return fromJS(entityTypeObj);
  }
}

/**
 * @class EntityTypeBuilder
 * @memberof lattice
 */
export class EntityTypeBuilder {

  id :?UUID;
  type :FQN;
  title :string;
  description :?string;
  schemas :FQN[];
  key :UUID[];
  properties :UUID[];
  baseType :?UUID;
  category :?SecurableType;

  setId(entityTypeId :?UUID) :EntityTypeBuilder {

    if (!isDefined(entityTypeId) || isEmptyString(entityTypeId)) {
      return this;
    }

    if (!isValidUuid(entityTypeId)) {
      throw new Error('invalid parameter: entityTypeId must be a valid UUID');
    }

    this.id = entityTypeId;
    return this;
  }

  setType(entityTypeFqn :FQN) :EntityTypeBuilder {

    if (!FullyQualifiedName.isValid(entityTypeFqn)) {
      throw new Error('invalid parameter: entityTypeFqn must be a valid FQN');
    }

    this.type = entityTypeFqn;
    return this;
  }

  setTitle(title :string) :EntityTypeBuilder {

    if (!isNonEmptyString(title)) {
      throw new Error('invalid parameter: title must be a non-empty string');
    }

    this.title = title;
    return this;
  }

  setDescription(description :?string) :EntityTypeBuilder {

    if (!isDefined(description) || isEmptyString(description)) {
      return this;
    }

    if (!isNonEmptyString(description)) {
      throw new Error('invalid parameter: description must be a non-empty string');
    }

    this.description = description;
    return this;
  }

  setSchemas(schemas :FQN[]) :EntityTypeBuilder {

    if (!isDefined(schemas) || isEmptyArray(schemas)) {
      return this;
    }

    if (!isValidFqnArray(schemas)) {
      throw new Error('invalid parameter: schemas must be a non-empty array of valid FQNs');
    }

    this.schemas = Set().withMutations((set :Set<FQN>) => {
      schemas.forEach((schemaFqn :FQN) => {
        set.add(schemaFqn);
      });
    }).toJS();

    return this;
  }

  setKey(key :UUID[]) :EntityTypeBuilder {

    if (!isDefined(key) || isEmptyArray(key)) {
      return this;
    }

    if (!isValidUuidArray(key)) {
      throw new Error('invalid parameter: key must be a non-empty array of valid UUIDs');
    }

    this.key = Set().withMutations((set :Set<UUID>) => {
      key.forEach((keyId :UUID) => {
        set.add(keyId);
      });
    }).toJS();

    return this;
  }

  setPropertyTypes(propertyTypes :UUID[]) :EntityTypeBuilder {

    if (!isDefined(propertyTypes) || isEmptyArray(propertyTypes)) {
      return this;
    }

    if (!isValidUuidArray(propertyTypes)) {
      throw new Error('invalid parameter: propertyTypes must be a non-empty array of valid UUIDs');
    }

    this.properties = Set().withMutations((set :Set<UUID>) => {
      propertyTypes.forEach((propertyTypeId :UUID) => {
        set.add(propertyTypeId);
      });
    }).toJS();

    return this;
  }

  setBaseType(baseType :UUID) :EntityTypeBuilder {

    if (!isDefined(baseType) || isEmptyString(baseType)) {
      return this;
    }

    if (!isValidUuid(baseType)) {
      throw new Error('invalid parameter: baseType must be a valid UUID');
    }

    this.baseType = baseType;
    return this;
  }

  setCategory(category :SecurableType) :EntityTypeBuilder {

    if (!isDefined(category) || isEmptyString(category)) {
      return this;
    }

    if (!isNonEmptyString(category) || !SecurableTypes[category]) {
      throw new Error('invalid parameter: category must be a valid SecurableType');
    }

    this.category = category;
    return this;
  }

  build() :EntityType {

    let errorMsg :string = '';

    if (!this.type) {
      errorMsg = 'missing property: type is a required property';
    }

    if (!this.title) {
      errorMsg = 'missing property: title is a required property';
    }

    if (errorMsg) {
      LOG.error(errorMsg);
      throw new Error(errorMsg);
    }

    if (!this.schemas) {
      this.schemas = [];
    }

    if (!this.key) {
      this.key = [];
    }

    if (!this.properties) {
      this.properties = [];
    }

    return new EntityType(
      this.id,
      this.type,
      this.title,
      this.description,
      this.schemas,
      this.key,
      this.properties,
      this.baseType,
      this.category
    );
  }
}

export function isValidEntityType(entityType :any) :boolean {

  if (!isDefined(entityType)) {

    LOG.error('invalid parameter: entityType must be defined', entityType);
    return false;
  }

  try {

    const entityTypeBuilder = new EntityTypeBuilder();

    // required properties
    entityTypeBuilder
      .setType(entityType.type)
      .setTitle(entityType.title)
      .setSchemas(entityType.schemas)
      .setKey(entityType.key)
      .setPropertyTypes(entityType.properties);

    // optional properties
    if (has(entityType, 'id')) {
      entityTypeBuilder.setId(entityType.id);
    }

    if (has(entityType, 'description')) {
      entityTypeBuilder.setDescription(entityType.description);
    }

    if (has(entityType, 'baseType')) {
      entityTypeBuilder.setBaseType(entityType.baseType);
    }

    if (has(entityType, 'category')) {
      entityTypeBuilder.setCategory(entityType.category);
    }

    entityTypeBuilder.build();

    return true;
  }
  catch (e) {

    LOG.error(e, entityType);
    return false;
  }
}

export function isValidEntityTypeArray(entityTypes :EntityType[]) :boolean {

  return validateNonEmptyArray(entityTypes, (entityType :EntityType) => isValidEntityType(entityType));
}
