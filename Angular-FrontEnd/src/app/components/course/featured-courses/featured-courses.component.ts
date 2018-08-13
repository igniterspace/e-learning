import { Component, OnInit } from '@angular/core';
import { CourseService } from "../../../services/course/course.service";

@Component({
  selector: 'app-featured-courses',
  templateUrl: './featured-courses.component.html',
  styleUrls: ['./featured-courses.component.css']
})
export class FeaturedCoursesComponent implements OnInit {

  private courses:any;

  constructor(private courseService:CourseService) { }

  ngOnInit() {
    this.loadAllCourses();

  }

  loadAllCourses(){
    this.courseService.getAllCourses().subscribe((res)=>{
      this.courses=res;
      // console.log(res);
    });
  }
}
