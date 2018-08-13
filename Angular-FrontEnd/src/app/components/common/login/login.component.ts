import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/authentication/auth.service"
import { FlashMessagesService } from 'angular2-flash-messages'; 
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //defining the types
  email:String;
  password:String;

  constructor(private authService : AuthService , private flashMessagesService:FlashMessagesService,private router:Router) { }

  ngOnInit() {
  }

  //this method will login a user
  loginUser(){
    const user ={
      email:this.email,
      password:this.password
    }
    // console.log(user);

    //passing user object to the login user method in the auth service
    this.authService.loginUser(user).subscribe(res=>{
      //checking if login is successful
      if(res.state){
        //storing the user data in the response (the jwt token and user json)
        this.authService.storeData(res.token, res.person);
        //success flash message
        this.flashMessagesService.show( res.message , { cssClass: 'alert-success', timeout: 3000 });

        if(res.person.type === "Student"){
            this.router.navigate(["/studentdashboard"]);

        }else if(res.person.type === "Teacher") {
            this.router.navigate(["/teacherdashboard"]);

        }

      }else{
        this.flashMessagesService.show( res.message , { cssClass: 'alert-danger', timeout: 3000 });
        //redirecting back to the login page
        this.router.navigate(["/login"]);
        this.router.navigate(['/register']);
      }
    });
  }

}
