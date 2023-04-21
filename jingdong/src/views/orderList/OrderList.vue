<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item, index) in list" :key="index">
        <div class="order__title">
          {{ item.shopName }}
          <span class="order__status">
            {{ item.isCanceled ? "已取消" : "已下单" }}
          </span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <template
              v-for="(innerItem, innerIndex) in item.products"
              :key="innerIndex"
            >
              <img
                class="order__content__img"
                :src="innerItem.product.img"
                alt=""
                v-if="innerIndex <= 3"
              />
            </template>
          </div>
          <div class="order__content__info">
            <div class="order__content__info__price">
              &yen;{{ item.totalPrice }}
            </div>
            <div class="order__content__info__count">
              共{{ item.totalCount }}件
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>

<script>
import { reactive, toRefs } from "vue";
import { get } from "../../utils/request";
import Docker from "../../components/Docker.vue";
//处理订单逻辑
const useOrderListEffect = () => {
  const data = reactive({ list: [] });
  try {
    const getOrderList = async () => {
      const result = await get("/api/order");
      if (result?.errno === 0 && result?.data?.length) {
        console.log(result.data);
        const orderList = result.data;
        orderList.forEach((order) => {
          const products = order.products || [];
          let totalPrice = 0;
          let totalCount = 0;
          products.forEach((productItem) => {
            totalPrice +=
              productItem?.product.price * productItem?.orderSales || 0;
            totalCount += productItem?.orderSales || 0;
          });
          order.totalPrice = totalPrice;
          order.totalCount = totalCount;
        });
        data.list = result.data;
      }
    };
    getOrderList();
  } catch {
    console.log("请求失败");
  }
  const { list } = toRefs(data);
  return { list };
};
export default {
  name: "OrderList",
  components: { Docker },

  setup() {
    const { list } = useOrderListEffect();
    return { list };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  background: rgb(248, 248, 248);
}
.title {
  line-height: 0.44rem;
  background-color: $bg-color;
  font-size: 0.16rem;
  text-align: center;
  color: $content-fontColor;
}

.order {
  padding: 0.16rem;
  background-color: $bg-color;
  margin: 0.16rem 0.18rem 0.16rem;
  &__title {
    line-height: 0.22rem;
    font-size: 0.16rem;
    color: $content-fontColor;
    margin-bottom: 0.16rem;
  }
  &__status {
    font-size: 0.14rem;
    color: $light-fontColor;
    float: right;
  }
  &__content {
    // width: 1.96rem;
    display: flex;
    &__img {
      height: 0.4rem;
      width: 0.4rem;
      margin-right: 0.12rem;
    }

    &__info {
      flex: 1;
      text-align: right;
      &__price {
        font-size: 0.14rem;
        color: #e93b3b;
        line-height: 0.2rem;
      }
      &__count {
        margin-top: 0.04rem;
        font-size: 0.12rem;
        color: $content-fontColor;
        line-height: 0.14rem;
      }
    }
  }
}
</style>