import { users } from "../../storage/data.js"

export function getAllUsers(){
    return users
}

export function createUsers(user){
    user.id = users.length
    users.push(user)
    return user
}

export function deleteUser(id){
    const index = users.findIndex(user, index => user.id === parseInt(id))
    const deletedUser = users[index]
    users.splice(index, 1)
    return deletedUser
}

export function updateUsers(newUserData){
    const user = users.find(user, index => user.id === parseInt(newUserData.id))
    if(!user){
        return null
    }
    users[user.id] = newUserData
}