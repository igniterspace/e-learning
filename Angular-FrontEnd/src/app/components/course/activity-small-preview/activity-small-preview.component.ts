import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';


@Component({
  selector: 'app-activity-small-preview',
  templateUrl: './activity-small-preview.component.html',
  styleUrls: ['./activity-small-preview.component.css'],
  inputs:['activity','courseId','completedActivities']
})
export class ActivitySmallPreviewComponent implements OnInit {

  //store the activity object passed down from the parent
  private activity;
  //store the id of the course
  private courseId;
  //stores the array of id of completed activities
  private completedActivities;

  //to store if the activity is : locked , unlocked or completed
  private activityCompleteState:String='locked';

  constructor() { }

  ngOnInit() {
    this.updateActivityStatus();
   
  }

  updateActivityStatus(){
    setTimeout(() => {
      if(this.completedActivities.includes(this.activity._id)){
        this.activityCompleteState='unlocked';
     
      }else{
        this.activityCompleteState='locked';

      }
    }, 10 );


  }

}
