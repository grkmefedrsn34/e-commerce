export interface Order{
    id:number
    orderDate: Date
    firstName:string
    lastName:string
    phone:string
    city:string
    addresLine:string
    customerID:string
    orderStatus:number
    orderItems:OrderItem[]
    subTotal:number
    deliveryFree:number
}

export interface OrderItem{
    ID:number
    ProductID:number
    ProductName:string
    ProductImage:string
    price:number
    Quantity:number
}