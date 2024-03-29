import Vue from 'vue'

if (typeof String.prototype.startsWith !== 'function') {
  Window.String.prototype.startsWith = function (prefix) {
    return this.slice(0, prefix.length) === prefix
  }
}

export default {
  resMsg (res) {
    let key = {
      zh: 'Chinese',
      en: 'English'
    }[Vue.config.lang]
    try {
      let obj = JSON.parse(res.Message)
      return obj[key] || obj.Chinese
    } catch (e) {
      return res && res.Message
    }
  },

  serverUrl (apiName) {
    return `app/${apiName}`
  },

  titleLang (zhStr, enStr) {
    return {
      zh: zhStr,
      en: enStr
    }
  },

  query (search) {
    let str = search || window.location.search
    let objURL = {}

    str.replace(
      new RegExp('([^?=&]+)(=([^&]*))?', 'g'),
      ($0, $1, $2, $3) => {
        objURL[$1] = $3
      }
    )
    return objURL
  },

  queryString (url, query) {
    let str = []
    for (let key in query) {
      str.push(key + '=' + query[key])
    }
    let paramStr = str.join('&')
    return paramStr ? `${url}?${paramStr}` : url
  },

  /* -----------------------------localStorage------------------------------------ */
  /*
   * set localStorage
   */
  setStorage (name, content) {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
  },

  /**
   * get localStorage
   */
  getStorage (name) {
    if (!name) return
    let content = window.localStorage.getItem(name)
    return JSON.parse(content)
  },

  /**
   * delete localStorage
   */
  removeStorage (name) {
    if (!name) return
    window.localStorage.removeItem(name)
  },


 /**
   *
   * @param {hash 数组} array list = [
    {"name": "John","Average":15,"High":10,"DtmStamp":1358226000000},
    {"name": "Jane","Average":16,"High":92,"DtmStamp":1358226000000}]
   * @param {筛选函数 } function(item){
        return [item.name];
      })
      return [
        [ { name: 'John', Average: 15, High: 10, DtmStamp: 1358226000000 }],
        [ { name: 'Jane', Average: 16, High: 92, DtmStamp: 1358226000000 }]
      ]
   */
  groupBy (array, f) {
    let groups = {}
    array.forEach(function(o) {
      let group = JSON.stringify(f(o))
      groups[group] = groups[group] || []
      groups[group].push(o)
    })
    return Object.keys(groups).map(function(group) {
      return groups[group]
    })
  }

}
