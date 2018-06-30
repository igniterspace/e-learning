import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router"
import { AuthService } from '../../../services/authentication/auth.service';
import { TeacherService } from '../../../services/teacher/teacher.service';
import { StudentService } from '../../../services/student/student.service';


@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  //to store the array of courses the teacher owns
  private courses:any;
  //to store th type of user
  private userType;

  constructor(private router:Router , private authService:AuthService ,private teacherService:TeacherService , private studentService:StudentService ) { }

  ngOnInit() {
    this.userType=this.authService.getUserType();
    setTimeout(()=>{this.loadAllCourses(this.userType)},100);
  }

  /**
   * loadAllCourses() will get the array of courses which the teacher owns and set the courses array variable 
   */
  loadAllCourses(userType){
    if(userType==="Student"){
      this.studentService.getAllCourses(this.authService.getCurrentUserId()).subscribe(res=>{
        this.courses=res.courses;
      });
    }
    if(userType==="Teacher"){
      this.teacherService.getAllCourses(this.authService.getCurrentUserId()).subscribe(res=>{
        this.courses=res.courses;
      });
    }
  }

}
