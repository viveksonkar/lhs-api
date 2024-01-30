import Category from "@/interfaces/category.interface";

export interface ReferenceData {
    productNames: Array<String>;
    brands: Array<string>;
    categories: Array<Category>;
}