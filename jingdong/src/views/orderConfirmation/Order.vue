<template>
  <div class="order">
    <div class="order__info">
      实付金额 <b class="order__info__price">&yen;{{ calculations.price }}</b>
    </div>
    <div class="order__btn" @click="() => handleShowConfirmChange(true)">
      提交订单
    </div>
  </div>
  <div
    class="mask"
    v-show="showConfirm"
    @click="() => handleShowConfirmChange(false)"
  >
    <div class="mask__content" @click.stop>
      <h3 class="mask__content__title">确认要离开收银台?</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div
          @click="
            () => {
              handleConfirmOrder(true);
            }
          "
          class="mask__content__btn mask__content__btn--first"
        >
          取消订单
        </div>
        <div
          @click="handleConfirmOrder(false)"
          class="mask__content__btn mask__content__btn--last"
        >
          确认支付
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { post } from "../../utils/request";
import { useCommonCartEffect } from "../../effects/cartEffects.js";
import { useStore } from "vuex";

//下单相关逻辑
const useMakeOrderEffect = () => {
  const route = useRoute();
  const router = useRouter();
  const store = useStore();
  const shopId = parseInt(route.params.id, 10);
  const { calculations, shopName, productList } = useCommonCartEffect(shopId);
  const handleConfirmOrder = async (isCanceled) => {
    const products = [];
    for (let i in productList.value) {
      const product = productList.value[i];
      products.push({
        id: parseInt(product._id, 10),
        num: product.count,
      });
    }
    try {
      const result = await post("/api/order", {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products,
      });
      if (result?.errno === 0) {
        store.commit("clearCartData", shopId);
        router.push({ name: "OrderList" });
      }
    } catch (e) {
      console.log("请求失败");
    }
  };
  return { handleConfirmOrder, calculations };
};
//蒙层展示相关逻辑
const useShowMaskEffect = () => {
  const showConfirm = ref(false);
  const handleShowConfirmChange = (status) => {
    showConfirm.value = status;
  };
  return { showConfirm, handleShowConfirmChange };
};

export default {
  name: "Order",
  setup() {
    const { calculations, handleConfirmOrder } = useMakeOrderEffect();
    const { showConfirm, handleShowConfirmChange } = useShowMaskEffect()
    return {
      calculations,
      handleConfirmOrder,
      showConfirm,
      handleShowConfirmChange,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.order {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  line-height: 0.49rem;
  border-top: 0.01em solid $content-bgColor;
  background-color: $bg-color;
  &__info {
    font-size: .14rem;
    color: #333333;
    text-align: left;
    line-height: 0.5rem;
    margin-left: 0.24rem;
    &__price {
      font-size: .16rem;
      color: $content-fontColor;
      text-align: right;
      line-height: .22rem;
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
    color: white;
    a {
      color: $bg-color;
      text-decoration: none;
    }
  }
}
.mask {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.56rem;
    background-color: white;
    border-radius: 0.04rem;
    text-align: center;
    &__title {
      margin: 0.24rem 0 0 0;
      line-height: 0.26rem;
      font-size: 0.18rem;
      color: #333;
    }
    &__desc {
      margin: 0.08rem 0 0 0;
      font-size: 0.14rem;
      color: #666666;
    }
    &__btns {
      display: flex;
      margin: 0.24rem 0.58rem;
    }
    &__btn {
      flex: 1;
      width: 0.8rem;
      line-height: 0.32rem;
      border-radius: 0.16rem;
      font-size: 0.14rem;
      &--first {
        border: 0.01rem solid #4fb0f9;
        margin-right: 0.12rem;
        color: #4fb0f9;
      }
      &--last {
        margin-left: 0.12rem;
        color: white;
        background-color: #4fb0f9;
        border: .01rem solid #4fb0f9;
      }
    }
  }
}
</style>