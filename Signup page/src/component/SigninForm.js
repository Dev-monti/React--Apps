import React,{useState} from 'react';

const SigninForm = ({infouser,setFormspage}) => {
    const {email,password} = infouser;
    const [Submitform,setSubmitform] = useState(false);
    const [user,setUser] = useState({
        email: "",
        password: "",
    });
    const handleinput = e => {
        const {name,value} = e.target;
        setUser({...user,[name]: value});
    };
    const SubmitOk = e => {
        e.preventDefault();
        setSubmitform(true);
        if(user.email === email && user.password === password){
            setFormspage(false);
        }
    };
    return (
        <form className="row" onSubmit={SubmitOk}>
            <div className="col-xl-12">
                <label htmlFor="email">Email</label>
                <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    className={Submitform && !user.email? "empty" : ""}
                    value={user.email} onChange={handleinput} 
                />
            </div>
            <div className="col-xl-12">
                <label htmlFor="password">Password</label>
                <input 
                    id="password" 
                    name="password" 
                    type="password"
                    className={Submitform && user.password !== password? "empty" : ""}
                    value={user.password} onChange={handleinput} 
                />
            </div>
            <div>
                <button type="submit"><i className="bi bi-arrow-right-short"></i></button>
            </div>
          </form>
    )
}

export default SigninForm
