import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../services/course/course.service';


@Component({
  selector: 'app-activity-end',
  templateUrl: './activity-end.component.html',
  styleUrls: ['./activity-end.component.scss'],
  inputs:['activity','courseId']
})
export class ActivityEndComponent implements OnInit {
  //store the activity and courseId passed from the parent
  private activity;
  private nextActivity;
  private courseId;

  //all course activities
  private courseActivities;


  constructor( private courseService : CourseService ) { }

  ngOnInit() {
    this.loadAllCourseActivities();
  }

  //TODO - complete
  completeActivity(){
    this.courseService.addActivityIdToStudent(this.courseId,this.activity._id).subscribe(res=>{
    });
  }

  loadAllCourseActivities(){
   this.courseService.getCourseById(this.courseId).subscribe(res=>{
     this.courseActivities=res.activities;

    const index= this.courseActivities.findIndex(activityTemp=>{
       return activityTemp._id.toString() === this.activity._id.toString();
     });

     console.log(index);

   });
  }

}
