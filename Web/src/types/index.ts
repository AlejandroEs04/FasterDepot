export type Link = {
    name: string, 
    url: string
}

export type Alert = {
    isError: boolean
    msg: string
}

export type User = {
    id: number
    name: string 
    lastName: string 
    email: string
    number: string
    address: string
    state: string
    city: string
    country: string
    admin: boolean
}

export type Address = {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
}

export type Size = {
    id: number;
    name: string;
    letter: string;
};
  
export type ProductSize = {
    id: number;
    productId: number;
    sizeId?: number;
    size?: Size;
};
  
export type Category = {
    id: number;
    name: string;
    description: string;
};
  
export type Product = {
    id: number;
    name: string;
    description: string;
    categoryId: number | null;
    price: number;
    wholesalePrice: number;
    imageUrl?: string;
    active: boolean;
    sizes: ProductSize[];
    category: Category | null;
};

export type Cart = {
    productId: Product['id']
    quantity: number 
    sizeId?: number | null
}

export type Buy = {
    id: number
    email: string
    amount: number 
    date: string
    status: string
    productBuy: ProductBuy[]
}

export type ProductBuy = {
    id: number
    buyId: number 
    productId: number 
    quantity: number 
    pricePerUnit: number 
    product: Product
    sizeId: number
}