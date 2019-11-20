import firebaseConfig from "./config";
// import axios from 'axios';

class Firebase {
  constructor(app) {
    if(!firebaseInstance) {
      app.initializeApp(firebaseConfig);

      this.auth = app.auth();
      this.db = app.firestore();
      this.functions = app.functions();
      this.storage = app.storage();
      // this.phoneNumber = app.phoneNumber();
    }
  }

// async getUserProfile({userId}) {
  getUserProfile({userId, onSnapshot}) {
    return this.db.collection('publicProfiles')
    .where('userId', '==', userId)
    .limit(1)
    .onSnapshot(onSnapshot)
  }

  async reqister({email, password, username}) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    const createProfileCallable = this.functions.httpsCallable('createPublicProfile');
    console.log(createProfileCallable);
    return createProfileCallable({
      username
    })
  }
  
  // async reqister({email, password, username}) {
  //   const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
  //   return this.db.collection('publicProfiles').doc(username).set({
  //     userId: newUser.user.uid
  //   })
  // }

  async postComment({text, grilId}) {
    // сначала нам нужно создать ссылку на этот комментарий
    const postCommentCallable = this.functions.httpsCallable('postComment'); // мы хотим передать здесь строковую ссылку на функцию, которую мы только что создали
    // здесь есть ссылка на комментарий к сообщению, но вы просто знаете, что этот комментарий ссылается на
    return postCommentCallable({
      text,
      grilId
    });
  }

  subscribeToGrilComments({grilId, onSnapshot}) {
    const grilRef = this.db.collection('barber').doc(grilId);
    console.log(grilRef);
    return this.db.collection('comments')
      .where('gril', '==', grilRef)
      .orderBy('dateCreated', 'desc')
      .onSnapshot(onSnapshot);
  }

  async login({email, password}) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
  await this.auth.signOut();
  }

}

let firebaseInstance;

function getFirebaseInstance(app) {
  if(!firebaseInstance && app){
    firebaseInstance = new Firebase(app);
    return firebaseInstance;
  }else if(firebaseInstance){
    return firebaseInstance
  }else{
    return null;
  }
}

export default getFirebaseInstance;
