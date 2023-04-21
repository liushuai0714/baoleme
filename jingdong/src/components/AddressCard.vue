<template>
  <div class="content" v-for="item in list" :key="item._id">
    <div class="content__info">
      <span class="content__info__name">{{ item.name }}</span>
      <span class="content__info__tel">{{ item.phone }}</span>
    </div>
    <div class="content__address">
      {{ item.city + item.department + item.houseNumber }}
    </div>
    <span class="content__enter iconfont" @click="handleclick"
      >&#xe7eb;</span
    >
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "AddressCard",
  props: ["list", "handleclick"],
  // setup() {
  //   const router = useRouter();
  //   const handeleToEdit = (id) => {
  //     router.push({ path: `/upsertAddress/${id}` });
  //   };
  //   return { handeleToEdit };
  // },
};
</script>

<style lang="scss" scoped>
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