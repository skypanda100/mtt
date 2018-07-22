import {service} from '@/libs/request';

export function fetchNutritions () {
    return service({
        method: 'get',
        url: 'nutritions'
    });
}

export function fetchFoods () {
    return service({
        method: 'get',
        url: 'foods'
    });
}

export function fetchOrders (params) {
    return service({
        method: 'get',
        url: 'orders',
        params: params
    });
}

export function saveOrders (params) {
    return service({
        method: 'put',
        url: 'orders',
        data: params
    });
}
