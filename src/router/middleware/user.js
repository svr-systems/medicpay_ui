import store from "@/store";

export default function user(next) {
  return store.state.auth &&
    (store.state.auth.user.role_id == 1 ||
      store.state.auth.user.role_id == 2 ||
      store.state.auth.user.role_id == 3)
    ? next()
    : next({ name: "unauthorized" });
}
