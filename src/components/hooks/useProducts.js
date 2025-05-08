import useSWR from 'swr';
import {fetcher} from '../utils/fetch';


const useProducts = () => {

    const {data: products, error, isLoading} = useSWR('https://fakestoreapi.com/products', fetcher)
    console.log(products)
    return {
        data: products,
        error,
        isLoading
    };
}

export default useProducts;
