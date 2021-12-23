import React,{useState} from "react";
import SignupForm from "./component/SignupForm";
import SigninForm from "./component/SigninForm";
import Signinsuccess from "./component/Signinsuccess"
import img from './images/undraw.png'

function App() {
  const SigninKey = "Sign in";
  const SignupKey = "Sign up";
  const [entrystatus,setEntrystatus] = useState(SignupKey);
  const [signup,setSignup] = useState(true);

  const [infouser,setInfouser] = useState({email: undefined , password: undefined });

  const [formspage,setFormspage] = useState(true);

  const Changelog = () => {
    setSignup(!signup);
    entrystatus === SignupKey? setEntrystatus(SigninKey) : setEntrystatus(SignupKey);
  }
  return (
    <div className="container-fluid">
      {formspage ? 
      <div className="row body">
        <div className="col-xl-6 col-lg-6 col-md-10">
          <h2>{entrystatus}</h2>
          <p className="signwith-p">{entrystatus} with</p>
          <div className="row signup-with">
            <div className="col-xl-6 col-md-12"><button className=" google">{entrystatus} with Google</button></div>
            <div className="col-xl-6 col-md-12"><button className=" facebook">{entrystatus} with Facebook</button></div>
          </div>
          {signup && <SignupForm setInfouser={setInfouser} setSignup={setSignup} />}
          {!signup && <SigninForm infouser={infouser} setFormspage={setFormspage} />}
          <div className="form-footer">
            <p>Already have an account?</p>
            <button onClick={Changelog}>{signup? "Sign in" : "Sign up"}</button>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-10 imgpage">
          <img src={img} alt="..."></img>
        </div>
      </div>
      : <Signinsuccess />}
    </div>
  );
}

export default App;
