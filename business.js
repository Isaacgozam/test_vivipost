module.exports = function processData(data) {
    // Now you can use the data variable here
    // console.log(data);
    for (var index = 0; index < data.length ; index++) {
        for (var p_index = 0; p_index < data[index].products.length ; p_index++) {
            // WEIGHT classification
            // If the product weights less than 0.3kg the product is free.
            // For each whole 100g increment the price by $0.5.
            var weight = data[index].products[p_index].weight
            if (weight < 300) {
                data[index].products[p_index].price = 0.0
            } else {
                let incrementos = Math.floor(weight/100)
                let extra_price = incrementos * 0.5
                let prev_price = data[index].products[p_index].price
                let new_price = data[index].products[p_index].price + extra_price
                data[index].products[p_index].price = parseFloat(new_price.toFixed(2))
                console.log("New price modified by weight for id " + data[index].products[p_index].id_product +
                " from " + prev_price + " to " + data[index].products[p_index].price +
                " (" + weight + "g)")
            }
            // TIER classification
            //     The products are spearated in different Tiers based on their volume.
            //     - Tier 1: 0cm^3 - 5,000cm^3
            //     - Tier 2: 5,001cm^3 - 10,000cm^3
            //     - Tier 3: 10,001cm^3 - 15,000cm^3
            // ... and so on
            //     The base extra cost for Tier 1 is $0.1 and each subsequent Tier multiply the cost
            //     from the previous Tier by a factor of 1.2.
            //         Ex. Tier 1: $0.1, Tier 2: $0.12, Tier 3: $0.144...
            let height = data[index].products[p_index].height
            let length = data[index].products[p_index].length
            let width = data[index].products[p_index].width
            let vol = height * length * width
            let tier = Math.round(vol/5000) + 1
            let prev_price = data[index].products[p_index].price
            let tier_price = 0.1
            if (tier > 1) {
                for (let e = 2; e <= tier; ++e) {
                    tier_price = tier_price * 1.2
                }
            }
            let new_price = data[index].products[p_index].price + tier_price
            data[index].products[p_index].price = parseFloat(new_price.toFixed(2))
            console.log("** New price modified by tier for id " + data[index].products[p_index].id_product +
            " from " + prev_price + " to " + data[index].products[p_index].price +
            " (tier " + tier + ")")
        }
    }
};