<template>
  <div class="wrapper">
    <div class="header">
      <div class="header__title">
        我的全部购物车({{ Object.keys(cartList).length }})
      </div>
    </div>
    <div class="content" v-for="(shop, index) in cartList" :key="index">
      <h2 class="content__name">{{ shop.shopName }}</h2>
      <div
        class="content__item"
        v-for="item in shop.productList"
        :key="item._id"
      >
        <img class="content__item__img" :src="item.imgUrl" alt="" />
        <div class="content__item__detail">
          <h4 class="content__item__title">{{ item.name }}</h4>
          <p class="content__item__count">
            <span>{{ item.price }} × {{ item.count }}</span>
          </p>
        </div>
        <div class="content__item__price">
          <span class="content__item__price__yen">&yen;</span>
          <span class="content__item__price__total">
            {{ (item.price * item.count).toFixed(2) }}</span
          >
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="1" />
</template>

<script>
import Docker from "../../components/Docker.vue";
import { useCommonCartEffect } from "../../effects/cartEffects";
export default {
  name: "CartList",
  components: { Docker },
  setup() {
    const { cartList } = useCommonCartEffect();
    return { cartList };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  background: rgb(248, 248, 248);
}
.header {
  background-color: #fff;
  padding: 0.11rem 0;

  &__title {
    font-size: .16rem;
    color: #333333;
    text-align: center;
  }
}
.content {
  background-color: white;
  width: 3.39rem;
  margin: 0.16rem auto 0.16rem;
  border-radius: 0.04rem;
  &__name {
    font-size: .16rem;
    color: $content-fontColor;
    padding: 0.16rem 0 0 0.16rem;
  }
  &__item {
    display: flex;
    width: 3.07rem;
    height: 0.46rem;
    padding: 0.16rem;
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      float: left;
    }
    &__detail {
      margin-left: 0.16rem;
    }
    &__title {
      margin: 0;
      font-size: .14rem;
      color: #333333;
      width: 1.5rem;
      height: 0.2rem;
      line-height: 0.2rem;
      @include ellipsis;
    }
    &__count {
      margin: 0.06rem 0 0;
      font-size: 0.14rem;
      color: $hightlight-fontColor;
      width: 1.5rem;
      line-height: 0.2rem;
      @include ellipsis;
    }

    &__price {
      flex-grow: 1;
      text-align: right;
      padding-top: 0.26rem;
      line-height: 0.2rem;
      margin-left: 0.05rem;
      width: 1.5rem;
      @include ellipsis;
      &__yen {
        display: inline-block;
        font-size: 0.1rem;
        color: #000000;
        text-align: right;
        transform: scale(0.8);
      }
      &__total {
        font-size: 0.14rem;
        color: #000000;
        text-align: right;
      }
    }
  }
}
</style>