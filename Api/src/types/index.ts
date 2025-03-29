export type ProductCart = {
    productId: number
    sizeId: number | null 
    stripePriceId?: string
    quantity: number
    pricePerUnit: number 
    buyId: number
}

export type Product = {
    id: number;
    name: string;
    description: string | null;
    categoryId: number | null;
    price: number;
    imageUrl: string | null;
    active: boolean;
    wholesalePrice: number | null;
};

export type Address = {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
}
