const FavouriteData = () => import('@/view/FavouriteData.vue')
const Data = () => import('@/App.vue')

export default {
    path: 'task',
    redirect: 'fav_data/index',
    beforeEnter(to, from, next) {
        next()
    },
    children: [
        {
            path: 'task',
            component: Data,
        },
        {
            path: 'fav_data/index',
            component: FavouriteData,
            
        },
    ]

}