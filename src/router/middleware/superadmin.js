import store from "@/store";

export default function superadmin(next = null) {
  let auth = store.getters.getAuth;
  const condition = auth && auth.user.role_id == 1 ? true : false;

  if (!next) {
    return condition;
  }

  return condition ? next() : next({ name: "unauthorized" });
}
