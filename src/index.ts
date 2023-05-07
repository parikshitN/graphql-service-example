import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import {readFileSync} from "fs";
import StocksAPI from "./datasources/StocksAPI.js";
import UsersAPI from "./datasources/UsersAPI.js";

const stockSchema = readFileSync("src/graphql/stocks/stock.graphql", { encoding: 'utf-8' })
const userSchema = readFileSync("src/graphql/users/user.graphql", { encoding: 'utf-8' })
const stocks = [{name: 'Titan', price: 1000.00}, {name: 'Tata', price: 2000.00}];
const users = [{name: 'Parikshit', username: 'pnavgire'}, {name: 'Ankit', username: 'ak'}]

interface StockContext {
    dataSources: {
        stockAPI: StocksAPI
        usersAPI: UsersAPI
    }
}

const resolvers = {
    Query : {
        stocks: async (parent, args, context, info) => {
            return await context.dataSources.stockAPI.stocks()
        },
        async findStock(parent, args, context, info) {
            //return stocks.find(s => s.name === args.name)
            return await context.dataSources.stockAPI.findStock(args.name)
        },
        users: (parent, args, context, info) => context.dataSources.usersAPI.users(),
        findUser(parent, args, context , info) {
            return context.dataSources.usersAPI.findUser(args.userReq.name)
        }
    }
}

const server = new ApolloServer<StockContext>({typeDefs: [stockSchema, userSchema], resolvers})

const {url} = await startStandaloneServer(server, {
    context: async() => {
        const { cache } = server;
        return {
            dataSources : {
                stockAPI: new StocksAPI({cache}),
                usersAPI: new UsersAPI({cache})
            }
        }
    },
    listen: {port: 4000}}
)

console.log(`listening to ${url}`);





