<template>
  <div class="wrapper">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      alt=""
      class="wrapper__img"
    />
    <div class="wrapper__input">
      <input
        type="text"
        class="wrapper__input__content"
        placeholder="请输入用户名"
        v-model="username"
      />
    </div>
    <!-- 不自动填充密码 autocomplete="new-password"-->
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        placeholder="请输入密码"
        v-model="password"
        autocomplete="new-password"
      />
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登录</div>
    <router-link :to="{ name: 'Register' }">
      <div class="wrapper__login-link">立即注册</div>
    </router-link>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast";

const useLoginEffect = (showToast) => {
  const router = useRouter();
  const data = reactive({ username: "", password: "" });

  const handleLogin = async () => {
    const {username, password} = data;
    if (!username || !password) {
      return showToast("用户名和密码不能为空！")
    }
    try {
      const result = await post("/api/user/login", {
        username: data.username,
        password: data.password,
      });
      if (result?.errno === 0) {
        localStorage.isLogin = true;
        router.push({ name: "Home" });
      } else {
        showToast("登录失败");
      }
    } catch (e) {
      showToast("请求失败");
    }
  };
  const { username, password } = toRefs(data);
  return { username, password, handleLogin };
};

export default {
  name: "Login",
  components: { Toast },
  //职责就是告诉你，代码执行的一个过程
  setup() {
    const { show, toastMessage, showToast } = useToastEffect();
    const { username, password, handleLogin } = useLoginEffect(showToast);
    return { handleLogin, username, password, show, toastMessage };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    width: 0.66rem;
    height: 0.66rem;
    margin: 0 auto 0.4rem;
  }
  &__input {
    padding: 0 0.16rem;
    box-sizing: border-box;
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem;
    background-color: #f9f9f9;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.06rem;
    border-radius: 0.06rem;
    &__content {
      margin-top: .11rem;
      line-height: 0.22rem;
      border: none;
      outline: none;
      width: 100%;
      background: none;
      font-size: 0.16rem;
      color:$content-notice-fontColor;
      &::placeholder {
        font-size: .16rem;
        color: $content-notice-fontColor;
        letter-spacing: 0;
        line-height: .24rem;
      }
    }
  }
  &__login-button {
    background-color: $btn-bgColor;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    height: 0.48rem;
    margin: 0.32rem 0.4rem 0.16rem;
    border-radius: 0.04rem;
    font-size: 0.16rem;
    line-height: 0.48rem;
    color: $bg-color;
    text-align: center;
  }
  &__login-link {
    font-size: 0.14rem;
    color:$content-notice-fontColor;
    text-align: center;
  }
}
</style>