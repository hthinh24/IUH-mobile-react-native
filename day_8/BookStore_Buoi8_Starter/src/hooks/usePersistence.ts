import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCredentials } from "../store/authSlice";
import { hydrateCart } from "../store/cartSlice";
import { hydrateWishlist } from "../store/wishlistSlice";
import { clearAuth, loadAuth, saveAuth } from "../storage/authStorage";
import { loadJSON } from "../storage/storage";
import { useAutoPersist } from "./useAutoPersist";
import { CartItem } from "../types";

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

    const restoreData = async () => {
      try {
        // Đọc dữ liệu song song; chưa bật ready để tránh ghi đè dữ liệu cũ bằng state rỗng.
        const [auth, savedCart, savedWishlist] = await Promise.all([
          loadAuth(),
          loadJSON<CartItem[]>(CART_KEY),
          loadJSON<number[]>(WISHLIST_KEY),
        ]);

        if (!active) return;

        // BT8.3: khôi phục phiên đăng nhập.
        if (auth?.token && auth?.user) {
          dispatch(setCredentials(auth));
        }

        // BT8.7b: khôi phục giỏ hàng và danh sách yêu thích.
        if (Array.isArray(savedCart)) {
          dispatch(hydrateCart(savedCart));
        }
        if (Array.isArray(savedWishlist)) {
          dispatch(hydrateWishlist(savedWishlist));
        }
      } catch {
        // Storage lỗi thì vẫn cho app khởi động với state mặc định.
      } finally {
        if (active) setReady(true);
      }
    };

    void restoreData();

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

  // BT8.7b: tự lưu mỗi khi Redux cart/wishlist thay đổi sau khi đã hydrate.
  useAutoPersist(CART_KEY, cartItems, ready);
  useAutoPersist(WISHLIST_KEY, wishlistIds, ready);

  return ready;
}
