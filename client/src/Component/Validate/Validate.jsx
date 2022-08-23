import React, { useState } from "react";
import Login from "../Login/Login";
import firebaseApp from "../../Credential/index";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import UserProfile from "../UserProfile/UserProfile";
import NavBar from "../Navbar/Navbar";
import { userValidated } from "../../Redux-actions";
import { useDispatch, useSelector } from "react-redux";


const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function Validate() {
  // const [user, setUser] = useState(null);
  const user= useSelector(state => state.userValidated)
  const dispatch =useDispatch()

  async function getRol(uid) {
    const docuRef = doc(firestore, `user/${uid}`);
    const encryptedDoc = await getDoc(docuRef);
    //const finalInfo = encryptedDoc.data().rol;
    return encryptedDoc;
  }

  function setUserWithFirebaseAndRol(userFirebase) {
    getRol(userFirebase.uid).then((rol) => {
      const userData = {
        uid: userFirebase.uid,
        email: userFirebase.email,
        rol: rol,
      };
       dispatch(userValidated(userData));
    });
  }

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (!user) {
        setUserWithFirebaseAndRol(userFirebase);
      }
    } else {
      dispatch(userValidated(null))
    }
  });
  console.log('user', user)
  return (
    <div>
      {user ?   <UserProfile/>
      : 
       (
        <div>
          {" "}
          <NavBar />{" "}
          <div>
            <Login />
          </div>{" "}
        </div>
      )}
    </div>
  );
}

export default Validate;
