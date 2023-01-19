import { Component } from '@angular/core';
import { io } from 'socket.io-client';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  title: String = 'Chat Application';
  socket: any;
  messages: any = [];
  message: any;
  event_name_1: any;
  broadcast_event_1: any;

  constructor(
    private apiService: ApiService
  ){

  }

  createSocketRoom(){
    this.apiService.createSocketRoom().subscribe(
      res => {
        console.log(res,'   res of createSocketRoom');
      },
      err=>{
        console.log(err,'   err in createSocketRoom');
      }
    );
  }

  sendMessage() {
    this.socket.emit('chat_message', this.message, (response: any) => {
      console.log(response.status, "     response.status........"); // ok
    });
    this.message = '';
  }

  ngOnInit() {
    this.socket = io('http://localhost:3000');

    this.socket.on('chat_message', (msg: any) => {
      this.messages.push(msg);
    });

    this.socket.on('event_name_1', (msg: any) => {
      this.event_name_1 = msg;
    });

  }

}
