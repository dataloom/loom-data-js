/* eslint-disable no-use-before-define */

import { fromJS } from 'immutable';

import * as AxiosUtils from '../utils/axios';
import * as Config from '../config/Configuration';
import * as DataApi from './DataApi';
import { DATA_API } from '../constants/ApiNames';
import { MOCK_DATA_EDGE_DM, MOCK_DATA_GRAPH_DM } from '../utils/testing/MockData';
import { UpdateTypes, DeleteTypes } from '../constants/types';

import {
  ASSOCIATION_PATH,
  CSRF_TOKEN,
  COUNT_PATH,
  NEIGHBORS_PATH,
  SET_ID,
  SET_PATH,
  TYPE_PATH
} from '../constants/UrlConstants';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
  INVALID_PARAMS_FOR_OPTIONAL_STRING,
  INVALID_PARAMS_SS,
} from '../utils/testing/Invalid';

import {
  genMockBaseUrl,
  genRandomString,
  genRandomUUID,
  getMockAxiosInstance
} from '../utils/testing/MockUtils';

import {
  assertApiShouldSendCorrectHttpRequest,
  testApiShouldCatchRejectedPromise,
  testApiShouldNotThrowOnInvalidParameters,
  testApiShouldRejectOnInvalidParameters,
  testApiShouldReturnPromise,
  testApiShouldReturnNullOnInvalidParameters,
  testApiShouldSendCorrectHttpRequest,
  testApiShouldUseCorrectAxiosInstance
} from '../utils/testing/TestUtils';

/*
 * mocks
 */

const MOCK_BASE_URL = genMockBaseUrl();
const MOCK_FILE_TYPE = 'json';

jest.mock('../utils/axios');
jest.mock('../config/Configuration');
AxiosUtils.getApiBaseUrl.mockImplementation(() => MOCK_BASE_URL);
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

/*
 * tests
 */

describe('DataApi', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  createAssociations();
  createEntityAndAssociationData();
  createOrMergeEntityData();
  deleteEntitiesAndNeighbors();
  deleteEntity();
  deleteEntityData();
  deleteEntitySet();
  getEntityData();
  getEntitySetData();
  getEntitySetDataFileUrl();
  getEntitySetSize();
  replaceEntityData();
  replaceEntityInEntitySet();
  replaceEntityInEntitySetUsingFqns();
});

function createAssociations() {

  describe('createAssociations()', () => {

    const fnToTest = DataApi.createAssociations;
    const validParams = [MOCK_DATA_EDGE_DM];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${ASSOCIATION_PATH}`, MOCK_DATA_EDGE_DM];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function createEntityAndAssociationData() {

  describe('createEntityAndAssociationData()', () => {

    const fnToTest = DataApi.createEntityAndAssociationData;
    const validParams = [MOCK_DATA_GRAPH_DM];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = ['/', MOCK_DATA_GRAPH_DM];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function createOrMergeEntityData() {

  describe('createOrMergeEntityData()', () => {

    const fnToTest = DataApi.createOrMergeEntityData;
    const mockEntitySetId = genRandomUUID();
    const mockEntityData = [{
      [`${genRandomUUID()}`]: ['value_1', 'value_2'],
      [`${genRandomUUID()}`]: ['value_3', 'value_4']
    }];

    const validParams = [mockEntitySetId, mockEntityData];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${SET_PATH}/?${SET_ID}=${mockEntitySetId}`, mockEntityData];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function deleteEntitiesAndNeighbors() {

  describe('deleteEntitiesAndNeighbors()', () => {

    const fnToTest = DataApi.deleteEntitiesAndNeighbors;
    const mockEntitySetId = genRandomUUID();
    const mockEntityKeyId = genRandomUUID();
    const validParams = [mockEntitySetId, { entityKeyIds: [mockEntityKeyId] }, DeleteTypes.Soft];
    const invalidParams = [
      INVALID_PARAMS_SS,
      {
        destinationEntitySetIds: INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
        entityKeyIds: INVALID_PARAMS_SS,
        sourceEntitySetIds: INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
      },
      INVALID_PARAMS_SS,
    ];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldCatchRejectedPromise(fnToTest, validParams);

    test('type=Soft', () => {
      const apiInvocationParams = [mockEntitySetId, { entityKeyIds: [mockEntityKeyId] }, DeleteTypes.Soft];
      const expectedAxiosParams = [
        `/${SET_PATH}/${mockEntitySetId}/${NEIGHBORS_PATH}?${TYPE_PATH}=${DeleteTypes.Soft}`,
        { entityKeyIds: [mockEntityKeyId] },
      ];
      return assertApiShouldSendCorrectHttpRequest(fnToTest, apiInvocationParams, expectedAxiosParams, 'post');
    });

    test('type=Hard', () => {
      const apiInvocationParams = [mockEntitySetId, { entityKeyIds: [mockEntityKeyId] }, DeleteTypes.Hard];
      const expectedAxiosParams = [
        `/${SET_PATH}/${mockEntitySetId}/${NEIGHBORS_PATH}?${TYPE_PATH}=${DeleteTypes.Hard}`,
        { entityKeyIds: [mockEntityKeyId] },
      ];
      return assertApiShouldSendCorrectHttpRequest(fnToTest, apiInvocationParams, expectedAxiosParams, 'post');
    });
  });
}

function deleteEntity() {

  describe('deleteEntity()', () => {

    const fnToTest = DataApi.deleteEntity;
    const mockEKID = genRandomUUID();
    const mockESID = genRandomUUID();
    const validParams = [mockESID, mockEKID, DeleteTypes.Soft];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS, INVALID_PARAMS_FOR_OPTIONAL_STRING];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldCatchRejectedPromise(fnToTest, validParams);

    test('type=Soft', () => {
      const apiInvocationParams = [mockESID, mockEKID, 'Soft'];
      const expectedAxiosParams = [`/${SET_PATH}/${mockESID}?${TYPE_PATH}=${DeleteTypes.Soft}`, { data: [mockEKID] }];
      return assertApiShouldSendCorrectHttpRequest(fnToTest, apiInvocationParams, expectedAxiosParams, 'delete');
    });

    test('type=Hard', () => {
      const apiInvocationParams = [mockESID, mockEKID, 'Hard'];
      const expectedAxiosParams = [`/${SET_PATH}/${mockESID}?${TYPE_PATH}=${DeleteTypes.Hard}`, { data: [mockEKID] }];
      return assertApiShouldSendCorrectHttpRequest(fnToTest, apiInvocationParams, expectedAxiosParams, 'delete');
    });
  });
}

function deleteEntityData() {
  describe('deleteEntityData()', () => {
    const fnToTest = DataApi.deleteEntityData;
    const mockESID = genRandomUUID();

    describe('single EKID', () => {
      const mockEKID = genRandomUUID();
      const mockBody = { data: [mockEKID] };
      const validParams = [mockESID, mockEKID, DeleteTypes.Soft];
      const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS, INVALID_PARAMS_FOR_OPTIONAL_STRING];
      testApiShouldReturnPromise(fnToTest, validParams);
      testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, DATA_API);
      testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
      testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
      testApiShouldCatchRejectedPromise(fnToTest, validParams);

      test('type=Soft', () => {
        const apiInvocationParams = [mockESID, mockEKID, DeleteTypes.Soft];
        const expectedAxiosParams = [`/${SET_PATH}/${mockESID}?${TYPE_PATH}=${DeleteTypes.Soft}`, mockBody];
        return assertApiShouldSendCorrectHttpRequest(fnToTest, apiInvocationParams, expectedAxiosParams, 'delete');
      });

      test('type=Hard', () => {
        const apiInvocationParams = [mockESID, mockEKID, DeleteTypes.Hard];
        const expectedAxiosParams = [`/${SET_PATH}/${mockESID}?${TYPE_PATH}=${DeleteTypes.Hard}`, mockBody];
        return assertApiShouldSendCorrectHttpRequest(fnToTest, apiInvocationParams, expectedAxiosParams, 'delete');
      });
    });

    describe('array of EKIDs', () => {
      const mockEKIDs = [genRandomUUID()];
      const mockBody = { data: mockEKIDs };
      const validParams = [mockESID, mockEKIDs, DeleteTypes.Soft];
      const invalidParams = [
        INVALID_PARAMS_SS,
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
        INVALID_PARAMS_FOR_OPTIONAL_STRING
      ];
      testApiShouldReturnPromise(fnToTest, validParams);
      testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, DATA_API);
      testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
      testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
      testApiShouldCatchRejectedPromise(fnToTest, validParams);

      test('type=Soft', () => {
        const apiInvocationParams = [mockESID, mockEKIDs, 'Soft'];
        const expectedAxiosParams = [`/${SET_PATH}/${mockESID}?${TYPE_PATH}=${DeleteTypes.Soft}`, mockBody];
        return assertApiShouldSendCorrectHttpRequest(fnToTest, apiInvocationParams, expectedAxiosParams, 'delete');
      });

      test('type=Hard', () => {
        const apiInvocationParams = [mockESID, mockEKIDs, 'Hard'];
        const expectedAxiosParams = [`/${SET_PATH}/${mockESID}?${TYPE_PATH}=${DeleteTypes.Hard}`, mockBody];
        return assertApiShouldSendCorrectHttpRequest(fnToTest, apiInvocationParams, expectedAxiosParams, 'delete');
      });
    });
  });
}

function deleteEntitySet() {

  describe('deleteEntitySet()', () => {

    const fnToTest = DataApi.deleteEntitySet;
    const mockEntitySetId = genRandomUUID();
    const validParams = [mockEntitySetId, 'Soft'];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldCatchRejectedPromise(fnToTest, validParams);

    test('type=Soft', () => {
      const apiInvocationParams = [mockEntitySetId, 'Soft'];
      const expectedAxiosParams = [`/${SET_PATH}/${mockEntitySetId}/all?${TYPE_PATH}=${DeleteTypes.Soft}`];
      return assertApiShouldSendCorrectHttpRequest(fnToTest, apiInvocationParams, expectedAxiosParams, 'delete');
    });

    test('type=Hard', () => {
      const apiInvocationParams = [mockEntitySetId, 'Hard'];
      const expectedAxiosParams = [`/${SET_PATH}/${mockEntitySetId}/all?${TYPE_PATH}=${DeleteTypes.Hard}`];
      return assertApiShouldSendCorrectHttpRequest(fnToTest, apiInvocationParams, expectedAxiosParams, 'delete');
    });
  });
}

function getEntityData() {

  describe('getEntityData()', () => {

    const fnToTest = DataApi.getEntityData;
    const mockEntitySetId = genRandomUUID();
    const mockEntityKeyId = genRandomUUID();

    const validParams = [mockEntitySetId, mockEntityKeyId];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS];
    const axiosParams = [`/${mockEntitySetId}/${mockEntityKeyId}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function getEntitySetData() {

  describe('getEntitySetData()', () => {

    const fnToTest = DataApi.getEntitySetData;
    const mockEntityKeyId = genRandomUUID();
    const mockEntitySetId = genRandomUUID();
    const mockPropertyTypeId = genRandomUUID();

    const validParams = [
      mockEntitySetId,
      [mockPropertyTypeId],
      [mockEntityKeyId]
    ];

    const invalidParams = [
      INVALID_PARAMS_SS,
      INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
      INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY
    ];

    describe('should send a POST request with the correct params', () => {

      test('+propertyTypeIds, +entityKeyIds', () => {

        const apiInvocationParams = [
          mockEntitySetId,
          [mockPropertyTypeId],
          [mockEntityKeyId]
        ];

        const expectedAxiosParams = [
          `/${SET_PATH}/${mockEntitySetId}`,
          {
            ids: [mockEntityKeyId],
            properties: [mockPropertyTypeId]
          }
        ];

        return assertApiShouldSendCorrectHttpRequest(fnToTest, apiInvocationParams, expectedAxiosParams, 'post');
      });

      test('-propertyTypeIds, +entityKeyIds', () => {

        const apiInvocationParams = [
          mockEntitySetId,
          undefined,
          [mockEntityKeyId]
        ];

        const expectedAxiosParams = [
          `/${SET_PATH}/${mockEntitySetId}`,
          { ids: [mockEntityKeyId] }
        ];

        return assertApiShouldSendCorrectHttpRequest(fnToTest, apiInvocationParams, expectedAxiosParams, 'post');
      });

      test('+propertyTypeIds, -entityKeyIds', () => {

        const apiInvocationParams = [
          mockEntitySetId,
          [mockPropertyTypeId],
          undefined
        ];

        const expectedAxiosParams = [
          `/${SET_PATH}/${mockEntitySetId}`,
          { properties: [mockPropertyTypeId] }
        ];

        return assertApiShouldSendCorrectHttpRequest(fnToTest, apiInvocationParams, expectedAxiosParams, 'post');
      });

      test('-propertyTypeIds, -entityKeyIds', () => {

        const apiInvocationParams = [
          mockEntitySetId
        ];

        const expectedAxiosParams = [
          `/${SET_PATH}/${mockEntitySetId}`,
          {}
        ];

        return assertApiShouldSendCorrectHttpRequest(fnToTest, apiInvocationParams, expectedAxiosParams, 'post');
      });

    });

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function getEntitySetDataFileUrl() {

  describe('getEntitySetDataFileUrl()', () => {

    const fnToTest = DataApi.getEntitySetDataFileUrl;
    const mockEntitySetId = genRandomUUID();
    const mockCSRFToken = 'mock_csrf_token';

    const validParams = [
      mockEntitySetId,
      MOCK_FILE_TYPE
    ];

    const invalidParams = [
      INVALID_PARAMS_SS,
      INVALID_PARAMS
    ];

    Config.getConfig.mockImplementation(() => fromJS({
      csrfToken: mockCSRFToken,
    }));

    test('should return the correct URL', () => {

      expect(DataApi.getEntitySetDataFileUrl(mockEntitySetId, MOCK_FILE_TYPE)).toEqual(
        `${MOCK_BASE_URL}/${SET_PATH}/${mockEntitySetId}`
        + `?fileType=${MOCK_FILE_TYPE}`
        + `&${CSRF_TOKEN}=${mockCSRFToken}`
      );
    });

    test('should correctly set the "fileType" query param as lowercase', () => {

      expect(DataApi.getEntitySetDataFileUrl(mockEntitySetId, MOCK_FILE_TYPE.toUpperCase())).toEqual(
        `${MOCK_BASE_URL}/${SET_PATH}/${mockEntitySetId}`
        + `?fileType=${MOCK_FILE_TYPE}`
        + `&${CSRF_TOKEN}=${mockCSRFToken}`
      );
    });

    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldReturnNullOnInvalidParameters(fnToTest, validParams, invalidParams);

  });
}

function getEntitySetSize() {

  describe('getEntitySetSize()', () => {

    const fnToTest = DataApi.getEntitySetSize;
    const mockEntitySetId = genRandomUUID();

    const validParams = [mockEntitySetId];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${mockEntitySetId}/${COUNT_PATH}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function replaceEntityData() {

  describe('replaceEntityData()', () => {

    const fnToTest = DataApi.replaceEntityData;
    const mockEntitySetId = genRandomUUID();
    const mockEntityData = {
      [`${genRandomUUID()}`]: {
        [`${genRandomUUID()}`]: ['value_1', 'value_2'],
        [`${genRandomUUID()}`]: ['value_3', 'value_4']
      }
    };

    // TODO: generate invalid params for the "entities" param

    const validParams = [mockEntitySetId, mockEntityData, false];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS, []];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldCatchRejectedPromise(fnToTest, validParams);

    // TODO: add tests to validate "partial" query param is being set correctly for invalid values
    describe('should send a PUT request with the correct params', () => {

      test('type=PartialReplace', () => {
        const apiInvocationParams = [mockEntitySetId, mockEntityData, true];
        const expectedAxiosParams = [
          `/${SET_PATH}/${mockEntitySetId}?${TYPE_PATH}=${UpdateTypes.PartialReplace}`,
          mockEntityData
        ];
        return assertApiShouldSendCorrectHttpRequest(fnToTest, apiInvocationParams, expectedAxiosParams, 'put');
      });

      test('type=Replace', () => {
        const apiInvocationParams = [mockEntitySetId, mockEntityData, false];
        const expectedAxiosParams = [
          `/${SET_PATH}/${mockEntitySetId}?${TYPE_PATH}=${UpdateTypes.Replace}`,
          mockEntityData
        ];
        return assertApiShouldSendCorrectHttpRequest(fnToTest, apiInvocationParams, expectedAxiosParams, 'put');
      });
    });
  });
}

function replaceEntityInEntitySet() {

  describe('replaceEntityInEntitySet()', () => {

    const fnToTest = DataApi.replaceEntityInEntitySet;
    const mockEntitySetId = genRandomUUID();
    const mockEntityKeyId = genRandomUUID();
    const mockEntity = {
      [`${genRandomUUID()}`]: ['value_1', 'value_2']
    };

    // TODO: generate invalid params for the "entity" param

    const validParams = [mockEntitySetId, mockEntityKeyId, mockEntity];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${SET_PATH}/${mockEntitySetId}/${mockEntityKeyId}`, mockEntity];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'put');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function replaceEntityInEntitySetUsingFqns() {

  describe('replaceEntityInEntitySetUsingFqns()', () => {

    const fnToTest = DataApi.replaceEntityInEntitySetUsingFqns;
    const mockEntitySetId = genRandomUUID();
    const mockEntityKeyId = genRandomUUID();
    const mockEntity = {
      [`${genRandomString()}.${genRandomString()}`]: ['value_1', 'value_2']
    };

    // TODO: generate invalid params for the "entity" param

    const validParams = [mockEntitySetId, mockEntityKeyId, mockEntity];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${SET_PATH}/${mockEntitySetId}/${mockEntityKeyId}`, mockEntity];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, DATA_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}
