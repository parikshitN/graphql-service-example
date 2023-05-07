import {RESTDataSource} from "@apollo/datasource-rest";

interface User {
    name: String,
    username: String
}

class UsersAPI extends RESTDataSource {
    usersData = [{name: 'Parikshit', username: 'pnavgire'}, {name: 'Ankit', username: 'ak'}]

    users() : User[] {
        return this.usersData;
    }

    findUser(name) : User {
        return this.usersData.find(u => u.name === name) || this.usersData[0];
    }
}

export default UsersAPI
