import { users } from "../../storage/data.js"

export function getAllUsers(){
    return users
}

export function createUsers(user){
    users.push(user)
    return user
}