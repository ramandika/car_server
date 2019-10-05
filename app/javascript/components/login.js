import React from "react"
import PropTypes from "prop-types"
import OtpInput from 'react-otp-input';
import axios from 'axios';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={phone_number: "087886671823", otp: "", input_otp: ""}
    this.GET_TOKEN_URL = "http://localhost:8080/api/v1/tokens/otp";
    this.LOGIN_URL = "http://localhost:8080/api/v1/tokens"
  }

  _getOtp = () => {
    axios.post(this.GET_TOKEN_URL,{
      phone_number: this.state.phone_number
    }).then((response) => {
      console.log(response);
      if(response.data.error){
        alert(response.data.error)
      }else{
        this.setState({otp: response.data.otp})
      }
    }).catch((error) => {
      alert(error)
    })
  }

  _login = () => {
    axios.post(this.LOGIN_URL, {
      phone_number: this.state.phone_number,
      otp: this.state.otp
    }).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error);
    })
  }

  render () {
    return (
      <React.Fragment>
        {!this.state.otp &&
        <div>
          <h3>Login</h3>
          <form>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Phone Number" value={this.state.phone_number} onChange={(e) => this.setState({phone_number: e.target.value})}/>
            </div>
            <div className="form-group">
              <button type="button" className="btn btn-primary" onClick={this._getOtp.bind(this)}>Next ></button>
            </div>
            <div className="form-group">
              <a href="#" className="ForgetPwd">Forget Password?</a>
            </div>
          </form>
        </div>}
        {this.state.phone_number && this.state.otp &&
            <form action="/dashboard/login" method="post">
              <div className="headingOtp">
                <span>Silahkan Masukkan Kode OTP</span>
              </div>
              <div className="otp-input">
                <OtpInput
                    value={this.state.input_otp}
                    onChange={otp => this.setState({input_otp: otp})}
                    numInputs={4}
                    shouldAutoFocus={true}
                    separator={<span>-</span>}
                    inputStyle={{fontSize: 50}}
                />
              </div>
              <input hidden type="text" value={this.state.phone_number} name="phone_number" />
              <input hidden type="text" value={this.state.input_otp} name="otp" />
              <input type="submit" style={{marginTop: 20}} className="btn btn-primary btn-lg btn-block" />
            </form>
        }
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  greeting: PropTypes.string
};
export default Login
