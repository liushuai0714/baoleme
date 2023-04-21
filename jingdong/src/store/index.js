import { createStore } from 'vuex'
import { get } from '../utils/request'


const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}
const getLocalCartList = () => {
  try {
    return JSON.parse(localStorage.cartList);
  } catch (e) {
    return {}
  }
}

const setLocalAddressList = (state) => {
  const { addressList } = state
  const addressListString = JSON.stringify(addressList)
  localStorage.addressList = addressListString
}
const getLocalAddressList = () => {
  try {
    return JSON.parse(localStorage.addressList);
  } catch (e) {
    return {}
  }
}

export default createStore({
  state: {
    cartList: getLocalCartList(),
    // cartList: [
    // shopId: {
    // shopName：沃尔玛
    // productList:{
    //   productId: {
    //     _id: "1",
    //     name: "番茄 250g / 份",
    //     imgUrl: "http://www.dell-lee.com/imgs/vue3/tomato.png",
    //     sales: 10,
    //     price: 33.6,
    //     oldPrice: 39.6,
    //     count:1,
    //   }
    // },
    //     }
    // ]
    addressList: getLocalAddressList(),
  },
  mutations: {
    changeCartItemInfo(state, payload) {
      //获取到传递过来的商铺id，里面的商品id，商品详情
      const { shopId, productId, productInfo, num } = payload;

      let shopInfo = state.cartList[shopId] || {
        shopName: "", productList: {}
      };
      let product = shopInfo.productList[productId];
      if (!product) {
        productInfo.count = 0;
        product = productInfo
      }
      product.count += num;
      if (num > 0) { product.check = true }
      if (product.count < 0) { product.count = 0 };
      //把商品信息添加到空的shopInfo中
      shopInfo.productList[productId] = product;
      //把店铺和商品信息都添加到store中
      state.cartList[shopId] = shopInfo;
      setLocalCartList(state)
    },

    changeShopName(state, payload) {
      const { shopId, shopName } = payload;
      const shopInfo = state.cartList[shopId] || { shopName: "", product: {} }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },

    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    cleanCartProducts(state, payload) {
      const { shopId } = payload;
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    setCartItemsChecked(state, payload) {
      const { shopId } = payload;
      const products = state.cartList[shopId].productList;
      if (products) {
        for (const key in products) {
          const product = products[key]
          product.check = true;
        }
      }
      setLocalCartList(state)
    },
    clearCartData(state, shopId) {
      state.cartList[shopId].productList = {}
    },

    getAlladdress(state, list) {
      state.addressList = list
      setLocalAddressList(state)
    },

  },
  actions: {
    getAlladdress({ commit }) {
      let list = {}
      const getAddlistList = async () => {
        const result = await get(`./api/user/address`);
        if (result?.errno === 0 && result?.data) {
          list = result.data
          commit("getAlladdress", list)
        }
      };
      getAddlistList()
    }
  },
  modules: {
  }

})
