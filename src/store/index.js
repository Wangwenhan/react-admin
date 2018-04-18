import { createStore } from 'redux'
import todoApp from './../reducers/todo'

const store = createStore(todoApp)