export interface Subcategory {
    name: string;
    description: string;
    category: { 
        _id: string; 
        name: string;
    };
    urlImage: string;
    _id: string;
}
