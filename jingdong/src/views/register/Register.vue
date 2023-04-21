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
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        placeholder="请输入密码"
        autocomplete="new-password"
        v-model="password"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        id="wrapper__input__content"
        placeholder="确认密码"
        v-model="ensurement"
      />
    </div>
    <div class="wrapper__register-button" @click="handleRegister">注册</div>
    <div class="wrapper__register-link" @click="handleToLogin">
      已有账号去登录
    </div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast";

//注册相关逻辑
const useRegisterEffect = (showToast) => {
  const router = useRouter();
  const data = reactive({
    username: "",
    password: "",
    ensurement: "",
  });

  const handleRegister = async () => {
    const {username, password, ensurement} = data;
    if (!username || !password || !ensurement) return showToast("用户名密码确认密码不能为空！");
    if (password !== ensurement) return showToast("密码确认不一致！");
    try {
      const result = await post("/api/user/register", {
        email: data.email,
        password: data.password,
      });
      if (result?.errno === 0) {
        router.push({ name: "Login" });
      } else {
        showToast("注册失败");
      }
    } catch (e) {
      showToast("请求失败");
    }
  };
  const { username, password, ensurement } = toRefs(data);
  return { username, password, ensurement, handleRegister };
};

const useToLoginEffect = () => {
  const router = useRouter();
  const handleToLogin = () => {
    router.push({ name: "Login" });
  };
  return { handleToLogin };
};

export default {
  name: "Register",
  components: { Toast },
  setup() {
    const { show, toastMessage, showToast } = useToastEffect();
    const { username, password, ensurement, handleRegister } =
      useRegisterEffect(showToast);
    const { handleToLogin } = useToLoginEffect();
    return {
      handleRegister,
      handleToLogin,
      username,
      password,
      ensurement,
      showToast,
      show,
      toastMessage,
    };
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
      color: $content-notice-fontColor;
      &::placeholder {
        font-size: .16rem;
        color: $content-notice-fontColor;
        letter-spacing: 0;
        line-height: .24rem;
      }
    }
  }
  &__register-button {
    background-color:$btn-bgColor;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    height: 0.48rem;
    margin: 0.32rem 0.4rem 0.16rem;
    border-radius: 0.04rem;
    font-size: 0.16rem;
    line-height: 0.48rem;
    color: $bg-color;
    text-align: center;
  }
  &__register-link {
    font-size: 0.14rem;
    color:$content-notice-fontColor;
    text-align: center;
  }
}
</style>