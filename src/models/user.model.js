import { users } from "../../storage/data.js"

export function getAllUsers(){
    return users
}

export function createUsers(user){
    user.id = users.length
    users.push(user)
    return user
}