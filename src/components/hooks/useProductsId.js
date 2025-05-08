import useSWR from 'swr';
import {fetcher} from '../utils/fetch';


const useProducts = (productId) => {

    const {data: products, error, isLoading} = useSWR(`https://fakestoreapi.com/products/${productId}`, fetcher)
    console.log(products)
    return {
        data: products,
        error,
        isLoading
    };
}

export default useProducts;
