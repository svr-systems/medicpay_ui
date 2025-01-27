import store from "@/store";

export default function auth(next = null) {
  const condition = store.state.auth ? true : false;

  if (!next) {
    return condition;
  }

  return condition ? next() : next({ name: "login" });
}
