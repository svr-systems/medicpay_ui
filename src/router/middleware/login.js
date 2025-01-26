import store from "@/store";

export default function login(next) {
  return store.state.auth ? next({ name: "home" }) : next();
}
