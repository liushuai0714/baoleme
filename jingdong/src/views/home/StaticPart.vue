<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe619;</span>
    北京理工大学国防科技园2号楼10层
    <span class="iconfont position__notice">&#xe74a;</span>
  </div>
  <div class="search">
    <span class="iconfont search__icon">&#xe741;</span>
    山姆会员商店优惠商品
  </div>
  <div class="banner">
    <img class="banner__img" :src="bannerUrl" alt="" />
  </div>
  <div class="icons">
    <div class="icons__item" v-for="item in partList" :key="item.id">
      <img :src="item.imgUrl" alt="" class="icons__item_img" />
      <p class="icons__item__desc">{{item.desc}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "StaticPart",
  setup() {
    const bannerUrl = "http://www.dell-lee.com/imgs/vue3/banner.jpg"
    const partList = [
      {
        id: "1",
        imgUrl: "http://www.dell-lee.com/imgs/vue3/超市.png",
        desc: "超市便利",
      },
      {
        id: "2",
        imgUrl: "http://www.dell-lee.com/imgs/vue3/菜市场.png",
        desc: "菜市场",
      },
      {
        id: "3",
        imgUrl: "http://www.dell-lee.com/imgs/vue3/水果店.png",
        desc: "水果店",
      },
      {
        id: "4",
        imgUrl: "http://www.dell-lee.com/imgs/vue3/鲜花.png",
        desc: "鲜花绿植",
      },
      {
        id: "5",
        imgUrl: "http://www.dell-lee.com/imgs/vue3/医药健康.png",
        desc: "医药健康",
      },
      {
        id: "6",
        imgUrl: "http://www.dell-lee.com/imgs/vue3/家居.png",
        desc: "家居时尚",
      },
      {
        id: "7",
        imgUrl: "http://www.dell-lee.com/imgs/vue3/蛋糕.png",
        desc: "烘培蛋糕",
      },
      {
        id: "8",
        imgUrl: "http://www.dell-lee.com/imgs/vue3/签到.png",
        desc: "签到",
      },
      {
        id: "9",
        imgUrl: "http://www.dell-lee.com/imgs/vue3/大牌免运.png",
        desc: "大牌免运",
      },
      {
        id: "10",
        imgUrl: "http://www.dell-lee.com/imgs/vue3/红包.png",
        desc: "红包套餐",
      },
    ];
  return {partList, bannerUrl}
  },

};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.position {
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  padding: 0.16rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  @include ellipsis;
  .position__icon {
    position: relative;
    font-size: 0.2rem;
    top: 0.01rem;
  }

  .position__notice {
    position: absolute;
    right: 0;
    font-size: 0.2rem;
    top: 0.17rem;
  }
  color: $content-fontColor;
}

.search {
  margin-bottom: 0.12rem;
  overflow: hidden;
  line-height: 0.32rem;
  background: $search-bgColor;
  color: $search-fontColor;
  border-radius: 0.16rem;
  padding: 0 0.16rem;
  .search__icon {
    float: left;
    margin-right: 0.1rem;
    font-size: 0.2rem;
  }
}
.banner {
  //解决图片加载过程中下方元素的抖动
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &__img {
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.16rem;
  &__item {
    width: 20%;
    &_img {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
    }
    &__desc {
      text-align: center;
      margin: 0.06rem 0 0.16rem 0;
      color: $content-fontColor;
    }
  }
}
</style>