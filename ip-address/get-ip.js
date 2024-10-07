const address = require('address')

const ip = address.ip()
console.log(`Su dirección IP es: ${ip}`)

const add = address.address((a) => {
  const ip = a.message
  console.log(ip)
})

console.log(add)
