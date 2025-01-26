import store from "@/store";

export default function auth(next) {
  return store.state.auth ? next() : next({ name: "login" });
}
