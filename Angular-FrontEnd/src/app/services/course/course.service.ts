import { Injectable } from '@angular/core';
import { Http ,Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { AuthService} from '../../services/authentication/auth.service'

@Injectable()
export class CourseService {

  constructor(private http:Http , private authService:AuthService) {

  }


  /**
   * getAllCourses()
   */
  getAllCourses(){
    const getUrl:string = "http://localhost:3000/course/all";

    //this will return the response of the get request in json format
    return this.http.get(getUrl)
    .map(res=>res.json());;
  }

  /**
   * getCourseById()
   */
  getCourseById(courseId){
    let getUrl:string = "http://localhost:3000/course/one";
    //appending the courseId to the url
    getUrl+="/?courseId="+courseId;
    //this will return the response of the get request in json format
    return this.http.get(getUrl)
    .map(res=>res.json());;
  }

  /**
   * addActivityIdToStudent() will will add the activity id to the student completed activitiesarray
   */
  addActivityIdToStudent(courseId , activityId ){
    const studentId = this.authService.getCurrentUserId();
    const reqBody={
      "courseId":courseId,
      "activityId":activityId,
      "studentId":studentId
    }

    let postUrl="http://localhost:3000/student/addcompletedactivity";
    
    //this will return the response of the post request
    return this.http.post(postUrl ,reqBody)
    .map(res=>res.json());
  }

  /**
   * getCompletedActivities() will get all the activity ids of the complted activities
   */
  getCompletedActivities(courseId){
    const studentId = this.authService.getCurrentUserId();
    let getUrl:string = "http://localhost:3000/student/getcompletedactivities";
    //appending the courseId to the url
    getUrl+="/?studentId="+ studentId + "&courseId="+ courseId;

    //this will return the response of the get request in json format
    return this.http.get(getUrl)
    .map(res=>res.json());;

  }



}
