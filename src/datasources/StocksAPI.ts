import {RESTDataSource} from "@apollo/datasource-rest";

interface Stock {
    name: String,
    price: Number
}

class StocksAPI extends RESTDataSource {
    override baseURL = 'http://localhost:3000';

    async stocks () : Promise<Stock[]> {
        return this.get<Stock[]>('stocks');
    }

    async findStock (name) : Promise<Stock> {
        return (await this.get<Stock[]>('stocks'))
            .find(s => s.name == name);
    }
}

export default StocksAPI
