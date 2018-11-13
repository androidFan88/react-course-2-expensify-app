import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";
import { createStore , combineReducers } from 'redux';

export default () => {
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

return store;
};
