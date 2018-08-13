import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule ,Routes} from '@angular/router'
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';

//All Components
import { AppComponent } from './app.component';
import { NavbarComponent } from '../app/components/common/navbar/navbar.component';
import { LoginComponent } from '../app/components/common/login/login.component';
import { RegisterComponent } from '../app/components/common/register/register.component';
import { ProfileComponent } from '../app/components/common/profile/profile.component'
import { CourseSmallPreviewComponent } from '../app/components/course/course-small-preview/course-small-preview.component';
import { MyCoursesComponent } from '../app/components/course/my-courses/my-courses.component';
import { GroupStudentListComponent } from '../app/components/teacher/group-student-list/group-student-list.component';
import { GroupCourseListComponent } from '../app/components/teacher/group-course-list/group-course-list.component';
import { MyGroupsComponent } from '../app/components/group/my-groups/my-groups.component';
import { GroupSmallPreviewComponent } from '../app/components/group/group-small-preview/group-small-preview.component';
import { FeaturedCoursesComponent } from '../app/components/course/featured-courses/featured-courses.component';
import { ActivityIntroductionComponent } from '../app/components/course/activity/activity-introduction/activity-introduction.component';
import { ActivityGoalsComponent } from '../app/components/course/activity/activity-goals/activity-goals.component';
import { ActivityMeterialRequiredComponent } from '../app/components/course/activity/activity-meterial-required/activity-meterial-required.component';
import { ActivityBuildingGoalsComponent } from '../app/components/course/activity/activity-building-goals/activity-building-goals.component';
// import { ActivityImageUploadComponent } from '../app/components/course/activity/activity-image-upload/activity-image-upload.component';
import { ActivityEndComponent } from '../app/components/course/activity/activity-end/activity-end.component';

//header components
import { HomeHeaderComponent } from '../app/components/headers/home-header/home-header.component';
import { AllCoursesHeaderComponent } from '../app/components/headers/all-courses-header/all-courses-header.component';


//Page Components
import { HomePageComponent } from '../app/pages/home-page/home-page.component';
import { StudentDashboardPageComponent } from '../app/pages/student-dashboard-page/student-dashboard-page.component';
import { LoginPageComponent } from '../app/pages/login-page/login-page.component';
import { TeacherDashboardPageComponent } from '../app/pages/teacher-dashboard-page/teacher-dashboard-page.component';
import { AllCoursesPageComponent } from '../app/pages/all-courses-page/all-courses-page.component';
import { RegisterPageComponent } from '../app/pages/register-page/register-page.component';
import { CourseOverviewPageComponent } from '../app/pages/course-overview-page/course-overview-page.component';
import { TeacherEditGroupPageComponent } from '../app/pages/teacher-edit-group-page/teacher-edit-group-page.component';
import { ListActivitiesPageComponent } from '../app/pages/list-activities-page/list-activities-page.component';
import { CourseTinyPreviewComponent } from '../app/components/course/course-tiny-preview/course-tiny-preview.component';
import { CourseActivitiesComponent } from '../app/components/course/course-activities/course-activities.component';
import { ActivitySmallPreviewComponent } from '../app/components/course/activity-small-preview/activity-small-preview.component';
import { DoActivityPageComponent } from '../app/pages/do-activity-page/do-activity-page.component';


//All Services
import { AuthService }  from "../app/services/authentication/auth.service";
import { CourseService  }  from "../app/services/course/course.service";
import { AuthGuard  }  from "../app/services/authentication/auth.gaurd";
import { TeacherService  }  from "../app/services/teacher/teacher.service";
import { GroupService  }  from "../app/services/group/group.service";
import { StudentService  }  from "../app/services/student/student.service";
import { ActivityImageUploadComponent } from './components/course/activity/activity-image-upload/activity-image-upload.component';


//defining the routes of the app
const applicationRoutes:Routes =[
  {path : 'login' ,component :LoginPageComponent},
  {path : 'register' ,component :RegisterPageComponent},
  {path : 'profile' ,component :ProfileComponent , canActivate: [AuthGuard]},
  {path : 'courses' ,component :AllCoursesPageComponent},
  {path : 'teacherdashboard' , component :TeacherDashboardPageComponent},
  {path : 'teacherdashboard/editgroup/:groupId' ,component :TeacherEditGroupPageComponent},
  {path : 'studentdashboard' ,component :StudentDashboardPageComponent},
  {path : 'courseoverview/:courseId' ,component :CourseOverviewPageComponent},
  {path : 'activities/:courseId' ,component : ListActivitiesPageComponent},
  {path : 'doactivity/:activityId/:courseId' ,component : DoActivityPageComponent},
  {path : 'unauthorized', component: LoginComponent },
  {path : '', component: HomePageComponent }  

  
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomePageComponent,
    StudentDashboardPageComponent,
    LoginPageComponent,
    TeacherDashboardPageComponent,
    AllCoursesPageComponent,
    RegisterPageComponent,
    CourseSmallPreviewComponent,
    CourseOverviewPageComponent,
    MyCoursesComponent,
    GroupSmallPreviewComponent,
    MyGroupsComponent,
    TeacherEditGroupPageComponent,
    GroupStudentListComponent,
    GroupCourseListComponent,
    ListActivitiesPageComponent,
    CourseTinyPreviewComponent,
    CourseActivitiesComponent,
    ActivitySmallPreviewComponent,
    DoActivityPageComponent,
    HomeHeaderComponent,
    FeaturedCoursesComponent,
    AllCoursesHeaderComponent,
    ActivityIntroductionComponent,
    ActivityGoalsComponent,
    ActivityMeterialRequiredComponent,
    ActivityBuildingGoalsComponent,
    ActivityEndComponent,
    ActivityImageUploadComponent,
   
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(applicationRoutes),
    FlashMessagesModule
    
  ],
  providers: [AuthService,AuthGuard,CourseService,TeacherService,GroupService,StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
