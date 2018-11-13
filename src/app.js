import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import {addExpense} from './actions/expenses';
import getVisibleExpenses from './selectors/expenses';
import {setTextFilter} from './actions/filters';
import configureStore from './store/configureStore';

const store = configureStore();
store.dispatch(addExpense({ description: 'water bill' , amount: 45000 }));
store.dispatch(addExpense({ description: 'Gas bill' , createdAt: 1000}));
store.dispatch(addExpense({ description: 'rent' , amount: 400000 }));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses , state.filters);
console.log(visibleExpenses);

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));