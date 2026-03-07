export default function getFormattedPrice(price) {
    
    //is price is a valid nymber
    if (price == null){
        return "N/A"; // Return "N/A-(not a number)" if price is null or undefined
    }
    const priceInNumber = Number(price);
    if (isNaN(priceInNumber)) {
        return "N/A";   
    }
    else{
        return "LKR " + priceInNumber.toLocaleString("en-US", {minimumFractionDigits:2, maximumFractionDigits:2});
    }
}


