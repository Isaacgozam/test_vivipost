let height = 40
let length = 150
let width = 80
let vol = height * length * width
console.log(vol)
let tier = Math.ceil(vol/5000)
console.log(tier)
let prev_price = 61.2
let tier_price = 0.1
if (tier > 1) {
    for (let e = 2; e <= tier; ++e) {
        tier_price = tier_price * 1.2
        console.log(tier_price + " -- " + e)
    }
}
console.log(tier_price)