export interface productModel {

    "id":number,
    "name":string,
    "price": number,
    "url": string,
    "description":string,
}

export interface cartItem{
    item:productModel,
    totalCostForItem:number,
    count:number
}

export interface userData{
    name:string;
    address:string;
    credit:string;

}