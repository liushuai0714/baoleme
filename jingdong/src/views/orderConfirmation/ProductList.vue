<template>
  <div class="content">
    <h2 class="content__name">{{ shopName }}</h2>
    <div class="content__item" v-for="item in productList" :key="item._id">
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
</template>

<script>
import { useRoute } from "vue-router";
import { useCommonCartEffect } from "../../effects/cartEffects.js";
export default {
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { productList, shopName } = useCommonCartEffect(shopId);
    return { productList, shopName };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.content {
  background-color: white;
  width: 3.39rem;
  margin: 0.16rem auto 0.55rem;
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