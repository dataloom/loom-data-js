import App, { AppBuilder, isValid } from './App';
import { MOCK_APP_DM } from '../utils/testing/MockDataModels';

import { INVALID_PARAMS } from '../utils/testing/Invalid';

describe('App', () => {

  describe('AppBuilder', () => {

    let builder = null;

    beforeEach(() => {
      builder = new AppBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setName()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setName(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setName();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setName(MOCK_APP_DM.name);
        }).not.toThrow();
      });

    });

    describe('setTitle()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setTitle(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setTitle();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setTitle(MOCK_APP_DM.title);
        }).not.toThrow();
      });

    });

    describe('setDescription()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setDescription(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setDescription();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setDescription(MOCK_APP_DM.description);
        }).not.toThrow();
      });

    });

    describe('setAppTypeIds()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setAppTypeIds(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setAppTypeIds([...MOCK_APP_DM.appTypeIds, invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setAppTypeIds();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setAppTypeIds(MOCK_APP_DM.appTypeIds);
        }).not.toThrow();
      });

    });

    describe('setUrl()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setUrl(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setUrl();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setUrl(MOCK_APP_DM.url);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          (new AppBuilder()).build();
        }).toThrow();
      });

      test('should return a valid instance', () => {

        const app = builder
          .setName(MOCK_APP_DM.name)
          .setTitle(MOCK_APP_DM.title)
          .setDescription(MOCK_APP_DM.description)
          .setAppTypeIds(MOCK_APP_DM.appTypeIds)
          .setUrl(MOCK_APP_DM.url)
          .build();

        expect(app).toBeInstanceOf(App);

        expect(app.name).toBeDefined();
        expect(app.name).toEqual(MOCK_APP_DM.name);

        expect(app.title).toBeDefined();
        expect(app.title).toEqual(MOCK_APP_DM.title);

        expect(app.description).toBeDefined();
        expect(app.description).toEqual(MOCK_APP_DM.description);

        expect(app.appTypeIds).toBeDefined();
        expect(app.appTypeIds).toEqual(MOCK_APP_DM.appTypeIds);

        expect(app.url).toBeDefined();
        expect(app.url).toEqual(MOCK_APP_DM.url);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_APP_DM)).toEqual(true);
      });

      test('should return true when given a valid object instance', () => {
        expect(isValid(
          new App(
            MOCK_APP_DM.appTypeIds,
            MOCK_APP_DM.description,
            MOCK_APP_DM.name,
            MOCK_APP_DM.title,
            MOCK_APP_DM.url
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const app = (new AppBuilder())
          .setName(MOCK_APP_DM.name)
          .setTitle(MOCK_APP_DM.title)
          .setDescription(MOCK_APP_DM.description)
          .setAppTypeIds(MOCK_APP_DM.appTypeIds)
          .setUrl(MOCK_APP_DM.url)
          .build();

        expect(isValid(app)).toEqual(true);
      });

    });

    describe('invalid', () => {

      test('should return false when not given any parameters', () => {
        expect(isValid()).toEqual(false);
      });

      test('should return false when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(invalidInput)).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "name" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_APP_DM, { name: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_APP_DM, { title: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_APP_DM, { description: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "appTypeIds" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_APP_DM, { appTypeIds: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "url" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_APP_DM, { url: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "name" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new App(
              invalidInput,
              MOCK_APP_DM.title,
              MOCK_APP_DM.description,
              MOCK_APP_DM.appTypeIds,
              MOCK_APP_DM.url,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new App(
              MOCK_APP_DM.name,
              invalidInput,
              MOCK_APP_DM.description,
              MOCK_APP_DM.appTypeIds,
              MOCK_APP_DM.url
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new App(
              MOCK_APP_DM.name,
              MOCK_APP_DM.title,
              invalidInput,
              MOCK_APP_DM.appTypeIds,
              MOCK_APP_DM.url
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "appTypeIds" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new App(
              MOCK_APP_DM.name,
              MOCK_APP_DM.title,
              MOCK_APP_DM.description,
              invalidInput,
              MOCK_APP_DM.url
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "url" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new App(
              MOCK_APP_DM.name,
              MOCK_APP_DM.title,
              MOCK_APP_DM.description,
              MOCK_APP_DM.appTypeIds,
              invalidInput
            )
          )).toEqual(false);
        });
      });

    });

  });

});
