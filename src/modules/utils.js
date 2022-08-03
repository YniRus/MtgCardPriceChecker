export default class Utils {
  static getQueryString(params) {
    params = Object.fromEntries(Object.entries(params).filter(([key, value]) => Boolean(key) && Boolean(value)));

    return params ? new URLSearchParams(params).toString() : null;
  }
}