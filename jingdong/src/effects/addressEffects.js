import { reactive, toRefs } from "vue";
import { get } from "../utils/request";
export const useGetAddressEffect = () => {
    const data = reactive({ list: [] });
    const getAddress = async () => {
      const result = await get('/api/user/address');
      if (result?.errno === 0 && result?.data?.length) {
        data.list = result.data;
      }
    };
    getAddress();
    const { list } = toRefs(data);
    return { list };
  };