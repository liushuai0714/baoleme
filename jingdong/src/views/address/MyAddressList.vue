<template>
  <div class="wrapper">
    <div class="header">
      <div class="header__back iconfont" @click="handleBackClick">&#xe7eb;</div>
      管理收货地址
      <span class="header__new">新建</span>
    </div>
    <div class="address">我的收货地址</div>
    <div class="content" v-for="item in list" :key="item._id">
      <div class="content__info">
        <span class="content__info__name">{{ item.name }}</span>
        <span class="content__info__tel">{{ item.phone }}</span>
      </div>
      <div class="content__address">
        {{ item.city + item.department + item.houseNumber }}
      </div>
      <span class="content__enter iconfont" @click="handeleToEdit(item._id)"
        >&#xe7eb;</span
      >
    </div>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import { useGetAddressEffect } from "../../effects/addressEffects";

export default {
  name: "MyaddressList",
  setup() {
    const router = useRouter();
    const handleBackClick = () => {
      router.back();
    };
    const { list } = useGetAddressEffect();
    const handeleToEdit = (id) => {
      router.push({ path: `/upsertAddress/${id}` });
    };
    return { handleBackClick, list, handeleToEdit };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: rgb(248, 248, 248);
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
.header {
  position: relative;
  padding: 0.12rem 0 0.12rem;
  line-height: 0.24rem;
  color: #333;
  text-align: center;
  font-size: 0.16rem;
  background-color: #fff;
  &__back {
    position: absolute;
    left: 0.18rem;
    font-size: 0.22rem;
    color: #b6b6b6;
  }
  &__new {
    position: absolute;
    right: 0.2rem;
  }
}
.address {
  font-size: 0.14rem;
  color: #333333;
  margin: 0.16rem 0 0.12rem 0.18rem;
}
.content {
  position: relative;
  margin: 0 auto 0.16rem;
  width: 3.39rem;
  background: #ffffff;
  border-radius: 0.04rem;
  padding: 0.16rem;
  box-sizing: border-box;

  &__address {
    margin: 0.14rem 0 0.06rem;
    font-size: 0.14rem;
    color: #333333;
    padding-right: 0.2rem;
  }
  &__info {
    height: 0.17rem;
    font-size: 0.12rem;
    color: #999999;
    display: flex;
    &__name {
      margin-right: 0.06rem;
    }
    &__tel {
      flex: 1;
      padding-left: 0.66rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
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
</style>