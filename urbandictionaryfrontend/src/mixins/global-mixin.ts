import { Component, Prop, Vue } from 'vue-property-decorator';

import { validate, ValidationError } from 'class-validator';

const BASE_URL = 'http://localhost:3008';
const URBAN_TERM_API = `${BASE_URL}/term`;
const URBAN_TERM_DEFINITION_API = `${BASE_URL}/definition`;
const USER_API = `${BASE_URL}/user`;

const ReturnedArrayOfUrbanTerms = [];

@Component
export default class GlobalMixin extends Vue {
  BASE_URL = 'http://localhost:3008';

  URBAN_TERM_API = `${BASE_URL}/term`;

  URBAN_TERM_DEFINITION_API = `${BASE_URL}/definition`;

  // prop so the parent can disable this child component
  @Prop(Boolean) readonly disabled!:boolean

  // busy data property to flag the state a busy waiting for the api
  isBusy = false;

  currentUrbanTerm = 0;

  setBusy(state:boolean) {
    this.isBusy = state;
    this.$emit('busy', state);
  }

  // eslint-disable-next-line class-methods-use-this
  TermApi() { return URBAN_TERM_API; }

  // eslint-disable-next-line class-methods-use-this
  DefinitionApi() { return URBAN_TERM_DEFINITION_API; }

  // eslint-disable-next-line class-methods-use-this
  UserApi() { return USER_API; }

  get isDisabled() { return this.isBusy || this.disabled; }

  /**
   *
   * @param url url address to api server path
   * @param method GET,PUT,POST,DELETE
   * @param dataToSend object to send as body raw json in the request
   */
  // eslint-disable-next-line class-methods-use-this
  callAPI(url:string, method = 'GET', dataToSend = {}) {
  // when calling fetch we need to set default options - especially when dealing with CORS
    const fetchOptions:any = {
      method: 'GET',
      credentials: 'include', // allows api to set cookies in the browser
      referrerPolicy: 'strict-origin-when-cross-origin',
      headers: { // fetch usually sends these headers, but just to be sure
        'X-Requested-With': 'XmlHttpRequest',
        'Content-Type': 'application/json; charset=utf-8',
        // eslint-disable-next-line
        'Origin': window.origin,
      },
    };
    console.log(dataToSend);
    // eslint-disable-next-line no-param-reassign
    method = method.toUpperCase();
    if (['POST', 'PUT', 'DELETE'].includes(method)) fetchOptions.method = method;

    if (Object.keys(dataToSend).length) {
    // convert the dataToSend JS object into JSon and GEt CANNOT SEND A BODY
      if (fetchOptions.method !== 'GET') fetchOptions.body = JSON.stringify(dataToSend);
      else {
      // eslint-disable-next-line no-param-reassign
        url = `${url}/?${new URLSearchParams(dataToSend).toString()}`;
      }
    }

    // convert the dataToSend JS object into JSON and GET cannot send a BODY
    if (fetchOptions.method !== 'GET') fetchOptions.body = JSON.stringify(dataToSend);
    console.log(fetchOptions);
    return fetch(url, fetchOptions)
      .then(async (res) => {
        const resInfo:any = { url: res.url, status: res.status, statusText: res.statusText };
        console.log(resInfo);
        // handle 204 No Content differently
        if (res.status === 204) return Promise.resolve(resInfo);
        if (res.ok) return res.json();
        const error = new Error(`${res.status}: ${res.statusText}`);
        resInfo.data = await res.json();
        throw Object.assign(error, resInfo); // copy all data from resInfo into error
      });
  }

  // eslint-disable-next-line class-methods-use-this
  mapValidationErrorArray(errors:ValidationError[]):any {
    return Object.fromEntries(errors.map((err) => {
      const msg = err.constraints ? Object.values(err.constraints)[0] : 'Invalid Value';
      return [err.property, msg];
    }));
  }

  async getErrorMessages(model:any):Promise<any> {
    const errors:ValidationError[] = await validate(model);
    return errors.length ? this.mapValidationErrorArray(errors) : {};
  }
}
