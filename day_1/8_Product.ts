// 8. Create a Product class with name, price. Create an array of products and filter products with
// price > 100.

// Khởi tạo class Product với từ khóa class với 2 attribute 
class Product {
    name: string
    price: number
}

// Data mẫu với 5 record
const products: Product[] = [
    {name: "1", price: 100},
    {name: "2", price: 200},
    {name: "3", price: 300},
    {name: "4", price: 400},
    {name: "5", price: 500}
]

const filterProductWithPriceGreaterThan = (productList: Product[]): Product[] => {
    return productList.filter((p) => p.price > 100)
}

console.log(filterProductWithPriceGreaterThan(products))