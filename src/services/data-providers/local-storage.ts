const methods = {
  get(key) {
    return localStorage.getItem(key)
  },
  set(key, value) {
    return localStorage.setItem(key, value)
  },
  remove(key) {
    return localStorage.removteItem(key)
  }
}

export default methods
