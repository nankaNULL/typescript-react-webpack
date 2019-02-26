import Home from '@/pages/home';
import BookRank from '@/pages/common/bookrank';
import BookRank1 from '@/pages/common/bookRank1';
import BookRank2 from '@/pages/common/bookrank2';
import List from '@/pages/list';

export const routerConf = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/common',
    redirect: '/common/bookRank',
    children: [{
      path: '/bookRank',
      component: BookRank
    },{
      path: '/bookRank1',
      component: BookRank1
    },{
      path: '/bookRank2',
      component: BookRank2
    }]
  },
  {
    path: '/list',
    component: List
  }
];