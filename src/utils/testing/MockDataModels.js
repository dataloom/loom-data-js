/*
 * @flow
 */

import { genRandomBoolean, genRandomString, genRandomUUID } from './MockUtils';
import {
  AnalyzerTypes,
  IndexTypes,
  PrincipalTypes,
  RequestStateTypes,
  SecurableTypes,
} from '../../constants/types';
import {
  AssociationType,
  AssociationTypeBuilder,
  EntityType,
  EntityTypeBuilder,
  FullyQualifiedName,
  PropertyType,
  PropertyTypeBuilder,
  Schema,
  SchemaBuilder,
} from '../../models';

const MOCK_NAMESPACE = 'OPENLATTICE';

const MOCK_ACL_KEY :string[] = [
  'ae9e1cc3-ba0d-4532-9860-e5e7eaf36e83',
  '9b93bc80-79c3-44c8-807c-ada1a8d6484f',
];

const MOCK_FQN :Object = {
  namespace: 'LATTICE',
  name: 'Data'
};

const MOCK_ACCESS_CHECK_DM :Object = {
  aclKey: MOCK_ACL_KEY,
  permissions: ['READ']
};

const MOCK_ACE_DM :Object = {
  principal: { type: 'USER', id: 'principalId' },
  permissions: ['READ']
};

const MOCK_ACL_DM :Object = {
  aclKey: MOCK_ACL_KEY,
  aces: [MOCK_ACE_DM]
};

const MOCK_ACL_DATA_DM :Object = {
  acl: MOCK_ACL_DM,
  action: 'ADD'
};

const MOCK_APP_DM :Object = {
  name: 'name',
  title: 'title',
  description: 'description',
  id: 'fae6af98-2675-45bd-9a5b-1619a87235a8',
  appTypeIds: ['ec6865e6-e60e-424b-a071-6a9c1603d735'],
  url: 'test.com'
};

const MOCK_APP_TYPE_DM :Object = {
  type: { namespace: 'LATTICE', name: 'MockType' },
  title: 'title',
  description: 'description',
  id: 'fae6af98-2675-45bd-9a5b-1619a87235a8',
  entityTypeId: 'ec6865e6-e60e-424b-a071-6a9c1603d735'
};

const MOCK_DATA_EDGE_KEY_DM :Object = {
  dst: {
    entityKeyId: 'fd97726d-945e-4dc1-9b99-c49dc55c3e24',
    entitySetId: 'c9cee876-b704-4dda-9fb8-80b03352518e',
  },
  edge: {
    entityKeyId: '51631757-1fac-4e7b-8af6-a716449ffb36',
    entitySetId: 'f717ec83-13c4-4591-86ad-a050e11305da',
  },
  src: {
    entityKeyId: '53f45e4b-48a4-4089-8932-3655a5b0d50a',
    entitySetId: 'c3dbd929-91c9-4b48-9545-a634038f34ba',
  },
};

const MOCK_DATA_EDGE_DM :Object = {
  'a680a1d8-73fb-423c-abd2-fd71965693d2': [{
    data: {
      '6a74d45c-9451-4f88-b8c8-a0e27c08b2a2': ['value_1', 'value_2'],
    },
    dst: {
      entitySetId: '69682f1e-6039-44da-8342-522395b43738',
      entityKeyId: 'cf72e97f-109c-46a1-bb89-93a8753fd7ac'
    },
    src: {
      entitySetId: '5e4a579a-ad72-4902-991c-027d80dcd590',
      entityKeyId: '5e4a579a-ad72-4902-991c-027d80dcd590'
    },
  }]
};

const MOCK_DATA_SOURCE_DM :Object = {
  id: 'ec6865e6-e60e-424b-a071-6a9c1603d735',
  title: 'title',
  description: 'description',
  entitySetIds: [
    'e39dfdfa-a3e6-4f1f-b54b-646a723c3085',
    'fae6af98-2675-45bd-9a5b-1619a87235a8'
  ]
};

const MOCK_ENTITY_DATA_KEY_DM :Object = {
  entityKeyId: 'cd585a31-a532-4e52-9791-59d778e39255',
  entitySetId: 'f74f01b0-3629-4b97-b6ac-0813b9f11551',
};

const MOCK_ENTITY_SET_DM :Object = {
  id: 'ec6865e6-e60e-424b-a071-6a9c1603d735',
  entityTypeId: '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e',
  name: 'name',
  title: 'title',
  description: 'description',
  contacts: ['LATTICE']
};

const MOCK_ENTITY_TYPE :EntityType = new EntityTypeBuilder()
  .setId('ec6865e6-e60e-424b-a071-6a9c1603d735')
  .setType(new FullyQualifiedName('OL', 'MockEntityType'))
  .setTitle('title')
  .setDescription('description')
  .setKey([
    '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e',
    '4b08e1f9-4a00-4169-92ea-10e377070220',
  ])
  .setPropertyTypes([
    '8f79e123-3411-4099-a41f-88e5d22d0e8d',
    'e39dfdfa-a3e6-4f1f-b54b-646a723c3085',
    'fae6af98-2675-45bd-9a5b-1619a87235a8',
  ])
  .setBaseType('9a768c9b-b76f-4fa1-be60-0178695cdbc3')
  .setCategory(SecurableTypes.EntityType)
  .setSchemas([new FullyQualifiedName('OL', 'MockSchema')])
  .setPropertyTags({
    '11f65a3c-158e-4bea-9e6d-dc7ff2396ef0': ['TAG_0', 'TAG_1'],
    '5993e81e-1265-4d00-8b25-9dafb5261bd4': ['TAG_0'],
  })
  .setShards(1)
  .build();

function genRandomEntityType() :EntityType {
  return new EntityTypeBuilder()
    .setId(genRandomUUID())
    .setType(new FullyQualifiedName(genRandomString(), genRandomString()))
    .setTitle(genRandomString())
    .setDescription(genRandomString())
    .setKey([genRandomUUID(), genRandomUUID()])
    .setPropertyTypes([genRandomUUID(), genRandomUUID(), genRandomUUID()])
    .setBaseType(genRandomUUID())
    .setCategory(SecurableTypes.EntityType)
    .setSchemas([new FullyQualifiedName(genRandomString(), genRandomString())])
    .setPropertyTags({
      [genRandomUUID()]: [genRandomString(), genRandomString()],
      [genRandomUUID()]: [genRandomString()],
    })
    .setShards(1)
    .build();
}

const MOCK_ASSOCIATION_TYPE :AssociationType = new AssociationTypeBuilder()
  .setEntityType(MOCK_ENTITY_TYPE)
  .setSourceEntityTypeIds([
    'c49832e9-8c49-4d24-984a-2221b4fa249b',
    'bec4adc8-79dc-48ab-afda-e203c5573ff5',
  ])
  .setDestinationEntityTypeIds([
    '91385fae-babc-4bd3-ba42-74decb9036f0',
    '80630df9-f6a4-4213-bbcb-b89826cf14a6',
    'c1366efe-f619-4f30-bb6a-0b7437966e65',
  ])
  .setBidirectional(false)
  .build();

function genRandomAssociationType() :AssociationType {
  return new AssociationTypeBuilder()
    .setEntityType(genRandomEntityType())
    .setSourceEntityTypeIds([genRandomUUID(), genRandomUUID()])
    .setDestinationEntityTypeIds([genRandomUUID(), genRandomUUID(), genRandomUUID()])
    .setBidirectional(genRandomBoolean())
    .build();
}

const MOCK_PROPERTY_TYPE :PropertyType = new PropertyTypeBuilder()
  .setId('3771c28a-cdee-403b-9cea-48845210f8ab')
  .setType(new FullyQualifiedName('OL', 'MockPropertyType'))
  .setTitle('title')
  .setDescription('description')
  .setDataType('String')
  .setAnalyzer(AnalyzerTypes.STANDARD)
  .setPii(false)
  .setSchemas([new FullyQualifiedName('OL', 'MockSchema')])
  .setMultiValued(false)
  .setEnumValues(['ENUM_1', 'ENUM_2'])
  .setIndexType(IndexTypes.BTREE)
  .build();

function genRandomPropertyType() :PropertyType {
  return new PropertyTypeBuilder()
    .setId(genRandomUUID())
    .setType(new FullyQualifiedName(genRandomString(), genRandomString()))
    .setTitle(genRandomString())
    .setDescription(genRandomString())
    .setDataType('String')
    .setSchemas([new FullyQualifiedName(genRandomString(), genRandomString())])
    .setPii(genRandomBoolean())
    .setAnalyzer(AnalyzerTypes.STANDARD)
    .setMultiValued(genRandomBoolean())
    .setEnumValues([genRandomString(), genRandomString()])
    .setIndexType(IndexTypes.HASH)
    .build();
}

const MOCK_LINKING_ENTITY_SET_DM :Object = {
  entitySet: MOCK_ENTITY_SET_DM,
  linkingProperties: [
    {
      '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e': '4b08e1f9-4a00-4169-92ea-10e377070220',
      'e39dfdfa-a3e6-4f1f-b54b-646a723c3085': 'ec6865e6-e60e-424b-a071-6a9c1603d735'
    },
    {
      'fae6af98-2675-45bd-9a5b-1619a87235a8': '8f79e123-3411-4099-a41f-88e5d22d0e8d'
    }
  ]
};

const MOCK_LINKING_ENTITY_TYPE_DM :Object = {
  entityType: MOCK_ENTITY_TYPE,
  entityTypeIds: [
    'e39dfdfa-a3e6-4f1f-b54b-646a723c3085',
    'fae6af98-2675-45bd-9a5b-1619a87235a8'
  ],
  deidentified: false
};

const MOCK_LINKING_REQUEST_DM :Object = {
  linkingEntitySet: MOCK_LINKING_ENTITY_SET_DM,
  propertyTypeIds: [
    '4b08e1f9-4a00-4169-92ea-10e377070220',
    'ec6865e6-e60e-424b-a071-6a9c1603d735'
  ]
};

const MOCK_ORGANIZATION_DM :Object = {
  id: 'ec6865e6-e60e-424b-a071-6a9c1603d735',
  title: 'title',
  description: 'description',
  principal: { type: 'ORGANIZATION', id: 'orgid' },
  members: [{ type: 'USER', id: 'principalId_0' }],
  roles: [{ type: 'ROLE', id: 'principalId_1' }],
  emails: ['openlattice.com'],
  apps: [
    '4b08e1f9-4a00-4169-92ea-10e377070220',
    'ec6865e6-e60e-424b-a071-6a9c1603d735'
  ]
};

const MOCK_PRINCIPAL_DM :Object = {
  type: PrincipalTypes.USER,
  id: 'mockPrincipalId'
};

const MOCK_REQUEST_DM :Object = {
  aclKey: MOCK_ACL_KEY,
  permissions: ['READ'],
  reason: 'reason'
};

const MOCK_REQUEST_STATUS_DM :Object = {
  request: MOCK_REQUEST_DM,
  state: RequestStateTypes.SUBMITTED,
  principal: MOCK_PRINCIPAL_DM
};

const MOCK_ROLE_DM :Object = {
  id: 'fae6af98-2675-45bd-9a5b-1619a87235a8',
  organizationId: 'ec6865e6-e60e-424b-a071-6a9c1603d735',
  title: 'title',
  description: 'description',
  principal: { type: 'ROLE', id: 'roleid' }
};

const MOCK_SCHEMA :Schema = new SchemaBuilder()
  .setEntityTypes([MOCK_ENTITY_TYPE])
  .setFullyQualifiedName(new FullyQualifiedName('OL', 'MockSchema'))
  .setPropertyTypes([MOCK_PROPERTY_TYPE])
  .build();

function genRandomSchema() :Schema {
  return new SchemaBuilder()
    .setEntityTypes([genRandomEntityType()])
    .setFullyQualifiedName(new FullyQualifiedName(genRandomString(), genRandomString()))
    .setPropertyTypes([genRandomPropertyType(), genRandomPropertyType()])
    .build();
}

const MOCK_EDM_DM :Object = {
  associationTypes: [MOCK_ASSOCIATION_TYPE],
  entityTypes: [MOCK_ENTITY_TYPE],
  namespaces: [MOCK_NAMESPACE],
  propertyTypes: [MOCK_PROPERTY_TYPE],
  schemas: [MOCK_SCHEMA],
  version: 'd7553374-4ab8-4954-ae50-857948f5265f',
};

const MOCK_DATA_GRAPH_DM :Object = {
  associations: {
    'a680a1d8-73fb-423c-abd2-fd71965693d2': [{
      dstEntityIndex: 2,
      dstEntityKeyId: 'cf72e97f-109c-46a1-bb89-93a8753fd7ac',
      dstEntitySetId: '69682f1e-6039-44da-8342-522395b43738',
      srcEntityIndex: 4,
      srcEntityKeyId: '5e4a579a-ad72-4902-991c-027d80dcd590',
      srcEntitySetId: 'd66c4c7d-0aa9-43f3-bb80-9ebcbd5e21ea',
    }]
  },
  entities: {
    'c92f4318-9f93-4f88-94c1-0ca5b3b278ab': [{
      '6a74d45c-9451-4f88-b8c8-a0e27c08b2a2': ['value_1', 'value_2'],
    }]
  },
};

function genRandomDataGraph() :Object {
  return {
    associations: {
      [genRandomUUID()]: [{
        dstEntityIndex: 2,
        dstEntityKeyId: genRandomUUID(),
        dstEntitySetId: genRandomUUID(),
        srcEntityIndex: 4,
        srcEntityKeyId: genRandomUUID(),
        srcEntitySetId: genRandomUUID(),
      }]
    },
    entities: {
      [genRandomUUID()]: [{
        [genRandomUUID()]: [genRandomString()],
        [genRandomUUID()]: [genRandomString(), genRandomString()],
      }]
    },
  };
}

export {
  MOCK_ACCESS_CHECK_DM,
  MOCK_ACE_DM,
  MOCK_ACL_DATA_DM,
  MOCK_ACL_DM,
  MOCK_ACL_KEY,
  MOCK_APP_DM,
  MOCK_APP_TYPE_DM,
  MOCK_ASSOCIATION_TYPE,
  MOCK_DATA_EDGE_KEY_DM,
  MOCK_DATA_EDGE_DM,
  MOCK_DATA_GRAPH_DM,
  MOCK_DATA_SOURCE_DM,
  MOCK_EDM_DM,
  MOCK_ENTITY_DATA_KEY_DM,
  MOCK_ENTITY_SET_DM,
  MOCK_ENTITY_TYPE,
  MOCK_FQN,
  MOCK_LINKING_ENTITY_SET_DM,
  MOCK_LINKING_ENTITY_TYPE_DM,
  MOCK_LINKING_REQUEST_DM,
  MOCK_NAMESPACE,
  MOCK_ORGANIZATION_DM,
  MOCK_PRINCIPAL_DM,
  MOCK_PROPERTY_TYPE,
  MOCK_REQUEST_DM,
  MOCK_REQUEST_STATUS_DM,
  MOCK_ROLE_DM,
  MOCK_SCHEMA,
  genRandomAssociationType,
  genRandomDataGraph,
  genRandomEntityType,
  genRandomPropertyType,
  genRandomSchema,
};
