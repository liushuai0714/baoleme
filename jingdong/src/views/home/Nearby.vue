<template>
  <div class="gap"></div>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <ShopInfo
      v-for="item in nearbyList"
      :key="item._id"
      :item="item"
      @click="handleToShop(item._id)"
    />
  </div>
</template>

<script>
import {useRouter} from "vue-router";
import ShopInfo from "../../components/ShopInfo";
import { ref } from "vue";
import { get } from "../../utils/request";

const useNearbyListEffect = () => {
  const nearbyList = ref([]);
  const getNearbyList = async () => {
    const result = await get("/api/shop/hot-list");
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data;
    }
  };
  return { nearbyList, getNearbyList };
};
export default {
  name: "Nearby",
  components: { ShopInfo },
  setup() {
    const router = useRouter();
    const { nearbyList, getNearbyList } = useNearbyListEffect();
    getNearbyList();
    const handleToShop = (item) => {
      router.push({ name: "Shop", params: {id: item}});
    };
    return { nearbyList, handleToShop };
  },
};
</script>

<style lang="scss" scoped>
.nearby {
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
  }
}
</style>