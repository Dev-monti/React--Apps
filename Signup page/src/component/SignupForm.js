import React,{useState} from 'react'

const SignupForm = ({setInfouser,setSignup}) => {
    const infoDefault = {
        username: "",
        email: "",
        password: "",
        password2: "",
    }
    const [submitform,setSubmitform] = useState(false);
    const [newsignup,setNewsignup] = useState(infoDefault);
    const [privacytearms,setPrivacytearm] = useState(false);
    const handleinput = e => {
        const {name,value} = e.target;
        setNewsignup({...newsignup,[name]: value});
    }
    const Checkbox = e => e.target.checked? setPrivacytearm(true) : setPrivacytearm(false);
    const SubmitOk = e => {
        e.preventDefault();
        setSubmitform(true)
        const {username,email,password,password2} = newsignup;
        if(username && email && password !== "" && password === password2 && privacytearms){
            setInfouser(newsignup);
            setSignup(false);
        }
    }
    return (
        <form className="row" onSubmit={SubmitOk}>
            <div className="col-xl-6 col-md-12">
                <label htmlFor="username">Name</label>
                <input id="username" name="username" type="text"
                       className={submitform && !newsignup.username? "empty" : ""}
                       value={newsignup.username} 
                       onChange={handleinput} 
                />
            </div>
            <div className="col-xl-6 col-md-12">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required
                       className={submitform && !newsignup.email? "empty" : ""}
                       value={newsignup.email} 
                       onChange={handleinput} 
                />
            </div>
            <div className="col-xl-6">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" 
                       className={submitform && !newsignup.password? "empty" : ""}
                       value={newsignup.password} 
                       onChange={handleinput} 
                />
            </div>
            <div className="col-xl-6">
                <label htmlFor="password2">Confirm Password</label>
                <input id="password2" name="password2" type="password" 
                       className={submitform && newsignup.password !== newsignup.password2? "empty" : ""}
                       value={newsignup.password2} 
                       onChange={handleinput} 
                />
            </div>
            <div className={`col-xl-12 chackbox ${submitform && !privacytearms? "empty" : ""}`}>
                <input id="checkbox" type="checkbox" onChange={Checkbox} />
                <label htmlFor="checkbox">I've read and agree with terms of service and our Privacy Policy</label>
            </div>
            <div><button type="submit"><i className="bi bi-arrow-right-short"></i></button></div>
        </form>
    )
}

export default SignupForm
