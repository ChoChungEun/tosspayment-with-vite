import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// base 를 tosspayment-with-vite 해놓으니까 에러발생하고
// 초기 라우터 path 를 path: "/tosspayment-with-vite", 이렇게 해야하는데
// 방법 찾아보자
export default defineConfig({
  base: "tosspayment-with-vite",
  plugins: [react()],
});
