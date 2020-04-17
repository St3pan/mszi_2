class NM {
  constructor(m, a = 0.001, b = 0.002, name) {
    this.m = +m.toFixed(6)
    this.a = +a.toFixed(6)
    this.b = +b.toFixed(6)
    if (name) {
      this.name = name
    }
  }

  addName(name) {
    return new NM(this.m, this.a, this.b, name)
  }

  add(obj) {
    return new NM(this.m + obj.m, this.a + obj.a, this.b + obj.b)
  }

  diff(obj) {
    return new NM(this.m - obj.m, this.a + obj.a, this.b + obj.b)
  }

  mul(obj) {
    return new NM(
      this.m * obj.m,
      this.m * obj.a + obj.m * this.a,
      this.m * obj.b + obj.m * this.b
    )
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
