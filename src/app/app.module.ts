import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FileSelectDirective } from 'ng2-file-upload';
import { UserService } from './user.service';
import { MissionService } from './mission.service';
import { PushService } from './push.service';
import { ReplyService } from './reply.service';
import { FrontPageComponent } from './front-page/front-page.component';
import { ShowMissionComponent } from './show-mission/show-mission.component';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { MissionComponent } from './mission/mission.component';
import { MissionUploadComponent } from './mission-upload/mission-upload.component';
import { SettingComponent } from './setting/setting.component';
import { NgxStripeModule } from 'ngx-stripe';



@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SignUpComponent,
    DashboardComponent,
    ProfileComponent,
    MissionComponent,
    FrontPageComponent,
    ShowMissionComponent,
    MissionUploadComponent,
    FileSelectDirective,
    SettingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxStripeModule.forRoot('pk_test_vC4PtpR0fskwCoe8w0DznKm7'),
    ReactiveFormsModule
  ],
  providers: [ UserService, MissionService, PushService, ReplyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
