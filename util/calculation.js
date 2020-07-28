// 实现加减乘除运算，确保不丢失精度

/*
   * 判断obj是否为一个整数
   */
function isInteger(obj) {
  // console.log("Math.floor-----",Math.floor(obj))
  return Math.floor(obj) === obj
}

/*
   * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
   * @param floatNum {number} 小数
   * @return {object}
   *   {times:100, num: 314}
   */
function toInteger(floatNum) {
  var ret = { times: 1, num: 0 }
  if (isInteger(floatNum)) {
    // console.log("floatNum-----",floatNum)
    ret.num = floatNum
    return ret
  }

  var strfi = floatNum + ''
  // console.log("ret--------",ret,strfi)
  var dotPos = strfi.indexOf('.')
  // console.log("dotPos-----",dotPos)
  var len = strfi.substr(dotPos + 1).length
  // console.log("len------",len)
  var times = Math.pow(10, len)

  var intNum = parseInt(floatNum * times + 0.5, 10)
  ret.times = times
  ret.num = intNum
  // console.log("ret------",ret)
  return ret
}

/*
   * 核心方法，实现加减乘除运算，确保不丢失精度
   * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
   *
   * @param a {number} 运算数1
   * @param b {number} 运算数2
   * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
   *
   */
function operation(a, b, op) {
  var o1 = toInteger(a)
  // console.log("o1-----",o1)
  var o2 = toInteger(b)
  // console.log("o2-----",o2)
  var n1 = o1.num
  var n2 = o2.num
  var t1 = o1.times
  var t2 = o2.times

  var max = t1 > t2 ? t1 : t2
  var result = null
  switch (op) {
    case 'add':
      if (t1 === t2) { // 两个小数位数相同
        result = n1 + n2
      } else if (t1 > t2) { // o1 小数位 大于 o2
        // console.log("t1--------",n1,n2)
        result = n1 + n2 * (t1 / t2)
      } else { // o1 小数位 小于 o2
        result = n1 * (t2 / t1) + n2
      }
      return result / max
    case 'subtract':
      if (t1 === t2) {
        result = n1 - n2
      } else if (t1 > t2) {
        result = n1 - n2 * (t1 / t2)
      } else {
        result = n1 * (t2 / t1) - n2
      }
      return result / max
    case 'multiply':
      result = (n1 * n2) / (t1 * t2)
      return result
    case 'divide':
      result = (n1 / n2) * (t2 / t1)
      return result
  }
}

// 加减乘除的四个接口
function add(a, b) {
  return operation(a, b, 'add')
}

function subtract(a, b) {
  return operation(a, b, 'subtract')
}

function multiply(a, b) {
  return operation(a, b, 'multiply')
}

function divide(a, b) {
  return operation(a, b, 'divide')
}

function getValue(money) {
  var value = money + ''
  const index = value.indexOf('.')

  if (index !== -1) {
    const len = value.length - (index + 1)
    if (len === 1) {
      value = value + '0'
    } else if (len > 2) {
      value = divide(Math.round(multiply(value, 100)), 100)
      value = getValue(value)
    }
  } else {
    value = value + '.00'
  }
  return value
}
function getValueThree(money) {
  var value = money + ''
  const index = value.indexOf('.')

  if (index !== -1) {
    const len = value.length - (index + 1)
    if (len === 1) {
      value = value + '00'
    } else if (len === 2) {
      value = value + '0'
    }
  } else {
    value = value + '.000'
  }
  return value
}
const filterInt = value => {
  // 转数字为字符串
  if (Object.prototype.toString.call(value) === '[object Number]') {
    value = value.toString()
  }
  const index = value.indexOf('.')
  if (index !== -1) {
    return value.substring(0, index)
  }
}
const filterFloat = value => {
  // 转数字为字符串
  if (Object.prototype.toString.call(value) === '[object Number]') {
    value = value.toString()
  }
  const index = value.indexOf('.')
  if (index !== -1) {
    return value.substring(index, value.length)
  }
}
export default {
  add: add,
  subtract: subtract,
  multiply: multiply,
  divide: divide,
  getValue,
  getValueThree,
  filterInt,
  filterFloat
}
