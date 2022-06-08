export interface Table{
    name:string;
    javaContext:string;
    count:number;
    column:field[];
}
export interface field{
    name:string;
    typeName:string;
    type:number;
    pk:boolean;
}