import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket = io('http://localhost:3000');

  constructor() { }

  joinRoom(data: any){
    this.socket.emit('join',data);
  }

  newUserJoined(){
    let observable = new Observable<{userId: String, userName: String, message: String}>(observer=>{
      this.socket.on('new user joined',(data)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });
    return observable;
  }

  leaveRoom(data: any){
    this.socket.emit('leave',data);
  }

  userLeftRoom(){
    let observable = new Observable<{userId: String, userName: String, message: String}>(observer=>{
      this.socket.on('left room',(data)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });
    return observable;
  }
  
  sendMessage(data: any){
    this.socket.emit('message',data);
  }

  newMessageRecevied(){
    let observable = new Observable<{userId: String, userName: String, message: String}>(observer=>{
      this.socket.on('new message',(data)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });
    return observable;
  }

}
