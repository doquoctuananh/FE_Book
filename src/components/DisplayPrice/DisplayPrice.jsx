function DisplayPrice({price}) {
    const parsePrice = parseFloat(price);
    const formatPrice = parsePrice.toLocaleString("vi-Vn",{
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    })
    return ( <>
        {formatPrice}
    </> );
}

export default DisplayPrice;