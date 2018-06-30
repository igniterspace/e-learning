import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages'; 
import { GroupService} from "../../../services/group/group.service";
import { TeacherService } from "../../../services/teacher/teacher.service";
import { AuthService } from "../../../services/authentication/auth.service"


@Component({
  selector: 'app-group-course-list',
  templateUrl: './group-course-list.component.html',
  styleUrls: ['./group-course-list.component.css'],
  inputs:['group']
})
export class GroupCourseListComponent implements OnInit {
   //store the group which is comming from the parent component
   private group;
   //stores the array of courses in the group
   private groupCourses;
   //store all the purchased courses of the teacher
   private teachersCourses;
   //this holds the value of the course select
   private courseSelectValue;

  constructor(private flashMessagesService:FlashMessagesService ,private groupService:GroupService ,private teacherService:TeacherService , private authService:AuthService) { }


  ngOnInit() {
    this.loadGroupCoursesList();
    this.loadTeachersCoursesList();
  }

  //this is the method that is called when add couse button is pressed
  onSubmitAddCourse(){
    if(this.courseSelectValue){
      this.groupService.addCourseToGroup( this.courseSelectValue , this.group._id ).subscribe(res=>{
        if(res){
          if(res.state){
            this.flashMessagesService.show( res.message , { cssClass: 'alert-success', timeout: 3000 });
          }else{
            this.flashMessagesService.show( res.message , { cssClass: 'alert-danger', timeout: 3000 });
          }
          this.loadGroupCoursesList();
        }  
      });
    }else{
      this.flashMessagesService.show( "Please select a course to add to the group!" , { cssClass: 'alert-warning', timeout: 3000 });
    }
  }

  //this method poplulates the groupCourses array from data from the db
  loadGroupCoursesList(){
    //getting the group courses
    this.groupService.getAllCourses(this.group._id).subscribe(res=>{
      this.groupCourses=res.courses;
    });
  }

  //this method poplulates the teacher courses array from data from the db
  loadTeachersCoursesList(){
    //getting the teachers all courses
    this.teacherService.getAllCourses(this.authService.getCurrentUserId()).subscribe(res=>{
      this.teachersCourses=res.courses;
    });
  }



}
