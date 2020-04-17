const nm = require("./nm.js")

let threatMatrix = [
  [0.1, 0.08, 0.15, 0.12],
  [0.05, 0.04, 0.03, 0.07],
  [0, 0, 0.05, 0],
  [0.08, 0.15, 0.12, 0.11],
  [0.1, 0.05, 0.06, 0.03],
  [0.12, 0.11, 0.2, 0.06],
  [0.03, 0.05, 0.07, 0.04],
  [0.1, 0.11, 0.05, 0.03],
  [0.05, 0, 0.06, 0],
  [0.02, 0.02, 0.02, 0.02],
  [0.2, 0.25, 0.45, 0.1],
]

const resources = [
  "Вимкнення світла",
  "Крадіжка серверу",
  "Крадіжка комп'ютерів",
  "Пошкодження кабелів",
  "Зараження шкідливим ПЗ",
  "Неправильно налаштовані права доступу",
  "Вихід з ладу системи теплопостачання",
  "Видалення файлів",
  "Помилка у налаштуванні мережі",
  "Удар блискавки",
]

let results = new Array()

threatMatrix = threatMatrix.map((e) => e.map((i) => new nm(i)))

attackProbability = (matrix) => {
  let multi = new nm(1, 0, 0)
  let result = new nm(0, 0, 0)
  for (let i = 0; i < matrix[0].length; i++) {
    for (let j = 0; j < matrix.length - 1; j++) {
      multi = multi.mul(new nm(1, 0, 0).diff(matrix[j][i]))
    }
    result = result.add(
      matrix[matrix.length - 1][i].mul(new nm(1, 0, 0).diff(multi))
    )
    multi = new nm(1, 0, 0)
  }
  return result
}

getRanks = (matrix) => {
  let probability = attackProbability(threatMatrix)
  console.log(probability)
  for (let i = 0; i < matrix.length - 1; i++) {
    let matrixWithoutRow = matrix.slice()
    matrixWithoutRow.splice(i, 1)
    console.log(attackProbability(matrixWithoutRow).m)
    results.push(
      probability
        .diff(attackProbability(matrixWithoutRow))
        .addName(resources[i])
    )
  }
}

sort = (arr) => {
  arr.sort((a, b) => (a.m > b.m ? -1 : 1))
}

showResults = (results) => {
  results.map((e, i) =>
    console.log(`${i + 1}-ий ранг: ${e.name}, ймовірність ${e.m}`)
  )
}

getRanks(threatMatrix)

sort(results)

showResults(results)
