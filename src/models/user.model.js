import { users } from "../../storage/data.js"

function getAllUsers(){
    return users
}

function createUsers(user){
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

function updateUsers(newUserData){
    const user = users.find(user, index => user.id === parseInt(newUserData.id))
    if(!user){
        return null
    }
    users[user.id] = newUserData
}

export {getAllUsers, createUsers, deleteUser, updateUsers}