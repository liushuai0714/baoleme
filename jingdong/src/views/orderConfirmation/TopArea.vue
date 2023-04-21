<template>
  <div class="top">
    <div class="top__header">
      <div class="top__header__back iconfont" @click="handleBackClick">
        &#xe7eb;
      </div>
      确认订单
    </div>
      <div class="top__receiver">
        <div class="top__receiver__title">收货地址</div>
        <template v-if='item'>
          <div class="top__receiver__address">
          {{ item.city + item.department + item.houseNumber }}
        </div>
        <div class="top__receiver__info">
          <span class="top__receiver__info__name">{{ item.name }}</span>
          <span class="top__receiver__info__tel">{{ item.phone }}</span>
        </div>
      </template>
      <template v-else>
        <p>请选择收货地址</p>
      </template>
      <span class="top__receiver__enter iconfont" @click="handleToAddress"
        >&#xe7eb;</span
      >
      </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from 'vuex';
export default {
  name: "TopArea",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore()
    const shopId = route.params.id;
    const addressId = route.params.addressId;
    const handleBackClick = () => {
      router.back();
    };
    const handleToAddress = () => {
      router.push({ path: `/ChooseAddress/${shopId}`});
    };
    let id = 0
    addressId ? id = addressId - 1 : id = 0
    const item = store.state.addressList[id]
    return { handleBackClick, item, handleToAddress };
  },
};
</script>


<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.top {
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-repeat: no-repeat;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  &__header {
    position: relative;
    padding-top: 0.2rem;
    line-height: 0.24rem;
    color: #ffffff;
    text-align: center;
    font-size: 0.16rem;
    &__back {
      position: absolute;
      left: 0.18rem;
      font-size: 0.22rem;
    }
  }
  &__receiver {
    position: absolute;
    width: 3.39rem;
    height: 1.11rem;
    top: 0.85rem;
    left: 50%;
    margin-left: -1.7rem;
    background: #ffffff;
    border-radius: 0.04rem;
    padding: 0.16rem;
    box-sizing: border-box;
    &__title {
      font-size: 0.16rem;
      color: #333333;
      height: 0.22rem;
    }
    &__address {
      margin: 0.14rem 0 0.06rem;
      height: 0.2rem;
      font-size: 0.14rem;
      padding-right: 0.2rem;
      color: #333333;
      @include ellipsis;
    }
    &__info {
      font-size: 0.12rem;
      color: #666666;
      height: 0.17rem;
      &__name {
        margin-right: 0.06rem;
      }
    }
    &__enter {
      position: absolute;
      transform: rotate(180deg);
      right: 0.16rem;
      top: 50%;
      margin-top: -0.11rem;
    }
  }
}
</style>