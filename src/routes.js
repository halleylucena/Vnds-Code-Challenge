import Login from './components/Login/Login.vue'
import Home from './components/home/Home.vue'
import List from './components/list/List.vue'
import Detail from './components/detail/Detail.vue'

export const routes = [
    { path: '', component: Login, titulo: 'Login'},
    { path: '/list', component: List, titulo: 'List'},
    { path: '/detail/:id', name: 'detail', component: Detail, titulo: 'Details'}
]
