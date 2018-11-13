import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const expensesReducerDefaultState = [];
//Filters actions
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

const setStartDate = (date = 0) => ({
    type:'SET_START_DATE',
    date
});

const setEndDate = (date = 0) => ({
    type: 'SET_END_DATE',
    date
});

//Expenses actions
const addExpense = ({description = '', note = '', amount = 0, createdAt = 0} = {}) => ({
    type: 'ADD_EXPENSE',
    expense : {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

const editExpense = (id , updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

//Expenses reducer
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type){
    case 'ADD_EXPENSE':
        return [...state , action.expense];
    case 'REMOVE_EXPENSE':
        return state.filter(({id}) => id !== action.id);  
    case 'EDIT_EXPENSE':
        return state.map((expense) => {
            if (expense.id === action.id) {
            return {
            ...expense,
            ...action.updates 
            }
            } else {
            return expense;
            };
        });    
    default:
        return state;
    }
};

const filtersReducerDefaultState = {
    text : '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action ) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
        return {
            ...state , 
            text: action.text
        };
        case 'SORT_BY_AMOUNT':
        return {
            ...state,
            sortBy: 'amount'
        }; 
        case 'SORT_BY_DATE':
        return {
            ...state,
            sortBy: 'date'
        };
        case 'SET_START_DATE':
        return {
            ...state,
            startDate: action.date
        };
        case 'SET_END_DATE':
        return {
            ...state,
            endDate: action.date
        };  
        default:
        return state;
    }
};

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

const getVisibleExpenses = (expenses , {text , sortBy , startDate , endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a , b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

store.subscribe(() => {
    const state = store.getState();
    const VisibleExpenses = getVisibleExpenses(state.expenses , state.filters);
    console.log(VisibleExpenses);
});

const expenseOne = store.dispatch(addExpense({description: 'rent' , note: '' , amount: 100, createdAt: 55}));
store.dispatch(addExpense({description: 'pool' , note: '' , amount: 300 , createdAt: 72}));
//store.dispatch(removeExpense({id: expenseOne.expense.id}));
//store.dispatch(editExpense(expenseOne.expense.id , {amount: 500}));
//store.dispatch(setTextFilter('rent'));
store.dispatch(sortByAmount());
//store.dispatch(sortByDate());
//store.dispatch(setStartDate(25));
//store.dispatch(setEndDate(300));

//console.log(expenseOne);
const demoState = {
    expenses : [{
        id:'ahlak',
        description: 'heyo',
        note:'this is the final payment',
        amount: 54500,
        createdAt: 0
    }],
    filters : {
        text: 'rent',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
};

const user = {
    name: 'jen',
    age: 24
};

console.log({
    ...user,
    location:' Burlington',
    age: 27
});