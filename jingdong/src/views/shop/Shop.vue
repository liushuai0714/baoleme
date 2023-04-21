<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe7eb;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe741;</span>
        <input class="search__content__input" placeholder="请输入商品名称" />
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl" />
    <Content :shopName="item.name" />
    <Cart />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import ShopInfo from "../../components/ShopInfo";
import { get } from "../../utils/request";
import { useRouter, useRoute } from "vue-router";
import Content from "./Content.vue";
import Cart from "./Cart.vue";
//获取商家详情数据
const useShopInfoEffect = () => {
  const data = reactive({ item: {} });
  const getItemData = async () => {
    const route = useRoute();
    const result = await get(`/api/shop/${route.params.id}`);
    if (result?.errno === 0 && result?.data) {
      data.item = result.data;
    }
  };
  const { item } = toRefs(data);
  return { item, getItemData };
};
//点击回退
const useBackRouterEffect = () => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  return handleBackClick;
};

export default {
  name: "Shop",
  components: { ShopInfo, Content, Cart },

  setup() {
    const handleBackClick = useBackRouterEffect();
    const { item, getItemData } = useShopInfoEffect();
    getItemData()
    return { item, handleBackClick };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  padding: 0 0.18rem;
}
.search {
  display: flex;
  margin: 0.2rem 0 0.04rem 0;
  line-height: 0.32rem;
  &__back {
    position: relative;
    left: -0.05rem;
    width: 0.3rem;
    font-size: 0.2rem;
    color: #b6b6b6;
  }
  &__content {
    display: flex;
    flex: 1;
    background-color: $search-bgColor;
    border-radius: .16rem;
    &__icon {
      position: relative;
      top: 0.015rem;
      font-size: 0.2rem;
      height: 0.32rem;
      width: 0.44rem;
      color: $search-fontColor;
      text-align: center;
    }
    &__input {
      height: 0.32rem;
      display: block;
      width: 100%;
      border: none;
      outline: none;
      background: none;
      padding-right: 0.2rem;
      color: $content-fontColor;
      font-size: 0.14rem;
      &::placeholder {
        color: $content-fontColor;
      }
    }
  }
}
</style>