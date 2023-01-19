import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { constant } from 'src/constants/constant';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  users: any = [];
  messages: any = [];
  constant: any = constant;

  userId: String = '';
  userName: String = '';
  room: String = '';
  messageArray:Array<{userId: String, userName: String, message: String}>=[];
  messageText: String = '';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private jwtService: JwtService,
    private chatService: ChatService
  ){
    this.chatService.newUserJoined().subscribe(data=>{
      this.messageArray.push(data);
    });
    this.chatService.userLeftRoom().subscribe(
      data=>{
        this.messageArray.push(data);
      });
      this.chatService.newMessageRecevied().subscribe(data => {
        this.messageArray.push(data);
      });
  }

  getMyProfile(){
    this.apiService.getMyProfile().subscribe(
      res=>{
        console.log(res, '   res of getMyProfile in messages component');
        if(res.success){
          this.userId = res.data._id;
          this.userName = res.data.firstName;
          constant.loggedInUser = res.data;
          constant.isLogin = true;
          this.router.navigate([`${this.router.url}`]);
        }
        else{
          this.jwtService.destroyTokenAndLogout();
        }
      },
      err=>{
        this.jwtService.destroyTokenAndLogout();
      }
    );
  }

  getUserMessages(_id: any){
    this.apiService.getUserMessages(_id).subscribe(
      res=>{
        if(res.success){
          console.log(res,'   success res of getUserMessages');
          this.messages = res.data.docs;
        }
        else{
          console.log(res,'   error res of getUserMessages');
        }
      },
      err=>{
        console.log(err,'   err in getUserMessages');
      }
    );
  }

  listUsers(){
    this.apiService.listUsers().subscribe(
      res=>{
        if(res.success){
          console.log(res,'   success res of listUsers');
          this.users = res.data.docs;
        }
        else{
          console.log(res,'   error res of listUsers');
        }
      },
      err=>{
        console.log(err,'   err in listUsers');
      }
    );
  }

  join() {
    this.chatService.joinRoom({ userId: this.userId, userName: this.userName, room: this.room });
  }

  leave(){
    this.chatService.leaveRoom({ userId: this.userId, userName: this.userName, room: this.room });
  }

  sendMessage(){
    this.chatService.sendMessage({ userId: this.userId, userName: this.userName, room: this.room, message: this.messageText});
    this.messageText = "";
  }

  ngOnInit(){
    this.getMyProfile();
    this.listUsers();
    console.log(constant.loggedInUser, '              constant.loggedInUser..........');
  }

}
