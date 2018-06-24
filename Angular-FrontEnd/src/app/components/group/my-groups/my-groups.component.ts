import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../services/authentication/auth.service';
import { GroupService } from '../../../services/group/group.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.css'],
  
})
export class MyGroupsComponent implements OnInit {

  private groups:any;
  private groupName:String="Default(no name)";

  constructor(private groupService:GroupService , private authService:AuthService ,private router:Router) { }

  ngOnInit() {
    this.loadAllGroups();
  }


  /**
   * loadAllGroups() will get the array of groups which the teacher owns and set the groups array variable 
   */
  loadAllGroups(){
    this.groupService.getAllGroups(this.authService.getCurrentUserId()).subscribe(res=>{
      this.groups=res.groups;
    });
    
  }

  createGroup(){
    const groupName = prompt("Group Name?");

    this.groupService.createGroup(this.authService.getCurrentUserId(), groupName ).subscribe(res=>{
      if(res){
        this.loadAllGroups();
      }  
    });
    
  }

}
