import { users } from "../../storage/data.js"

function getAllUsers(){
    return users
}

function createUser(user){
    user.id = users.length
    users.push(user)
    return user
}

function deleteUser(id){
    const index = users.findIndex(user, index => user.id === parseInt(id))
    const deletedUser = users[index]
    users.splice(index, 1)
    return deletedUser
}

function updateUser(newUserData){
    const user = users.find(user, index => user.id === parseInt(newUserData.id))
    console.log(user)
    if(!user){
        return null
    }
    users[user.id] = newUserData
}

export {getAllUsers, createUser, deleteUser, updateUser}