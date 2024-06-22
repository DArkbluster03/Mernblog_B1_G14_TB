
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB11MtEMcp9aofmAyRuKJ4TsWci20JOW_Q",
  authDomain: "mern-b69f2.firebaseapp.com",
  projectId: "mern-b69f2",
  storageBucket: "mern-b69f2.appspot.com",
  messagingSenderId: "847431276006",
  appId: "1:847431276006:web:5a1b492aa1e256adc3b227"
};


const app = initializeApp(firebaseConfig); 
const provider=new GoogleAuthProvider() ; 
const auth =getAuth(); 
const authWithGoogle=async()=>{ 
    let user=null; 
    await signInWithPopup(auth,provider) 
    .then((result)=>{ 
        user=result.user
    })  
    .catch((err)=>{ 
        console.log(err)
    })
    return user;
}

