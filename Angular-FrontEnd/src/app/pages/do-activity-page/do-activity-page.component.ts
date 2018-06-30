import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { CourseService} from "../../services/course/course.service";

@Component({
  selector: 'app-do-activity-page',
  templateUrl: './do-activity-page.component.html',
  styleUrls: ['./do-activity-page.component.css']
})
export class DoActivityPageComponent implements OnInit {

  //to track the page/content component
  private pageCount:number=4 ;
  //the id of the selected course will be stored for later use 
  private selectActivityId: String;
  //course id of activity
  private courseId: String;
  //the activity json object
  private activity;

  //this stores the substription to the router param
  private routerSubscription: any;

  constructor(private route:ActivatedRoute , private courseService:CourseService) { }

  ngOnInit() {
      //getting the params from the route 
      this.routerSubscription = this.route.params.subscribe(params => {
        this.selectActivityId = params['activityId']; 
        this.courseId = params['courseId']; 

        this.loadActivity(this.courseId,this.selectActivityId);

      });
  }

  /** 
   * ngOnDestroy() method is called when the component is no longer used
  */
  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  /** 
   * loadActivity() method will get the activity
  */
  loadActivity(courseId,activityId){
    this.courseService.getCourseById(courseId).subscribe(res=>{
      //filtering the activity based on the activity id
      this.activity=res.activities.filter((activity)=>{
        return activityId === activity._id;
      })[0];//getting the 1st value 
    });
  }


  
  /**
   *  these methods are used to navigate the pages
  */
  goBackAPage(){
    if(this.pageCount>0){
      this.pageCount--;
      console.log(this.pageCount);
    }
  }
  goFowardAPage(){
    if(this.pageCount<4){
      this.pageCount++;
      console.log(this.pageCount);
    }

  }

}
