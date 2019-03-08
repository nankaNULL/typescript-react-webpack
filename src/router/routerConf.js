import Home from '@/pages/home';
import BookRank from '@/pages/common/bookrank';
import BookRank1 from '@/pages/common/bookRank1';
import BookRank2 from '@/pages/common/bookrank2';
import List from '@/pages/list';
import MainLayout from '@/layout/mainLayout';
import CommonLayout from '@/layout/commonLayout';

export const routerConf = [
  {
    path: '/home',
    component: Home,
    layout: MainLayout
  },
  {
    path: '/common',
    redirect: '/common/bookRank',
    children: [{
      path: '/bookRank',
      component: BookRank,
      layout: CommonLayout
    },{
      path: '/bookRank1',
      component: BookRank1,
      layout: CommonLayout
    },{
      path: '/bookRank2',
      component: BookRank2,
      layout: CommonLayout
    }]
  },
  {
    path: '/list',
    component: List,
    layout: MainLayout
  }
];