import { Component, OnInit } from '@angular/core';
import { CourseService} from '../../../services/course/course.service';

@Component({
  selector: 'app-course-activities',
  templateUrl: './course-activities.component.html',
  styleUrls: ['./course-activities.component.css'],
  inputs:['course']
})
export class CourseActivitiesComponent implements OnInit {

  //to store the coure passed in from the parent object
  private course;
  private completedActivities;

  constructor(private courseService:CourseService) {
  }

  ngOnInit() {
    this.loadCompletedActivitiesArray();
  }

  /**
   * loadCompletedActivitiesArray() method will get all the ids of te completed activities and set the array
   */
  loadCompletedActivitiesArray(){
    this.courseService.getCompletedActivities(this.course._id).subscribe(res=>{
      this.completedActivities = res;
    });
  }

}
