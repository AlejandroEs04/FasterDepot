export type Link = {
    name: string, 
    url: string
}

export type Product = {
    id: number
    name: string
    description: string 
    price: number 
    wholesalePrice: number 
    image: File | null
    imageUrl: string | null
}

export type ProductRegister = Pick<Product, 'name' | 'price' | 'wholesalePrice' | 'description' | 'image' | 'imageUrl'>

export type Type = {
    ID: number
    name: string 
    description: string
}

export type User = {
    ID: number;
    name: string;
    lastName: string;
    email: string;
    number: string;
    address: string;
    postalCode: string;
    neighborhood: string;
    state: string;
    city: string;
    country: string;
    admin: boolean;
    externNumber: number;
    internNumber: number;
    street: string;
};

export type Alert = {
    isError: boolean
    msg: string
}