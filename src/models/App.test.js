/*
 * @flow
 */

import {
  App,
  AppBuilder,
  isValidApp,
} from './App';

import { APP_MOCK, genRandomApp } from '../utils/testing/MockData';
import { runTestSuite } from '../utils/testing/ModelTestSuite';

runTestSuite(
  App,
  AppBuilder,
  APP_MOCK,
  isValidApp,
  genRandomApp,
  {
    setAppTypeIds: {
      field: 'appTypeIds',
      isOptional: true,
      validParams: [APP_MOCK.appTypeIds],
    },
    setDescription: {
      field: 'description',
      isOptional: true,
      validParams: [APP_MOCK.description],
    },
    setId: {
      field: 'id',
      isOptional: true,
      validParams: [APP_MOCK.id],
    },
    setName: {
      field: 'name',
      validParams: [APP_MOCK.name],
    },
    setTitle: {
      field: 'title',
      validParams: [APP_MOCK.title],
    },
    setUrl: {
      field: 'url',
      validParams: [APP_MOCK.url],
    },
  }
);
