import { jwtDecode } from "jwt-decode";

export const checkTokenExpiration = (token) => {
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token); // Giải mã token
    const expirationTime = decodedToken.exp;
    const currentTime = Math.floor(Date.now() / 1000); // thời gian hiện tại tính bằng giây

    // Kiểm tra nếu token đã hết hạn
    return expirationTime < currentTime;
  } catch (error) {
    console.error("Token không hợp lệ", error);
    return true; // Nếu có lỗi, coi như token đã hết hạn
  }
};
