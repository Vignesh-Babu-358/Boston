import React from 'react'
import ReactDOM from 'react-dom';
import './auth.css';
import img from './download copy.jpg'
import img1 from './BCC_Logo_Book.webp'

class Auth extends React.Component {
    constructor() {
        super();
        this.state = { log: 0 };
    }

    render() {
        return (
            <body className="main">
                <div>
                    <div class="Img">
                        <p class='change_img'><img src={img1}></img></p>
                    </div>

                    <div class="Login">

                        <p class="Logo"><img src={img}></img></p>
                        <div class="sec">
                            <label id='user' style={{ color: 'white' }}>UserID</label>
                            <input className='form-control formbox' type="email" name="user"></input>
                            <label className='pwd' style={{ color: 'white' }}>Password</label>
                            <input class="form-control passbox" type="password" name="pwd" ></input>
                            <a type='button' onClick={this.change} className='btn btn-dark' id='butbox'
                                href='http://localhost:3000/cred'>Submit</a>
                        </div>
                    </div>
                </div>
            </body>
        );
    }
}

export default Auth;