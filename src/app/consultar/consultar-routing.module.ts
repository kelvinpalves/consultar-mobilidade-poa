import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import {
    ConsultarComponent
} from './components';

export const ConsultarRoutes: Routes = [
    {
        path: 'consultar/:tipoConsulta',
        component: ConsultarComponent
    },
    {
        path: 'consultar/:tipoConsulta',
        component: ConsultarComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(ConsultarRoutes)
    ],
    exports: [RouterModule]
})

export class ConsultarRoutingModule {
}
