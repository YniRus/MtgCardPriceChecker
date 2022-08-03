import Utils from "@/modules/utils";
import { ref } from "vue";

export default class Api {
  static #loading = ref(false)
  static #domain = process.env.VUE_APP_API_URL
  static #queryMethods = ['GET', 'DELETE']
  static #requestTimer = null
  static #requestTimerErrorResponse = {
    object: 'error',
    status: '429',
    code: 'too many requests',
  }

  static get loading() { return Api.#loading.value }

  static async request(url, method = 'GET', data = null, headers = {}) {
    if (Api.#requestTimer) {
      return Api.#requestTimerErrorResponse
    }

    headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    };

    Api.#initRequestTimer();
    Api.#loading.value = true;
    const response = await fetch(
      Api.#getFetchUrl(url, method, data),
      {
        method,
        headers,
        body: !Api.#queryMethods.includes(method) ? data : null,
      },
    );

    const json = await response.json();
    Api.#loading.value = false;

    return json;
  }

  static #getFetchUrl(url, method, data) {
    const domain = Api.#domain;
    const fetchUrl = domain + url;
    return Api.#queryMethods.includes(method) && data
      ? fetchUrl + '?' + Utils.getQueryString(data)
      : fetchUrl;
  }

  static #initRequestTimer() {
    Api.#requestTimer = setTimeout(() => { Api.#requestTimer = null }, process.env.VUE_APP_API_REQUEST_INTERVAL)
  }
}