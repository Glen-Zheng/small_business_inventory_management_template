// hooks/useAuth.js
import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  authSuccess,
  setStoreLocation,
} from "@/store_redux/slices/storeUserSlice";
import { destroyLoggedin } from "@/store_redux/slices/storeUserSlice";
import { emptyCart } from "@/store_redux/slices/cartSlice";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const router = useRouter();
  // const store_selected = useSelector(
  //   (state) => state.storeLocation.storeLocation
  // );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadUserFromCookie() {
      // const params = new URLSearchParams({ store_selected });

      // const response = await fetch(`/api/stores/user?${params.toString()}`);
      const response = await fetch(`/api/stores/user`);

      if (response.ok) {
        const userData = await response.json();
        dispatch(authSuccess(userData.store_location));
        // dispatch(setStoreLocation(userData.store_location));

        // router.push("/shop");
      }
      setLoading(false);
    }
    // if(store_selected)
    //do i need to restric this useEffect from running? in mmy get request for the token, i only allow it if the store selected is the same as the token, AS THAT IS THE WHOLE PURPOSE OF TOKENS IIN MY CASE so i don't need to. at the same time, if there is currently a
    loadUserFromCookie();
  }, [dispatch]);
  // }, [dispatch, router]);

  const login = async (sl, storePassword) => {
    const response = await fetch("/api/stores/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        storeLocation: sl,
        password: storePassword,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      // setUser(data.store_id);
      dispatch(authSuccess(sl));
    }
    return { ok: response.ok, data };
  };

  //   const login = async (email, password) => {
  //     const response = await fetch("/api/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     if (response.ok) {
  //       const userData = await response.json();
  //       setUser(userData);
  //       router.push("/dashboard");
  //     } else {
  //       throw new Error("Login failed");
  //     }
  //   };

  const logout = async () => {
    await fetch("/api/stores/logout", { method: "POST" });
    dispatch(destroyLoggedin());
    dispatch(emptyCart());
  };

  //can return user.

  return { loading, user: user, login, logout };
}
