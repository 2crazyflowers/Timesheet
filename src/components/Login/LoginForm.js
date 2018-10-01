// Importing React since we are using React.
import React from 'react';


class LoginForm extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <form>
          <label>
          User
          <input 
          type="text" 
          name="username"  
          className="Login"
          value={this.props.username}
          onChange={this.props.handleUsername}/>
          </label>
          <br></br>
          <label>
          Pass
          <input 
          type="text" 
          name="pass"  
          className="Login"
          onChange={this.props.handlePassword}
          />
          </label>
          <br></br>
          <input type="submit" value="Login" className="Button"
          value={this.props.password}
          onChange={this.props.handleSubmit}/>
        </form>
      </div>
    );
  }
}

// TextFields.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default (LoginForm);
