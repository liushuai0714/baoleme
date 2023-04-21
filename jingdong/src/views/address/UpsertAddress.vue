<template>
  <div class="wrapper">
    <div class="header">
      <div class="header__back iconfont" @click="handleBackClick">&#xe7eb;</div>
      编辑收货地址
      <span class="header__new">保存</span>
    </div>
    <div class="form">
      <div class="form__item">
        <div class="form__item__label">所在城市:</div>
        <input
          class="form__item__content"
          placeholder="如北京"
          :value="address.city"
        />
      </div>
      <div class="form__item">
        <div class="form__item__label">小区/大厦/学校:</div>
        <input
          class="form__item__content"
          placeholder="如理工大学国防科技园"
          :value="address.department"
        />
      </div>
      <div class="form__item">
        <div class="form__item__label">楼号-门牌号:</div>
        <input
          class="form__item__content"
          placeholder="如A号楼B层"
          :value="address.houseNumber"
        />
      </div>
      <div class="form__item">
        <div class="form__item__label">收货人:</div>
        <input
          class="form__item__content"
          placeholder="请填写收货人的姓名"
          :value="address.name"
        />
      </div>
      <div class="form__item">
        <div class="form__item__label">联系电话:</div>
        <input
          class="form__item__content"
          placeholder="请填写收货手机号"
          :value="address.phone"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { get } from "../../utils/request";
const useEditAddressEffect = (id) => {
  const data = reactive({ address: {} });
  const getAddress = async () => {
    const result = await get(`/api/user/address/${id}`);
    if (result?.errno === 0 && result?.data) {
      data.address = result.data;
    }
  };
  getAddress();
  const { address } = toRefs(data);
  return { address };
};
export default {
  name: "UpsertAddress",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const id = route.params.id;
    const handleBackClick = () => {
      router.back();
    };
    const { address } = useEditAddressEffect(id);
    return { handleBackClick, address };
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
  padding: 0.1rem 0 0.16rem;
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
.form {
  background-color: #fff;
  margin-top: 0.12rem;
  &__item {
    border-bottom: 0.01rem solid #f1f1f1;
    margin: 0 0.18rem;
    padding: 0.18rem 0 0.18rem;
    display: flex;
    &__label {
      font-size: 14px;
      color: #666666;
      line-height: 20px;
    }
    &__content {
      &::placeholder {
        font-size: 14px;
        color: #999999;
        line-height: 20px;
      }
      flex: 1;
      outline: none;
      border: none;
      font-size: 14px;
      color: #333333;
      line-height: 20px;
    }
  }
}
</style>