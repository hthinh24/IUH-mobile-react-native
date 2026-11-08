import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCredentials } from "../store/authSlice";
import { hydrateCart } from "../store/cartSlice";
import { hydrateWishlist } from "../store/wishlistSlice";
import { clearAuth, loadAuth, saveAuth } from "../storage/authStorage"; // đã viết sẵn
import { loadJSON } from "../storage/storage"; // đã viết sẵn
import { useAutoPersist } from "./useAutoPersist";
import { CartItem } from "../types"; // dùng khi đọc loadJSON<CartItem[]>

export const CART_KEY = "@bookstore/cart";
export const WISHLIST_KEY = "@bookstore/wishlist";

// Mở app → nạp dữ liệu đã lưu; sau đó mọi thay đổi tự ghi lại. App.tsx chỉ hiện màn hình chính khi ready = true.
export function usePersistence() {
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);
  const user = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);
  const cartItems = useAppSelector((s) => s.cart.items);
  const wishlistIds = useAppSelector((s) => s.wishlist.ids);

  useEffect(() => {
    let active = true;

    const restoreSession = async () => {
      try {
        // BT8.3: khôi phục phiên đăng nhập trước khi hiển thị ứng dụng.
        const auth = await loadAuth();
        if (auth?.token && auth?.user) {
          dispatch(setCredentials(auth));
        }

        // BT8.7b: đọc giỏ hàng và yêu thích tại đây.
      } finally {
        if (active) setReady(true);
      }
    };

    void restoreSession();

    return () => {
      active = false;
    };
  }, [dispatch]);

  useEffect(() => {
    if (!ready) return;

    // BT8.3: lưu phiên khi đã đăng nhập, xóa phiên khi đăng xuất.
    if (user && token) {
      void saveAuth({ user, token });
    } else {
      void clearAuth();
    }
  }, [ready, user, token]);

  // TODO BT8.7b: gọi useAutoPersist(CART_KEY, cartItems, ready) và useAutoPersist(WISHLIST_KEY, wishlistIds, ready)

  return ready;
}
