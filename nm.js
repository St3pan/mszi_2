class NM {
  constructor(m, a = 0, b = 0) {
    this.m = m
    this.a = a
    this.b = b
  }

  add(obj) {
    const mm = this.m + obj.m
    const aa = this.a + obj.a
    const bb = this.b + obj.b
    return new NM(mm, aa, bb)
  }

  diff(obj) {
    const mm = this.m - obj.m
    const aa = this.a + obj.a
    const bb = this.b + obj.b
    return new NM(mm, aa, bb)
  }

  mul(obj) {
    const mm = this.m * obj.m
    const aa = this.m * obj.a + obj.m * this.a
    const bb = this.m * obj.b + obj.m * this.b
    return new NM(mm, aa, bb)
  }

  pow(n) {
    let M = this.m
    let A = this.a
    let B = this.b
    for (let i = 1; i < n; i++) {
      A = this.m * A + M * this.a
      B = this.m * B + M * this.b
      M *= this.m
    }
    return new NM(M, A, B)
  }
}

module.exports = NM
