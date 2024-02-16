import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { DetailComponent } from './pages/detail/detail.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: MainComponent
    },
    {
        path: 'detail',
        component: DetailComponent
    },
    {
        path: 'notfound',
        component: NotfoundComponent
    }
];
