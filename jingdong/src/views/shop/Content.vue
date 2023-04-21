<template>
  <div class="content">
    <div class="category">
      <div :class="{
        category__item: true,
        'category__item--active': currentTab === item.tab,
      }" v-for="item in categories" :key="item.id" @click="() => handleTabClick(item.tab)">
        {{ item.name }}
      </div>
    </div>
    <div class="product">
      <div class="product__item" v-for="item in list" :key="item._id">
        <img class="product__item__img" :src="item.imgUrl" alt="" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__sales">月售{{ item.sales }}件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{ item.price }}
            <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <span class="product__number__minus iconfont" @click="
            () => {
              changeCartItem(shopId, item._id, item, -1, shopName);
            }
          " v-show="getProductCartCount(shopId, item._id) > 0">&#xe62a;</span>
          {{ getProductCartCount(shopId, item._id) }}
          <span class="product__number__add iconfont" @click="
            () => {
              changeCartItem(shopId, item._id, item, 1, shopName);
              addBtnAnimation(item._id);
            }
          ">&#xe661;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from "vue";
import { get } from "../../utils/request";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useCommonCartEffect } from "../../effects/cartEffects.js";

const categories = [
  {
    id: 1,
    name: "全部商品",
    tab: "all",
  },
  {
    id: 2,
    name: "秒杀",
    tab: "seckill",
  },
  {
    id: 3,
    name: "新鲜水果",
    tab: "fruit",
  },
];
//tab切换逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab);
  const handleTabClick = (tab) => {
    currentTab.value = tab;
  };
  return { currentTab, handleTabClick };
};
// 列表内容相关的逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({ list: [] });
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value,
    });
    if (result?.errno === 0 && result?.data?.length) {
      content.list = result.data;
    }
  };
  watchEffect(() => {
    getContentData();
  });
  const { list } = toRefs(content);
  return { list };
};
//购物车相关逻辑
const useCartEffect = (shopId) => {
  const store = useStore();
  const { changeCartItemInfo, cartList } = useCommonCartEffect(shopId);
  const changeShopName = (shopId, shopName) => {
    store.commit("changeShopName", { shopId, shopName });
  };
  const changeCartItem = (shopId, productId, item, num, shopName) => {
    changeCartItemInfo(shopId, productId, item, num);
    changeShopName(shopId, shopName);
  };

  const getProductCartCount = (shopId, productId) => {
    const count = cartList?.[shopId]?.productList?.[productId]?.count
    if (count === 0) {
      return null
    } else {

      return cartList?.[shopId]?.productList?.[productId]?.count;
    }
  };

  return {
    cartList,
    changeCartItem,
    changeCartItemInfo,
    getProductCartCount,
  };
};

const addAnimation = () => {
  const getKeyframes = (keyframesName) => {
    //通过定义的动画函数名来查询函数
    let styleSheet = document.styleSheets[0]; //获取所有样式表
    let animation = {}; //定义一个animation来装获得的值
    // for (let i = 0; i < styleSheet.length; i++) {
    //遍历循环获取styleSheet

    for (let j = 0; j < styleSheet.cssRules.length; j++) {
      //遍历循环获取styleSheet[i].cssRules
      //判断样式名字是否为CSSKeyframesRule

      if (styleSheet.cssRules[j].constructor.name === "CSSKeyframesRule") {
        //   //再判断此时这个动画函数名是否为传入的值
        if (keyframesName === styleSheet.cssRules[j].name) {
          //获取此时的cssRules，index，和styleSheet
          animation.cssRules = styleSheet.cssRules[j];
          animation.index = j;
          animation.styleSheet = styleSheet;
          return animation; //返回获取的animation
        }
      }
    }
  };

  const addBtnAnimation = (id) => {
    const div = document.createElement("div");
    const content = document.querySelector(".content");
    const btns = document.querySelectorAll(".product__number__add");
    const cart = document.querySelector(".check__icon");
    const btnReat = btns[id - 1].getBoundingClientRect();
    const top = btnReat.top - btnReat.height + document.documentElement.scrollLeft;
    const left = btnReat.left + document.documentElement.scrollTop;
    const cartReat = cart.getBoundingClientRect();
    const x = cartReat.left - btnReat.left + document.documentElement.scrollLeft;
    const y = cartReat.top - btnReat.top + cartReat.height / 2 + document.documentElement.scrollTop;
    // var X =
    //   this.getBoundingClientRect().left + document.documentElement.scrollLeft;

    // var Y =
    //   this.getBoundingClientRect().top + document.documentElement.scrollTop;
    // console.log(top, left, x, y);
    div.className = "plus";
    div.innerHTML = `<i class="plus__word iconfont">&#xe661;</i>`;
    div.style.position = "absolute";
    div.style.width = ".2rem";
    div.style.height = ".2rem";
    div.style.top = top + "px";
    div.style.left = left + "px";

    const styleSheet = document.styleSheets[0];
    let x2 = getKeyframes("moveX");
    let insertKeyframes = `@keyframes moveX {to { transform: translateX(${x}px) }}`;
    if (x2) {
      styleSheet.deleteRule(x2.index);
      styleSheet.insertRule(insertKeyframes, x2.index);
    } else {
      styleSheet.insertRule(insertKeyframes);
    }

    let y2 = getKeyframes("moveY");
    let insertKeyframes2 = `@keyframes moveY {to { transform: translateY(${y}px) }}`;
    if (y2) {
      styleSheet.deleteRule(y2.index);
      styleSheet.insertRule(insertKeyframes2, y2.index);
    } else {
      styleSheet.insertRule(insertKeyframes2);
    }
    const word = div.querySelector(".plus__word");
    word.style.color = "#0091FF";
    word.style.position = "absolute";
    word.style.fontSize = ".2rem";
    word.style.lineHerght = ".2rem";

    //强行渲染  读取div的任何一个布局属性，都会导致重新渲染
    // div.clientWidth

    // div.style.animationName = "moveX";
    // div.style.animationDuration = ".5s";
    // div.style.animationTimingFunction = "linear";
    // word.style.animationName = "moveY";
    // word.style.animationDuration = ".5s";
    // word.style.animationTimingFunction = "cubic-bezier(0.39,-0.62, 1, 1)";

    // setTimeout(() => {
    //   clearTimeout();
    //   div.style.animationName = "moveX";
    //   div.style.animationDuration = ".5s";
    //   div.style.animationTimingFunction = "linear";
    //   word.style.animationName = "moveY";
    //   word.style.animationDuration = ".5s";
    //   word.style.animationTimingFunction = "cubic-bezier(0.39,-0.62, 1, 1)";
    // }, 0);

    const endAnimation = () => {
      div.style.animationName = "moveX";
      div.style.animationDuration = ".5s";
      div.style.animationTimingFunction = "linear";
      word.style.animationName = "moveY";
      word.style.animationDuration = ".5s";
      word.style.animationTimingFunction = "cubic-bezier(0.39,-0.62, 1, 1)";
    }
    requestAnimationFrame(endAnimation)

    document.body.appendChild(div);
    div.addEventListener("animationend", () => {
      div.remove();
    });
  };

  return { addBtnAnimation };
};

export default {
  name: "Content",
  props: ["shopName"],
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { currentTab, handleTabClick } = useTabEffect();
    const { list } = useCurrentListEffect(currentTab, shopId);
    const { cartList, changeCartItem, getProductCartCount } =
      useCartEffect(shopId);

    const { addBtnAnimation } = addAnimation();
    return {
      addBtnAnimation,
      list,
      categories,
      handleTabClick,
      currentTab,
      shopId,
      cartList,
      changeCartItem,
      getProductCartCount,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.content {
  position: absolute;
  display: flex;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: 0.5rem;
  background-color: #ccc;
}

.category {
  width: 0.76rem;
  background: $search-bgColor;
  height: 100%;
  overflow-y: scroll;

  &__item {
    text-align: center;
    line-height: 0.4rem;
    font-size: 0.14rem;
    color: $content-fontColor;

    &--active {
      background: $bg-color;
    }
  }
}

.product {
  overflow-y: scroll;
  flex: 1;
  background-color: $bg-color;

  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgColor;

    &__detail {
      overflow: hidden;
    }

    &__img {
      width: 0.68rem;
      height: 0.68rem;
      margin-right: 0.16rem;
    }

    &__title {
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontColor;
      margin: 0;
      @include ellipsis;
    }

    &__sales {
      margin: 0.06rem 0;
      line-height: 0.16rem;
      font-size: 0.12rem;
      color: $content-fontColor;
    }

    &__price {
      color: $hightlight-fontColor;
      margin: 0;
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
}</style>