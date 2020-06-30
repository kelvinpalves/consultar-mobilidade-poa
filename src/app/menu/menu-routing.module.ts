import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import {
    MenuComponent
} from './components';

export const MenuRoutes: Routes = [
    {
        path: 'inicio',
        component: MenuComponent,
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(MenuRoutes)
    ],
    exports: [RouterModule]
})

export class MenuRoutingModule {
}
