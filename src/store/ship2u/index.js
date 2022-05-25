import { paginateArray, sortCompare } from '@/@fake-db/utils'
import qs from 'qs'
import axios from 'axios'
import router from '@/router'

let apiHost
if (process.env.NODE_ENV === 'development') {
  apiHost = 'http://127.0.0.1:8098'
  apiHost = 'https://packgo.test.yun.co.nz'
} else {
  apiHost = 'https://packns.wisdomin.com'
}
apiHost = process.env.VUE_APP_API_HOST

// http response 拦截器
axios.interceptors.response.use(response => response, error => {
  if (!error.response) {
    return Promise.reject(error)
  }
  if (error.response
    && error.response.status === 401) {
    router.replace('/login')
    console.log('抱歉，您的登录状态已失效，请重新登录！')
    return Promise.reject(error)
  }
  return Promise.reject(error)
})

const apiPath = `${apiHost}/api`
const apiToken = `${apiHost}/api-token-auth/`
const apiProfile = `${apiPath}/packgo/profile/`
const apiCompany = `${apiPath}/home/company/`
const apiAutoSuggestAddress = `${apiPath}/freightcustomers/suggest_address/?address=`
const apiAddress = `${apiPath}/freightcustomers/addresses/`
const apiVerifyAddress = `${apiPath}/freightcustomers/verify_address/`
const apiRegister = `${apiPath}/freightcustomers/register/`
const apiGetAddress = `${apiPath}/freightcustomers/get_address/`
const apiPackage = `${apiPath}/parcels/`
const apiEditParcelEndpoint = `${apiPackage}edit_parcel/`
const apiQuote = `${apiPath}/freightorders/quote/`
const apiOrder = `${apiPath}/freightorders/`
const apiActiveAccount = `${apiPath}/home/active/`
const apiIsActive = `${apiPath}/packgo/isactive/`
const apiVouchers = `${apiPath}/promotions/vouchers/`
const apiForgotPwd = `${apiPath}/home/forgot_pwd/`
const apiVerifyEmail = `${apiPath}/home/verify_email/`
const apiResetPwd = `${apiPath}/home/resetpwd/`
const apiModifyPwd = `${apiPath}/freightcustomers/wechat_password/`
const apiParcelNames = `${apiPath}/freightorders/names/`

const d = {
  username: null,
  password: null,
  active: false,
  apiHost,
  login: false,
  company: null,
  authToken: '',
  userProfile: null,
  orders: null,
  parcels: null,
  history_parcels: null,
  addresses: null,
  shippingAddresses: null,
  senderAddresses: null,
  parcelsArr: [],
  ordersArr: [],
  quote: null,
  freightType: {
    title: 'Air Transport',
    icon: 'CodepenIcon',
    code: 'F',
  },
}

export default {
  namespaced: true,
  state: d,
  getters: {
    loginInfo: state => ({ username: state.username, password: state.password }),
    creditpayUrl: () => key => {
      const url = `${apiHost}/pack/pay/request/?key=${key}&type=credit`
      console.log('creditpay:', url)
      return url
    },
    alipayUrl: () => key => {
      const url = `${apiHost}/pack/pay/request/?key=${key}&type=alipay`
      console.log('alipay:', url)
      return url
    },
    parcels: state => ({ parcelState = null, filed = null, unsent = null }) => {
      const filteredData = state.parcels ? state.parcels.filter(
        parcel =>
          /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
          parcel.state === (parcelState || parcel.state) &&
          // eslint-disable-next-line no-nested-ternary
          ((unsent != null) ? ((unsent === 1) ? (parcel.dform === null) : (parcel.dform != null)) : true) &&
          // eslint-disable-next-line no-nested-ternary
          ((filed != null) ? ((filed === 0) ? (parcel.total === 0) : (parcel.total > 0)) : true),
      ) : []
      return filteredData.length
    },
    orders: state => ({ orderState = null }) => {
      const filteredData = state.orders ? state.orders.filter(
        order =>
          /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
          order.state === (orderState || order.state),
      ) : []
      return filteredData.length
    },
    parcelsMap: state => {
      const map = new Map(state.parcelsArr)
      return map
    },
    shippingAddressMap: state => {
      // eslint-disable-next-line prefer-const
      let arr = []
      state.shippingAddresses?.forEach(i => {
        arr.push([i.id, i])
      })
      console.log(arr)
      const map = new Map(arr)
      return map
    },
    senderAddressMap: state => {
      // eslint-disable-next-line prefer-const
      let arr = []
      state.senderAddresses?.forEach(i => {
        arr.push([i.id, i])
      })
      console.log(arr)
      const map = new Map(arr)
      return map
    },
    ordersMap: state => {
      const arr = state.ordersArr
      const map = new Map(arr)
      return map
    },
    headers: state => {
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `JWT ${state.authToken}`,
      }
      return headers
    },
    headers_get_notoken: () => {
      const headers = {
        appid: 'ship2u-web',
      }
      return headers
    },
    headers_post_notoken: () => {
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        appid: 'ship2u-web',
      }
      return headers
    },
    headers_json: state => {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `JWT ${state.authToken}`,
      }
      return headers
    },
    get_headers: state => {
      const headers = {
        Authorization: `JWT ${state.authToken}`,
      }
      return headers
    },
    // shippingAddresses: state => state.addresses.filter(i => !i.is_sender),
    // senderAddresses: state => state.addresses.filter(i => i.is_sender),
  },
  mutations: {
    setActive(state, val) {
      state.active = val
    },
    setUsername(state, val) {
      state.username = val
    },
    setPassword(state, val) {
      state.password = val
    },
    setFreightType(state, val) {
      state.freightType = val
    },
    setCompany(state, val) {
      state.company = val
    },
    setLogin(state, val) {
      state.login = val
    },
    setToken(state, val) {
      state.authToken = val
    },
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setOrders(state, val) {
      state.orders = val
    },
    setAddresses(state, val) {
      state.addresses = val
    },
    setShippingAddresses(state, val) {
      state.shippingAddresses = val
    },
    setSenderAddresses(state, val) {
      state.senderAddresses = val
    },
    setSenderAddressesMap(state, map) {
      // eslint-disable-next-line prefer-const
      let arr = []
      map.forEach(value => {
        arr.push(value)
      })
      state.senderAddresses = arr
    },
    setShippingAddressesMap(state, map) {
      // eslint-disable-next-line prefer-const
      let arr = []
      map.forEach(value => {
        arr.push(value)
      })
      state.shippingAddresses = arr
    },
    setParcels(state, val) {
      state.parcels = val
    },
    setHistoryParcels(state, val) {
      state.history_parcels = val
    },
    setParcelsArr(state, val) {
      state.parcelsArr = val
    },
    setOrdersArr(state, val) {
      state.ordersArr = val
    },
    setOrdersMap(state, val) {
      const arr = Array.from(val)
      state.ordersArr = arr
    },
    setParcelsMap(state, val) {
      const arr = Array.from(val)
      state.parcelsArr = arr
    },
    setQuote(state, val) {
      state.quote = val
    },
  },
  actions: {
    // 获取包裹清关名称
    async parcelNames({ getters }) {
      let code = 0
      let msg = ''
      let obj = ''
      try {
        await axios.get(apiParcelNames, {
          headers: getters.get_headers,
        }).then(resp => {
          // console.log('get profile ok')
          msg = resp.data.message
          code = resp.data.code
          obj = resp.data?.object
          // console.log(resp)
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
          code = 2
        })
      } catch (e) {
        console.log(e)
        code = 3
      }
      return { code, msg, obj }
    },
    async modifyPwd({ getters }, queryObj) {
      let data
      try {
        await axios.post(apiModifyPwd, qs.stringify(queryObj), {
          headers: getters.headers_json,
        }).then(resp => {
          data = resp.data
          console.log(resp)
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
        })
      } catch (e) {
        console.log(e)
      }
      console.log(data)
      return data
    },
    async profile({ state, commit, getters }) {
      let user = ''
      if (!state.userProfile) {
        await axios.get(apiProfile, {
          headers: getters.get_headers,
        }).then(ret => {
          user = ret.data
          user.ability = [
            {
              action: 'read',
              subject: 'Client',
            },
            {
              action: 'read',
              subject: 'Auth',
            },
            {
              action: 'read',
              subject: 'Analytics',
            },
          ]
          user.role = 'client'
          user.ability = [
            {
              action: 'manage',
              subject: 'all',
            },
          ]
          user.role = 'admin'
          user.fullName = user.customer.first_name + user.customer.last_name
          user.username = user.customer.username
          console.log('user:', user)
          // eslint-disable-next-line global-require
          // user.avatar = require('@/assets/images/avatars/13-small.png')
          commit('setUserProfile', user)
        })
      } else {
        user = state.userProfile
        console.log('profile exist')
      }
      return user
    },
    async login({ commit, dispatch }, { email, password }) {
      console.log('email:', email)
      // console.log(password)

      let error = {
        email: ['Something went wrong'],
      }
      // console.log(process.env.NODE_ENV)
      let user
      let active = false
      const res = await dispatch('getToken', { username: email, password })
      if (res.status === 200) {
        await dispatch('isActive')
          .then(resp => {
            active = resp.obj
          })
        commit('setActive', active)
        // if (!active) {
        //   error = {
        //     msg: 'Please active your account at first. Follow the verify email instruction.',
        //   }
        //   return { status: 400, data: error }
        // }
        // if (active) {
        //   user = await dispatch('profile')
        // }
        user = await dispatch('profile')
      }
      // console.log(accessToken)
      // getToken('robinluo', 'paulbob123').then(() => console.log('login2'))
      // const user = data.users.find(u => u.email === email && u.password === password)
      // console.log(user)
      if (user) {
        try {
          const userData = { ...user }

          // delete userData.password

          return { status: 200, userData }
        } catch (e) {
          error = e
        }
      } else {
        error = {
          msg: 'Email or Password is Invalid',
        }
      }

      // return [400, { error }]
      return { status: 400, error }
    },
    async refreshToken({ state, commit }) {
      let mytoken = null
      const data = {
        username: state.username,
        password: state.password,
      }
      await axios.post(apiToken, data).then(ret => {
        mytoken = ret.data.token
        commit('setToken', mytoken)
      }).catch(error => {
        console.log(error)
      })

      return mytoken
    },
    async getToken({ commit }, { username, password }) {
      let mytoken
      let status = 200
      const data = {
        username,
        password,
      }
      await axios.post(apiToken, data).then(ret => {
        mytoken = ret.data.token
        commit('setToken', mytoken)
        commit('setUsername', username)
        commit('setPassword', password)
        // console.log(mytoken)
      }).catch(error => {
        status = error.response.status
      })

      return { status, mytoken }
    },
    async company({ getters, commit }) {
      let obj
      try {
        await axios.get(apiCompany, {
          headers: getters.headers_get_notoken,
        }).then(resp => {
          obj = resp.data.object
          commit('setCompany', obj)
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
        })
      } catch (e) {
        console.log(e)
      }
      return obj
    },
    async autoSuggestAddress({ getters }, queryObj) {
      let list = []
      const { search } = queryObj
      await axios.get(`${apiAutoSuggestAddress}${search}`, {
        headers: getters.get_headers,
      }).then(resp => {
        if (resp.data.success) {
          list = resp.data.addresses
        }
      }).catch(error => {
        console.log(error)
      })
      return list
    },
    async deleteParcel({ state, commit, getters }, queryObj) {
      let code = 1
      let msg = ''
      const { id } = queryObj

      const resp = await axios.delete(`${apiPackage}${id}/`, {
        headers: getters.headers_json,
      })
      console.log(resp)
      if (resp.data.code !== 0) {
        code = 1
      } else {
        console.log('Delete parcel ok')
        code = 0
        msg = resp.data.message
        let arr = state.parcels
        arr = arr.filter(a => a.id !== id)
        commit('setParcels', arr)
      }
      return { code, msg }
    },
    // 获取优惠券
    async vouchers({ getters }) {
      let code = 0
      let msg = ''
      let obj = ''
      try {
        await axios.get(apiVouchers, {
          headers: getters.get_headers,
        }).then(resp => {
          // console.log('get profile ok')
          msg = resp.data.message
          code = resp.data.code
          obj = resp.data?.object
          // console.log(resp)
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
          code = 2
        })
      } catch (e) {
        console.log(e)
        code = 3
      }
      return { code, msg, obj }
    },
    async resetpwd({ getters }, queryObj) {
      let boo
      try {
        await axios.post(apiResetPwd, qs.stringify(queryObj), {
          headers: getters.headers_post_notoken,
        }).then(resp => {
          boo = resp.data
          console.log(resp)
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
        })
      } catch (e) {
        console.log(e)
      }
      console.log(boo)
      return boo
    },
    async verifyEmail({ getters }, { code }) {
      let boo
      try {
        await axios.get(`${apiVerifyEmail}?code=${code}`, {
          headers: getters.headers_get_notoken,
        }).then(resp => {
          boo = resp.data
          // console.log(resp)
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
        })
      } catch (e) {
        console.log(e)
      }
      return boo
    },
    async forgotPwd({ getters }, { email }) {
      let boo
      try {
        await axios.get(`${apiForgotPwd}?email=${email}`, {
          headers: getters.headers_get_notoken,
        }).then(resp => {
          boo = resp.data
          console.log(resp)
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
        })
      } catch (e) {
        console.log(e)
      }
      console.log(boo)
      return boo
    },
    // 查询账户是否已激活
    async isActive({ getters }) {
      let code = 0
      let msg = ''
      let obj = ''
      try {
        await axios.get(apiIsActive, {
          headers: getters.get_headers,
        }).then(resp => {
          // console.log('get profile ok')
          msg = 'get is_active ok'
          code = 0
          obj = resp.data
          // console.log(resp)
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
          code = 2
        })
      } catch (e) {
        console.log(e)
        code = 3
      }
      return { code, msg, obj }
    },
    async activeAccount({ getters }, { code }) {
      let boo
      try {
        await axios.get(`${apiActiveAccount}?code=${code}`, {
          headers: getters.headers_get_notoken,
        }).then(resp => {
          boo = resp.data
          console.log(resp)
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
        })
      } catch (e) {
        console.log(e)
      }
      console.log(boo)
      return boo
    },
    async pay({ getters }, { id, type }) {
      let code = 0
      let msg = ''
      let obj = ''
      try {
        await axios.get(`${apiOrder}${id}/pay/`, {
          params: {
            type,
          },
          headers: getters.get_headers,
        }).then(resp => {
          // console.log('get profile ok')
          msg = 'get pay link ok'
          code = 0
          obj = resp.data
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
          code = 2
        })
      } catch (e) {
        console.log(e)
        code = 3
      }
      return { code, msg, obj }
    },
    async register({ getters }, queryObj) {
      let code = 0
      let msg = ''
      // const { obj } = queryObj
      try {
        await axios.post(apiRegister, qs.stringify(queryObj), {
          headers: getters.headers_post_notoken,
        }).then(resp => {
          // data = ret.data
          if (resp.data.code !== 0) {
            console.log(resp)
            code = resp.data.code
            msg = resp.data.message
            console.log({ code, msg })
          } else {
            console.log('register ok')
            msg = 'register ok'
            code = 0
          }
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
          code = 2
        })
      } catch (e) {
        console.log(e)
        code = 3
      }
      return { code, msg }
    },
    async getProfile({ getters, commit }) {
      let code = 0
      let msg = ''
      let obj = ''
      try {
        await axios.get(apiProfile, {
          headers: getters.get_headers,
        }).then(resp => {
          // console.log('get profile ok')
          msg = 'get profile ok'
          code = 0
          obj = resp.data
          // console.log(resp)
          commit('setUserProfile', obj)
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
          code = 2
        })
      } catch (e) {
        console.log(e)
        code = 3
      }
      return { code, msg, obj }
    },
    async updateProfile({ dispatch, getters }, queryObj) {
      let code = 0
      let msg = 'Success'
      try {
        await axios.post(apiProfile, qs.stringify(queryObj), {
          headers: getters.headers,
        }).then(resp => {
          // data = ret.data
          if (resp.data.code !== 0) {
            // console.log(resp)
            code = 1
          } else {
            // console.log(resp)
          }
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
          code = 2
          msg = error.response.statusText
        })
      } catch (e) {
        console.log(e)
        code = 3
        msg = e
      }
      await dispatch('getProfile')
      return { code, msg }
    },
    async newOrder({
      getters, dispatch,
    }, queryObj) {
      const { order } = queryObj
      let data = null
      let boo = false
      try {
        await axios.post(apiOrder, order, {
          headers: getters.headers_json,
        }).then(resp => {
          if (resp.data.code !== 0) {
            console.log(resp)
          } else {
            data = resp.data.object
            boo = true
            // console.log(resp.data.object)
          }
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
        })
      } catch (e) {
        console.log(e)
      }
      // if (state.ordersArr.length === 0) {
      await dispatch('remoteOrders')
      // }
      if (data) {
        dispatch('updateOrders', data)
      }

      return boo
    },
    async quote({ commit, getters }, queryObj) {
      const { order } = queryObj
      let data
      try {
        await axios.post(apiQuote, order, {
          headers: getters.headers_json,
        }).then(resp => {
          if (resp.data.code !== 0) {
            console.log(resp)
          } else {
            data = resp.data.object
            commit('setQuote', resp.data.object)
            // console.log(resp.data.object)
          }
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
        })
      } catch (e) {
        console.log(e)
      }
      return data
    },
    async defaultShippingAddress({ state, dispatch }) {
      let dsa = null
      if (state.shippingAddresses === null) {
        await dispatch('shippingAddresses', {})
      } else {
        // console.log('state shippingAddresses not null')
      }
      const arr = state.shippingAddresses
      // console.log(arr.length)
      if (arr) {
        const darr = arr.filter(a => a.default)
        if (darr.length === 1) {
        // eslint-disable-next-line prefer-destructuring
          dsa = darr[0]
        }
        if (arr.length > 0 && darr.length === 0) {
        // eslint-disable-next-line prefer-destructuring
          dsa = arr[0]
        }
      }

      return dsa
    },
    async defaultSenderAddress({ state, dispatch }) {
      let dsa = null
      if (state.senderAddresses === null) {
        await dispatch('senderAddresses', {})
      } else {
        // console.log('state senderAddresses not null')
      }
      const arr = state.senderAddresses
      if (arr) {
        const darr = arr.filter(a => a.default)
        if (darr.length === 1) {
        // eslint-disable-next-line prefer-destructuring
          dsa = darr[0]
        }
        if (arr.length > 0 && darr.length === 0) {
        // eslint-disable-next-line prefer-destructuring
          dsa = arr[0]
        }
      }
      return dsa
    },
    async refreshParcels({ getters, commit }, queryObj) {
      let data = ''
      await axios.get(apiPackage, {
        params: { ...queryObj },
        headers: getters.get_headers,
      }).then(ret => {
        data = ret.data
        data.forEach(i => {
          // eslint-disable-next-line no-param-reassign
          i.freightNo = i.in_freight?.title ?? ''
        })
        if (queryObj.state === 'H') {
          commit('setHistoryParcels', data)
        } else if (queryObj.state === 'DPT') {
          commit('setParcels', data)
        }
        console.log('axios get parcels')
      })
      return data
    },
    async parcels({ state, dispatch }, { forceRefresh }) {
      let data = ''
      if (!state.parcels || forceRefresh) {
        data = await dispatch('refreshParcels', { state: 'DPT', count: 0 })
      } else {
        data = state.parcels
        console.log('parcels exist')
      }
      return data
    },
    async history_parcels({ state, dispatch }, { forceRefresh }) {
      let data = ''
      if (!state.history_parcels || forceRefresh) {
        data = await dispatch('refreshParcels', { state: 'H', count: 0 })
      } else {
        data = state.history_parcels
      }
      return data
    },
    async fetchParcels({ dispatch }, queryParams) {
      let data
      // eslint-disable-next-line object-curly-newline
      const { parcelState = null, filed = null, unsent = null, forceRefresh = true, q = '', perPage = 10, page = 1, sortBy = 'id', sortDesc = false, status = null } = queryParams
      if (parcelState !== 'H') {
        data = await dispatch('parcels', { forceRefresh })
      } else {
        data = await dispatch('history_parcels', { forceRefresh })
      }
      /* eslint-enable */

      const queryLowered = q.toLowerCase()
      const filteredData = data.filter(
        parcel =>
        /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
          (parcel.title?.toLowerCase().includes(queryLowered) ||
        parcel.local_courier_number?.toLowerCase().includes(queryLowered)) &&
        parcel.freight_type === (status || parcel.freight_type) &&
        parcel.state === (parcelState || parcel.state) &&
        // eslint-disable-next-line no-nested-ternary
        ((unsent != null) ? ((unsent === 1) ? (parcel.dform === null) : (parcel.dform != null)) : true) &&
        // eslint-disable-next-line no-nested-ternary
        ((filed != null) ? ((filed === 0) ? (parcel.total === 0) : (parcel.total > 0)) : true),
      )
      /* eslint-enable  */

      const sortedData = filteredData.sort(sortCompare(sortBy))
      if (sortDesc) sortedData.reverse()
      // console.log(sortedData)
      return {
        parcels: paginateArray(sortedData, perPage, page),
        total: filteredData.length,
      }
    },
    async fetchParcel({ getters, commit }, { id }) {
      let data = ''
      // console.log(parcelsMap.value)
      const map = getters.parcelsMap
      if (map.has(id)) {
        data = map.get(id)
        console.log('parcel exist')
        console.log(data)
      } else {
        await axios.get(`${apiPackage + id}/`, {
          headers: getters.get_headers,
        }).then(ret => {
          data = ret.data
          map.set(id, data)
          commit('setParcelsMap', map)
          console.log('axios get parcel by id')
        })
      }
      return data
    },
    async saveParcel({ getters, commit, dispatch }, { obj, parcel }) {
      let data = ''
      const { id } = obj
      // console.log(headers)
      // console.log(token.value)
      await axios.post(apiEditParcelEndpoint, qs.stringify(obj), {
        headers: getters.headers,
      }).then(ret => {
        data = ret.data
        const map = getters.parcelsMap
        console.log(`reset parcel${id}`)
        // console.log(parcel)
        map.set(id, parcel)
        commit('setParcelsMap', map)
        // console.log(data)
      }).catch(error => {
        console.log(error)
        console.log(`${error.response.status}---${error.response.statusText}`)
      })
      await dispatch('refreshParcels', { state: 'DPT', count: 0 })
      return data
    },
    async delAddress({ state, commit, getters }, queryObj) {
      let code = 1
      let msg = ''
      const { isSender, id } = queryObj
      const data = {
        id,
      }
      const resp = await axios.delete(apiAddress, {
        headers: getters.headers,
        data: qs.stringify(data),
      })
      console.log(resp)
      if (resp.data.code !== 0) {
        code = 1
      } else {
        console.log('Delete address ok')
        code = 0
        msg = 'Delete address ok'
        if (!isSender) {
          let arr = state.shippingAddresses
          arr = arr.filter(a => a.id !== id)
          commit('setShippingAddresses', arr)
        } else {
          let arr = state.senderAddresses
          arr = arr.filter(a => a.id !== id)
          commit('setSenderAddresses', arr)
        }
      }
      return { code, msg }
    },
    async getAddress({ getters }, queryObj) {
      let code = 0
      let msg = ''
      const { id } = queryObj
      try {
        await axios.get(apiGetAddress, {
          params: {
            aid: id,
          },
          headers: getters.get_headers,
        }).then(resp => {
          // data = ret.data
          if (resp.data.code !== 0) {
            console.log(resp)
            code = resp.data.code
            msg = resp.data.message
            console.log({ code, msg })
          } else {
            console.log('get address ok')
            msg = 'get address ok'
            code = 0
          }
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
          code = 2
        })
      } catch (e) {
        console.log(e)
        code = 3
      }
      return { code, msg }
    },
    async verifyAddress({ getters }, queryObj) {
      let code = 0
      let msg = ''
      const { obj } = queryObj
      try {
        await axios.post(apiVerifyAddress, qs.stringify(obj), {
          headers: getters.headers,
        }).then(resp => {
          // data = ret.data
          if (resp.data.code !== 0) {
            console.log(resp)
            code = resp.data.code
            msg = resp.data.message
            console.log({ code, msg })
          } else {
            console.log('verify address ok')
            msg = 'verify address ok'
            code = 0
          }
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
          code = 2
        })
      } catch (e) {
        console.log(e)
        code = 3
      }
      return { code, msg }
    },
    async updateAddress({ getters, commit }, queryObj) {
      let code = 1
      let msg = ''
      const { obj, isSender } = queryObj
      try {
        const resp = await axios.post(apiAddress, qs.stringify(obj), {
          headers: getters.headers,
        })
        if (resp.data.code !== 0) {
          code = 1
        } else {
          console.log(resp)
          const { object } = resp.data
          console.log('update address ok')
          code = 0
          msg = 'update address ok'
          if (!isSender) {
            const map = getters.shippingAddressMap
            map.set(obj.id, object)
            commit('setShippingAddressesMap', map)
          } else {
            const map = getters.senderAddressMap
            map.set(obj.id, object)
            commit('setSenderAddressesMap', map)
          }
        }
      } catch (e) {
        console.log(e)
        code = 3
      }
      return { code, msg }
    },
    async saveAddress({ state, getters, commit }, queryObj) {
      let code = 1
      let msg = ''
      let o = null
      const { obj, isSender } = queryObj
      console.log('isSender', isSender)
      try {
        const resp = await axios.post(apiAddress, qs.stringify(obj), {
          headers: getters.headers,
        })
        if (resp.data.code !== 0) {
          code = 1
        } else {
          console.log(resp)
          const { object } = resp.data
          console.log('save address ok')
          code = 0
          msg = 'save address ok'
          o = object
          if (!isSender) {
            // await dispatch('shippingAddresses', queryObj)
            let arr = []
            if (state.shippingAddresses)arr = state.shippingAddresses
            arr.push(object)
            commit('setShippingAddresses', arr)
            console.log('setShippingAddresses', arr)
          } else {
            let arr = []
            if (state.senderAddresses)arr = state.senderAddresses
            arr.push(object)
            commit('setSenderAddresses', arr)
            console.log('setSenderAddresses', arr)
          }
        }
      } catch (e) {
        console.log(e)
        code = 3
      }
      return { code, msg, object: o }
    },
    async addAddress({ dispatch }, queryObj) {
      const { obj, isSender } = queryObj
      let status = { code: 1, msg: '' }
      let object = null
      console.log('isSender', isSender)
      if (!isSender) {
        status = await dispatch('verifyAddress', { obj })
      } else {
        status.code = 0
      }
      let { code, msg } = status
      console.log(code)
      if (code === 0) {
        await dispatch('saveAddress', queryObj).then(resp => {
          if (resp.code !== 0) {
            console.log(resp)
            code = 1
          } else {
            console.log('add address ok')
            code = 0
            msg = 'save address ok'
            object = resp.object
          }
        })
      } else {
        console.log(status)
      }
      return { code, msg, object }
    },
    async uptAddress({ dispatch }, queryObj) {
      const { obj, isSender } = queryObj
      let status = { code: 1, msg: '' }
      if (!isSender) {
        status = await dispatch('verifyAddress', { obj })
      } else {
        status.code = 0
      }
      let { code, msg } = status
      console.log(code)
      if (code === 0) {
        await dispatch('updateAddress', queryObj).then(resp => {
          if (resp.code !== 0) {
            console.log(resp)
            code = 1
          } else {
            console.log('update address ok')
            code = 0
            msg = 'update address ok'
          }
        })
      } else {
        console.log(status)
      }
      return { code, msg }
    },
    async updateDefaultAddress({ commit, state, getters }, queryObj) {
      const { isSender = false, addrId } = queryObj
      let data
      if (isSender) {
        data = {
          shipper_address_id: addrId,
        }
      } else {
        data = {
          address_id: addrId,
        }
      }
      try {
        await axios.post(apiProfile, qs.stringify(data), {
          headers: getters.headers,
        }).then(resp => {
          // data = ret.data
          if (resp.data.code !== 0) {
            console.log(resp)
          } else {
            console.log(resp)
            // eslint-disable-next-line prefer-const
            let userprofile = state.userProfile
            if (isSender) {
              userprofile.customer.shipper_address = addrId
            } else {
              userprofile.customer.address = addrId
            }
            commit('setUserProfile', userprofile)
          }
        }).catch(error => {
          console.log(error)
          console.log(`${error.response.status}---${error.response.statusText}`)
        })
      } catch (e) {
        console.log(e)
      }
    },
    async fetchSenderAddresses({ dispatch, state }, queryObj) {
      let data = ''
      if (!state.senderAddresses) {
        data = await dispatch('senderAddresses', queryObj)
      } else {
        data = state.senderAddresses
      }
      console.log(data)
      // eslint-disable-next-line object-curly-newline
      const { q = '', perPage = 10, page = 1, sortBy = 'id', sortDesc = false } = queryObj
      /* eslint-enable */
      const queryLowered = q.toLowerCase()
      let filteredData = []
      let sortedData = []
      if (data) {
        filteredData = data.filter(
          add =>
            /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
            (add.title.toLowerCase().includes(queryLowered) ||
              add.address.toLowerCase().includes(queryLowered) ||
              add.suburb.toLowerCase().includes(queryLowered) ||
              add.city.toLowerCase().includes(queryLowered)),
        )
        sortedData = filteredData.sort(sortCompare(sortBy))
        if (sortDesc) sortedData.reverse()
      }
      return {
        addresses: paginateArray(sortedData, perPage, page),
        total: filteredData.length,
      }
    },
    async senderAddresses({ commit, getters, state }, queryObj) {
      let data = null
      const { is_sender } = queryObj
      await axios.get(apiAddress, {
        params: { is_sender },
        headers: getters.get_headers,
      }).then(ret => {
        data = ret.data.object
        if (data) {
          data.forEach(i => {
            // eslint-disable-next-line no-param-reassign
            i.default = (i.id === state.userProfile.customer.shipper_address) ? i.id : false
          })
          commit('setSenderAddresses', data)
          console.log('axios get sender addresses')
        }
      })
      return data
    },
    async shippingAddresses({ commit, getters, state }, queryObj) {
      let data = null
      const { is_sender } = queryObj
      await axios.get(apiAddress, {
        params: { is_sender },
        headers: getters.get_headers,
      }).then(ret => {
        data = ret.data.object
        if (data) {
          data.forEach(i => {
            // eslint-disable-next-line no-param-reassign
            i.default = (i.id === state.userProfile.customer.address) ? i.id : false
          })
          commit('setShippingAddresses', data)
          console.log('axios get addresses')
        }
      })
      return data
    },
    async fetchShipperAddress({ getters }, { id }) {
      let data = ''
      const map = getters.shippingAddressMap
      console.log(map)
      const aid = Number(id)
      console.log(aid)
      if (map.has(aid)) {
        data = map.get(aid)
        console.log('shipper exist')
        // console.log(data)
      } else {
        // data = await dispatch('getAddress', { id })
        // console.log(data)
        // map.set(id, data)
        // commit('setShippingAddressesMap', map)
        console.log('axios get address by id')
      }

      return data
    },
    async fetchSenderAddress({ getters }, { id }) {
      let data = ''
      const map = getters.senderAddressMap
      console.log(map)
      const aid = Number(id)
      console.log(aid)
      if (map.has(aid)) {
        data = map.get(aid)
        console.log('sender exist')
      } else {
        // data = await dispatch('getAddress', { id })
        // console.log(data)
        // map.set(id, data)
        // commit('setSenderAddressesMap', map)
        // eslint-disable-next-line radix
        console.log('axios get address by id')
      }
      console.log(data)
      return data
    },
    async fetchAddress({ dispatch }, { id, isSender }) {
      let data = ''
      console.log('fetchAddress', id, isSender)
      if (isSender === true) {
        data = await dispatch('fetchSenderAddress', { id })
      } else {
        data = await dispatch('fetchShipperAddress', { id })
      }
      console.log(data)
      return data
    },
    async fetchShippingAddresses({ state, dispatch }, queryObj) {
      let data = []
      if (!state.shippingAddresses) {
        data = await dispatch('shippingAddresses', queryObj)
      } else {
        data = state.shippingAddresses
        console.log('addresses exist')
      }
      console.log(data)
      console.log(state.userProfile.customer.address)
      // eslint-disable-next-line object-curly-newline
      const { q = '', perPage = 10, page = 1, sortBy = 'id', sortDesc = false } = queryObj
      /* eslint-enable */
      const queryLowered = q.toLowerCase()
      let filteredData = []
      let sortedData = []
      if (data) {
        filteredData = data.filter(
          add =>
            /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
            (add.title?.toLowerCase().includes(queryLowered) ||
              add.address?.toLowerCase().includes(queryLowered) ||
              add.suburb?.toLowerCase().includes(queryLowered) ||
              add.city?.toLowerCase().includes(queryLowered)),
        )
        sortedData = filteredData.sort(sortCompare(sortBy))
        if (sortDesc) sortedData.reverse()
      }

      return {
        addresses: paginateArray(sortedData, perPage, page),
        total: filteredData.length,
      }
    },
    updateOrders({ getters, commit }, obj) {
      if (obj) {
        const { id } = obj
        // eslint-disable-next-line prefer-const
        let map = getters.ordersMap
        map.set(id, obj)
        commit('setOrdersMap', map)
      }
    },
    async walletPayOrder({ getters, dispatch }, id) {
      let data = ''
      await axios.get(`${apiOrder + id}/?type=wallet`, {
        headers: getters.get_headers,
      }).then(ret => {
        data = ret.data
        dispatch('updateOrders', data)
        console.log('axios get order by id')
      })
      return data
    },
    async remoteOrder({ getters, dispatch }, id) {
      let data = ''
      await axios.get(`${apiOrder + id}/`, {
        headers: getters.get_headers,
      }).then(ret => {
        data = ret.data
        dispatch('updateOrders', data)
        console.log('axios get order by id')
      })
      return data
    },
    async ifOrderPaid({ dispatch, commit }, { id }) {
      let boo = false
      const order = await dispatch('remoteOrder', id)
      if (order) {
        boo = order.paid
      }
      const data = await dispatch('orders')
      data.forEach(i => {
        if (i.id === id) {
          // eslint-disable-next-line no-param-reassign
          i.ifpaid = (boo) ? 'Paid' : 'Unpaid'
          // eslint-disable-next-line no-param-reassign
          i.paid = boo
        }
      })
      commit('setOrders', data)
      return boo
    },
    async order({ getters, dispatch }, { id }) {
      let data = ''
      // 读取store
      // const map = getters.ordersMap
      // console.log(map)
      // if (map.has(Number(id))) {
      //   data = map.get(Number(id))
      //   console.log('order exist')
      // } else {
      //   await axios.get(`${apiOrder + id}/`, {
      //     headers: getters.get_headers,
      //   }).then(ret => {
      //     data = ret.data
      //     dispatch('updateOrders', data)
      //     console.log('axios get order by id')
      //   })
      // }
      await axios.get(`${apiOrder + id}/`, {
        headers: getters.get_headers,
      }).then(ret => {
        data = ret.data
        dispatch('updateOrders', data)
        console.log('axios get order by id')
      }).catch(async error => {
        console.log(error)
        console.log(`${error.response.status}---${error.response.statusText}`)
        const token = await dispatch('refreshToken')
        if (token) dispatch('order', { id })
      })

      return data
    },
    // async fetchOrder({ commit, getters }, { id }) {
    //   let data = ''
    //   // console.log(parcelsMap.value)
    //   // const arr = getters.ordersArr
    //   const map = getters.ordersMap
    //   console.log(map)
    //   if (map.has(id)) {
    //     data = map.get(id)
    //     console.log('order exist')
    //     // console.log(data)
    //   } else {
    //     await useJwt.order({ id }).then(ret => {
    //       data = ret.data
    //       map.set(id, data)
    //       // ordersMap.value = map
    //       // const newarr = Array.from(map)
    //       // console.log(arr)
    //       commit('setOrdersMap', map)
    //       console.log('axios get order by id')
    //     })
    //   }

    //   return data
    // },
    async remoteOrders({ commit, getters }) {
      let data = ''
      // const { status } = queryObj
      await axios.get(apiOrder, {
        // params: status ? { state: status } : {},
        headers: getters.get_headers,
      }).then(ret => {
        data = ret.data
        data.forEach(i => {
          // eslint-disable-next-line no-param-reassign
          i.ifpaid = (i.paid) ? 'Paid' : 'Unpaid'
          // eslint-disable-next-line no-param-reassign
          i.freightNo = i.freight?.title ?? ''
        })
        console.log(data)
        commit('setOrders', data)
        console.log('axios get orders')
      })

      return data
    },
    async orders({ dispatch, state }) {
      let data = ''
      if (!state.orders) {
        data = await dispatch('remoteOrders')
      } else {
        data = state.orders
        console.log('orders exist')
      }
      return data
    },
    async fetchOrders({ dispatch, state }, queryObj) {
      let data = ''
      // eslint-disable-next-line object-curly-newline
      const { orderStatus = '', forceRefresh = true, q = '', perPage = 10, page = 1, sortBy = 'id', sortDesc = false, status = null } = queryObj
      if (forceRefresh || !state.orders) {
        // data = await dispatch('remoteOrders', { status: orderStatus })
        data = await dispatch('remoteOrders')
      } else {
        data = await dispatch('orders')
      }
      const queryLowered = q.toLowerCase()
      const filteredData = data.filter(
        order =>
          /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
          (order.title?.toLowerCase().includes(queryLowered) ||
          order.tracking_number?.toLowerCase().includes(queryLowered)) &&
          order.freight_type === (status || order.freight_type) &&
          order.state === (orderStatus || order.state),
      )

      const sortedData = filteredData.sort(sortCompare(sortBy))
      if (sortDesc) sortedData.reverse()
      return {
        orders: paginateArray(sortedData, perPage, page),
        total: filteredData.length,
      }
    },
  },
}
