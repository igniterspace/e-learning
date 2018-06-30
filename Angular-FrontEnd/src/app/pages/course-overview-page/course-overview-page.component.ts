import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { CourseService } from '../../services/course/course.service';
import { TeacherService } from '../../services/teacher/teacher.service';
import { AuthService } from '../../services/authentication/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages'; 

@Component({
  selector: 'app-course-overview-page',
  templateUrl: './course-overview-page.component.html',
  styleUrls: ['./course-overview-page.component.css']
})
export class CourseOverviewPageComponent implements OnInit {
  //the id of the selected course will be stored for later use 
  private selectCourseId: String;
  //this stores the substription to the router param
  private routerSubscription: any;

  //this object is used to store the course JSON object retrived from the db 
  private course:any;

  //constructor of CourseOverviewPageComponent
  constructor(private flashMessagesService: FlashMessagesService ,private authService:AuthService ,private route: ActivatedRoute , private courseService:CourseService ,private router:Router ,private teacherService:TeacherService) {}

  /** 
   * ngOnInit() method is called when the component is first loaded
  */
  ngOnInit() {
    //getting the params from the route 
    this.routerSubscription = this.route.params.subscribe(params => {
      this.selectCourseId = params['courseId']; 
      // dispatch action to load the details
      this.courseService.getCourseById(this.selectCourseId).subscribe(res=>{
        this.course=res;
      });   
    });
  }

  /** 
   * ngOnDestroy() method is called when the component is no longer used
  */
  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  /** 
   * addCourse() method is will add a couser id to teachers courses array
  */
  addCourse(){
    this.teacherService.addCourse( this.selectCourseId , this.authService.getCurrentUserId()).subscribe(res=>{
      if(res.state===true){
        this.flashMessagesService.show( res.message , { cssClass: 'alert-success', timeout: 3000 });
      }else{
        this.flashMessagesService.show( res.message , { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
    this.router.navigate(["/teacherdashboard"]);
  }


}
