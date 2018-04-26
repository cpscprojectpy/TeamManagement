interface UserInput{
    indentity:string,
    operation:Operation   
}
interface Operation{
    operation_name:string,
    tables:string[],
    condition: Condition
}
interface Condition{

}