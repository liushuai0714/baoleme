<template>
  <div
    class="mask"
    v-if="showCart && calculations.total > 0"
    @click="handleCartShowChange"
  ></div>
  <div class="cart">
    <div class="product" v-if="showCart && calculations.total > 0">
      <div class="product__header">
        <div
          class="product__header__all"
          @click="() => setCartItemsChecked(shopId)"
        >
          <span
            class="product__header__icon iconfont"
            v-html="calculations.allChecked ? '&#xe652;' : '&#xe7ae;'"
          ></span>
          全选
        </div>
        <div
          class="product__header__clear"
          @click="
            () => {
              cleanCartProducts(shopId), handleCartShowChange();
            }
          "
        >
          清空购物车
        </div>
      </div>
      <div class="product__item" v-for="item in productList" :key="item._id">
        <div
          class="product__item__checked iconfont"
          v-html="item.check ? '&#xe652;' : '&#xe7ae;'"
          @click="() => changeCartItemChecked(shopId, item._id)"
        ></div>
        <img class="product__item__img" :src="item.imgUrl" alt="" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{ item.price }}
            <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus iconfont"
            @click="
              () => {
                changeCartItemInfo(shopId, item._id, item, -1);
              }
            "
            >&#xe62a;</span
          >
          {{ item.count || 0 }}
          <span
            class="product__number__add iconfont"
            @click="
              () => {
                changeCartItemInfo(shopId, item._id, item, 1);
              }
            "
            >&#xe661;</span
          >
        </div>
      </div>
    </div>
    <div class="check">
      <div class="check__icon iconfont" @click="handleCartShowChange">
        &#xe79a;
      </div>
      <div class="check__count">{{ calculations.total }}</div>

      <div class="check__info" v-if="calculations.price > 0">
        总计：
        <span class="check__info__price"> {{ calculations.price }}</span>
      </div>
      <div v-else>购物车是空的</div>

      <div
        class="check__btn"
        v-show="calculations.total > 0"
        @click="getAlladdress"
      >
        <router-link :to="{ path: `/OrderConfirmation/${shopId}` }">
          去结算
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useCommonCartEffect } from "../../effects/cartEffects.js";

//获取购物车信息逻辑
const useCartEffect = (shopId) => {
  const { changeCartItemInfo, productList, calculations } =
    useCommonCartEffect(shopId);
  const store = useStore();

  const changeCartItemChecked = (shopId, productId) => {
    store.commit("changeCartItemChecked", { shopId, productId });
  };
  //清空购物车
  const cleanCartProducts = (shopId, showCart) => {
    store.commit("cleanCartProducts", { shopId });
  };

  //
  const setCartItemsChecked = (shopId) => {
    store.commit("setCartItemsChecked", { shopId });
  };

  const getAlladdress = () => {
      store.dispatch("getAlladdress");
    };
  return {
    getAlladdress,
    calculations,
    productList,
    changeCartItemInfo,
    changeCartItemChecked,
    cleanCartProducts,
    setCartItemsChecked,
  };
};

const toggleCartEffect = () => {
  const showCart = ref(false);
  const handleCartShowChange = () => {
    showCart.value = !showCart.value;
  };
  return { showCart, handleCartShowChange };
};

export default {
  name: "Cart",
  setup() {
    const shopId = useRoute().params.id;
    const {
      calculations,
      productList,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemsChecked,
      getAlladdress
    } = useCartEffect(shopId);
    const { showCart, handleCartShowChange } = toggleCartEffect();
    
    return {
      getAlladdress,
      calculations,
      productList,
      shopId,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemsChecked,
      showCart,
      handleCartShowChange,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.cart {
  z-index: 2;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
}

.check {
  display: flex;
  height: 0.49rem;
  line-height: 0.49rem;
  border-top: 0.01em solid $content-bgColor;
  &__icon {
    font-size: 0.3rem;
    width: 0.28rem;
    margin-left: 0.24rem;
    color: #4fb0f9;
  }
  &__count {
    background-color: $hightlight-fontColor;
    min-width: 0.2rem;
    height: 0.2rem;
    line-height: 0.2rem;
    text-align: center;
    transform: scale(0.8);
    font-size: 0.12rem;
    border-radius: 0.1rem;
    color: #fff;
    position: relative;
    top: 0.02rem;
    left: -0.05rem;
    padding: 0 0.05rem;
  }
  &__info {
    flex: 1;
    line-height: 0.49rem;
    color: #333;
    font-size: 0.12rem;
    &__price {
      color: $hightlight-fontColor;
      font-size: 0.18rem;
    }
  }
  &__btn {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0.98rem;
    font-size: 0.14rem;
    text-align: center;
    background-color: #4fb0f9;
    a {
      color: $bg-color;
      text-decoration: none;
    }
  }
}
.product {
  overflow-y: scroll;
  flex: 1;
  background-color: $bg-color;
  &__header {
    display: flex;
    justify-content: space-between;
    line-height: 0.52rem;
    border-bottom: 0.01rem solid #f1f1f1;
    font-size: 0.14rem;
    color: #333;
    &__all {
      width: 0.64rem;
      margin-left: 0.16rem;
    }
    &__icon {
      color: #0091ff;
      font-size: 0.2rem;
      margin-right: 0.08rem;
      position: relative;
      top: 0.02rem;
    }
    &__clear {
      margin-right: 0.16rem;
      text-align: right;
      width: 0.7rem;
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgColor;
    &__checked {
      font-size: 0.2rem;
      color: #0091ff;
      line-height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__title {
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontColor;
      margin: 0;
      @include ellipsis;
    }
    &__price {
      color: $hightlight-fontColor;
      margin: 0.06rem 0 0 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
    }
    &__yen {
      color: $hightlight-fontColor;
      font-size: 0.12rem;
    }
    &__origin {
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: 0.2rem;
      line-height: 0.25rem;
      font-size: 0.14rem;
      color: #333;
      &__minus,
      &__add {
        position: relative;
        top: 0.04rem;
        display: inline-block;
        line-height: 0.24rem;
        border-radius: 50%;
        font-size: 0.25rem;
        text-align: center;
      }
      &__minus {
        color: $btn-bgColor;
        margin-right: 0.05rem;
      }
      &__add {
        color: $btn-bgColor;
        margin-left: 0.05rem;
      }
    }
  }
}
</style>