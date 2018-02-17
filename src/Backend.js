import firebase from 'firebase';

class Backend {
  uid = '';
  messagesRef = null;
  constructor(){
    firebase.initializeApp({
      apiKey: "AIzaSyAzEle8Rk8YwNSqDQOOFcIE2iBz3GD0-AE",
      authDomain: "rn-chatapp-26090.firebaseapp.com",
      databaseURL: "https://rn-chatapp-26090.firebaseio.com",
      projectId: "rn-chatapp-26090",
      storageBucket: "rn-chatapp-26090.appspot.com",
      messagingSenderId: "243464437655"
    });
    firebase.auth().onAuthStateChanged(user => {
      console.log('user', user);
      if(user){
        this.setUid(user.uid)
      } else {
        firebase.auth().signInAnonymously().catch(err => {
          alert(err.message)
        })
      }
    });
  }
  setUid(value){
    this.uid = value;
  }
  getUid(){
    return this.uid
  }

  loadMessages(callback){

    this.messagesRef = firebase.database().ref('messages');    
    this.messagesRef.off();
    const onRecieve = (data) => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name
        }
      });
    };
    this.messagesRef.limitToLast(20).on('child_added', onRecieve)
  }

  //send message to Backend
  sendMessage(message){
    for (let i=0; i<message.length; i++){
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });
    }
  }

  closeChat(){
    if(this.messagesRef){
      this.messagesRef.off();
    }
  }

}

export default new Backend;
