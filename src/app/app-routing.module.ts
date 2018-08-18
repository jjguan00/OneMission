import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { ProfileComponent } from './profile/profile.component';
import { MissionComponent } from './mission/mission.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { ShowMissionComponent } from './show-mission/show-mission.component';
import { MissionUploadComponent } from './mission-upload/mission-upload.component';
import { SettingComponent} from './setting/setting.component';
import { SuccessComponent } from './setting/success/success.component'


const routes: Routes = [
	{path: "", component: DashboardComponent, children:[
		{path: "", component: FrontPageComponent },
		{path: "profile/:id", component: ProfileComponent},
		{path: "mission", component: MissionComponent},
		{path: "mission/:id", component: ShowMissionComponent },
		{path: "mission-upload/:id", component: MissionUploadComponent },
		{path: "setting/:id", component: SettingComponent},
		{path: "success", component:SuccessComponent}
	]},
	{path: "login", component: LogInComponent},
	{path: "signup", component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
