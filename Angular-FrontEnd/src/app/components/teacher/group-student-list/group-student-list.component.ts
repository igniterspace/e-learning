import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages'; 


import { GroupService} from "../../../services/group/group.service";

@Component({
  selector: 'app-group-student-list',
  templateUrl: './group-student-list.component.html',
  styleUrls: ['./group-student-list.component.css'],
  inputs:['group']
})
export class GroupStudentListComponent implements OnInit {

  //store the group which is comming from the parent component
  private group;
  //stores the students array
  private students;

  //store the email of the student to add
  private studentEmail;

  constructor(private flashMessagesService:FlashMessagesService, private groupService: GroupService) { }

  //this is the method that is called when add student button is pressed
  onSubmitAddStudent(){
    this.groupService.addStudentToGroup( this.studentEmail , this.group._id ).subscribe(res=>{
      if(res.state){
        this.loadStudentsList();
        this.studentEmail="";
        this.flashMessagesService.show( res.message , { cssClass: 'alert-success', timeout: 3000 });
      }
      if(!res.state){
        this.flashMessagesService.show( res.message , { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

  ngOnInit() {
    this.loadStudentsList();
  }

  //this method poplulates the students array from data from the db
  loadStudentsList(){
    //getting the students
    this.groupService.getAllStudents(this.group._id).subscribe(res=>{
      this.students=res.students;
    });
  }
  
}
