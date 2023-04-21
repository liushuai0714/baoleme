<template>
  <div class="wrapper">
    <div class="header">
      <div class="header__person">
        <div class="header__person__avatar"></div>
        <div class="header__person__name">{{ person.username }}</div>
        <div class="header__person__id">ID:{{ person._id }}</div>
        <div class="divider"></div>
        <ul class="header__ul">
          <li class="header__ul__li">
            <div class="header__ul__li__title">红包</div>
            <div class="header__ul__li__desc">218</div>
          </li>
          <li class="header__ul__li">
            <div class="header__ul__li__title">优惠券</div>
            <div class="header__ul__li__desc">12张</div>
          </li>
          <li class="header__ul__li">
            <div class="header__ul__li__title">鲜豆</div>
            <div class="header__ul__li__desc">88</div>
          </li>
          <li class="header__ul__li">
            <div class="header__ul__li__title">白条</div>
            <div class="header__ul__li__desc">1000</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <div class="content__address">
        <div class="content__address__icon iconfont">&#xe61a;</div>
        <div class="content__address__my">我的地址</div>
        <div class="content__address__right iconfont" @click="handleToAddress">
          &#xe665;
        </div>
      </div>
    </div>
    <button class="logout" @click="handleLogout">退出登录</button>
  </div>
  <Docker :currentIndex="3" />
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import Docker from "../../components/Docker.vue";
import { get } from "../../utils/request";

const usePersonEffect = () => {
  let data = reactive({ person: {} });
  const getPerson = async () => {
    const result = await get("/api/user/info");
    if (result?.errno === 0 && result?.data) {
      data.person = result.data;
    }
  };
  getPerson();
  const { person } = toRefs(data);
  return { person };
};
export default {
  name: "Person",
  components: { Docker },
  setup() {
    const router = useRouter();
    const handleToAddress = () => {
      router.push({ name: "MyAddressList" });
    };
    const { person } = usePersonEffect();
    const handleLogout = () =>{
      localStorage.removeItem('isLogin')
      router.push({name: "Login"})
    }
    return { handleToAddress, person, handleLogout };
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
  text-align: center;
}
.header {
  background-image: linear-gradient(239deg, #3a6ff3 0%, #50c7fb 100%);
  height: 2.5rem;

  &__person {
    background: #ffffff;
    box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.08);
    border-radius: 0.08rem;
    width: 3.39rem;
    height: 2.03rem;
    position: absolute;
    left: 50%;
    margin-left: -1.7rem;
    margin-top: 1.08rem;
    &__avatar {
      width: 0.94rem;
      height: 0.94rem;
      background-color: #32c5ff;
      position: absolute;
      left: 50%;
      margin-top: -0.47rem;
      margin-left: -0.47rem;
      border-radius: 50%;
    }
    &__name {
      font-size: 0.24rem;
      color: #262628;
      text-align: center;
      line-height: 36px;
      margin-top: 0.59rem;
    }
    &__id {
      font-size: 0.14rem;
      color: #c1c0c9;
      text-align: center;
    }
  }
  &__ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
    padding: 0;
    &__li {
      &__title {
        font-size: 0.12rem;
        color: #c1c0c9;
        text-align: center;
        line-height: 0.17rem;
      }
      &__desc {
        margin-top: 0.03rem;
        font-size: 0.2rem;
        color: #262628;
        text-align: center;
        line-height: 0.28rem;
      }
    }
  }
}
.divider {
  width: 3.37rem;
  height: 0;
  border: 0.01rem solid #f1f1f1;
  margin-top: 0.12rem;
}
.content {
  background: #ffffff;
  box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.08);
  border-radius: 0.08rem;
  width: 3.39rem;
  margin: 0.77rem auto 0;
  &__address {
    display: flex;
    padding: 0.2rem;
    line-height: 0.22rem;
    font-size: 0.14rem;
    color: #262626;
    &__icon {
      background: #32c5ff;
      border-radius: 0.08rem;
      height: 0.22rem;
      width: 0.22rem;
      text-align: center;
      font-size: 0.14rem;
      line-height: 0.22rem;
      color: #ffffff;
      font-weight: 700;
    }
    &__my {
      flex: 1;
      margin-left: 0.12rem;
    }
    &__right {
      color: #c2c4ca;
      font-weight: 700;
    }
  }
}
.logout {
  background-color:#0091ff;
  border: none;
  color: white;
  display: inline-block;
  width: 3.39rem;
  height: .32rem;
  margin: .2rem .2rem;
  border-radius: .04rem;
}
</style>