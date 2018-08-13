import { Injectable , } from '@angular/core';
import { Http ,Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { tokenNotExpired } from 'angular2-jwt';
import { Subject , Observable } from 'rxjs';

@Injectable()
export class AuthService {

  //defining the type for the user
  private user:any;
  //defining the type for the jwt token
  private token:any;
  //stores the type of user (Student or teacher)
  private userType:String=null;

  //to track local storage chages
  private storageSub= new Subject<boolean>();
  
  constructor(private http:Http) { }

  /**
   * registerUser() method will send a post req to the node server to save the user in the database 
   * @param user 
   */
  registerUser(user){
    let headers= new Headers();
    headers.append('content-Type' ,'application/json');

    //checking the type of user
    let postUrl:string;
    if(user.userType==="student"){
      postUrl="http://localhost:3000/person/registerstudent";
    }else if(user.userType==="teacher"){
      postUrl="http://localhost:3000/person/registerteacher";
    }

    //this will rturn the response of the post request
    return this.http.post(postUrl ,user ,{ headers : headers})
    .map(res=>res.json());;
  }


  /**
   * loginUser() method will send a post req to the node server
   * @param user 
   */
  loginUser(user){
    let headers= new Headers();
    headers.append('content-Type' ,'application/json');
    let postUrl="http://localhost:3000/person/login";
    // console.log('auth service: ', postUrl,user, headers)

    //this will return the response of the post request
    return this.http.post(postUrl, user, { headers : headers})
    .map(res=>res.json());
  }

  /**
   * storeData() method will save the jwt token and userData to the browser local storage
   * @param token 
   * @param userData 
   */
  storeData(token,userData){
    //saving the jwt token and user data in the browser local storage
    localStorage.setItem("token",token);
    localStorage.setItem("userData",JSON.stringify(userData));
    //setting the tokens
    this.token=token;
    this.user=userData;
    //to track changes to local storage
    this.storageSub.next(true);
  }

  /** 
   * getUserProfile() method will send a GET req to the node web api and get user JSON
  */
  getUserProfile(){
    //getting the token from local storage
    this.fetchToken(); 
    let headers= new Headers();
    //appending the authourization header to access the blockked profile route
    headers.append('Authorization' ,this.token);
    headers.append('content-Type' ,'application/json');

    let postUrl="http://localhost:3000/person/profile";

    return this.http.get(postUrl,{ headers : headers}).map(res=>res.json());;
  }

  /**
   * fetchToken() method will get the jwt token saved in the locl storage of the broswer and set it to a variable
   */
  fetchToken(){
    const localToken=localStorage.getItem("token");
    this.token=localToken;
  }

  /** 
   * logoutUser() method will clear the local storage and also set the user and token variables to NULL
   */
  logoutUser(){
    //clearing variables
    this.token=null;
    this.user=null;
    //clearing local storage data
    localStorage.clear();
    //to track changes to local storage
    this.storageSub.next(true);
  }

  /**
   * loggedIn() method is used to check if user is logged in or not
   */
  loggedIn() {
    return tokenNotExpired();
  }

  /** 
   * getUserType() method will read the local user object and return the type of user
  */
  getUserType():String{
      if(localStorage.getItem('userData')!==null){
        //reading the saved object from the local storage
        const userObject = JSON.parse(localStorage.getItem('userData'));
        return userObject.type;
      }else{
        return null;
      }
  }

  getCurrentUserId():String{
    if(localStorage.getItem('userData')!==null){
      //reading the saved object from the local storage
      const userObject = JSON.parse(localStorage.getItem('userData'));
      return userObject._id;
    }else{
      return null;
    }
  }
  getCurrentUserObect():String{
    if(localStorage.getItem('userData')!==null){
      //reading the saved object from the local storage
      const userObject = JSON.parse(localStorage.getItem('userData'));
      return userObject;
    }else{
      return null;
    }
  }

  /**
   * watchStorage to track changes to local storage
   */
  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

}
