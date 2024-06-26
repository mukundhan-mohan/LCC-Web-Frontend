import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminEventsComponent } from './admin-events.component';

const routes: Routes = [{ path: '', component: AdminEventsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminEventsRoutingModule { }
