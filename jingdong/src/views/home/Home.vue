<template>
    <div class="wrapper">
      <StaticPart />
      <Nearby />
    </div>
    <Docker :currentIndex="0" />
</template>
<script>
import Docker from "../../components/Docker.vue";
import Nearby from "./Nearby";
import StaticPart from "./StaticPart";
export default {
  name: "Home",
  components: { StaticPart, Nearby, Docker },
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
  padding: 0 0.18rem 0.2rem 0.18rem;
}
.gap {
  height: 0.1rem;
  background-color: $content-bgColor;
  margin: 0 -0.18rem;
}
</style>
