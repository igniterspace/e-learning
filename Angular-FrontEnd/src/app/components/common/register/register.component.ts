import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {AuthService } from "../../../services/authentication/auth.service";
import { FlashMessagesService } from 'angular2-flash-messages'; 
import { Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fName:String;
  lName:String;
  gender:String="male";
  email:String;
  password:String;
  confirmPassword:String;
  userType:String="student";

  constructor( 
    private authService :AuthService ,
    private flashMessagesService:FlashMessagesService ,
    private router:Router ,
    private formsModule:FormsModule
  ) { 

  }

  ngOnInit() {
  }

  registerData(){
    const user ={
      firstName :this.fName,
      lastName:this.lName,
      gender:this.gender,
      email:this.email,
      password:this.password,
      userType:this.userType
    }

    this.authService.registerUser(user).subscribe(res=>{
      //only if state is true
      if(res.state){
        //showing the success flash message
        this.flashMessagesService.show( res.message , { cssClass: 'alert-success', timeout: 3000 });
        //redirecting the page to the login page
        this.router.navigate(['/login']);
      }else{
         //showing the success flash message
         this.flashMessagesService.show( res.message, { cssClass: 'alert-danger', timeout: 3000 });
          //redirecting the page back to register page
         this.router.navigate(['/register']);
      }
    });
  }




}
