import * as React from 'react';
import TextField from 'material-ui/TextField';
import { FormGroup, ControlLabel, FormControl, HelpBlock,Button} from 'react-bootstrap';
import {Info} from '../main'



export class LogginInterface extends React.Component<{ login: any }, { user: string, pw:string }> {
    constructor(props: { login: any }) {
        super(props);
        this.state = {
                user: '',
                pw: ''
            
        }
    }
     private counter:any;
    delay_onKeyUp(e:any,target:string){
        // clearTimeout(this.counter);
        if(target === 'pw' && isNaN(e.target.value)){
            alert('password should be number')
        }else{
            let update_string:string = e.target.value;
            //console.log(update_string);
            let new_obj = {};
            new_obj[target] = update_string;
            this.setState(new_obj);
        }
        // setTimeout(() => console.log(JSON.stringify(this.state[target])), 0);
    }
    render() {
        return (<div style={{ position: 'relative', left: '20vw', width: '50vw', height: '83vh', margin: '0', backgroundColor: "white" }}>
            <div style={{
                position: 'relative', top: '26%', left: '31%', fontWeight: 'normal',
                letterSpacing: '3px', fontSize: '3vw', color: '#0B70D0'
            }}>LOGIN</div>
            <div style={{
                position: 'relative', top: '27%', left: '31%', fontWeight: 'normal',
                letterSpacing: '1px', fontSize: '1.4vh', color: 'grey', width: '17vw', lineHeight: '1.7'
            }}>providing team management services to coaches/players/managers</div>
            <div style={{
                position: 'relative', top: '31%', left: '31%', fontWeight: 'normal',
                letterSpacing: '3px', fontSize: '3vw', color: '#0B70D0', width:'19vw'
            }}>
                <FormGroup
                    controlId="formBasicText"
                >
                    <FormControl
                        type="text"
                        placeholder="Username"
                        onKeyUp={(e) => {this.delay_onKeyUp(e,'user')}}
                    />
                </FormGroup>
            </div>
            <div style={{
                position: 'relative', top: '32%', left: '31%', fontWeight: 'normal',
                letterSpacing: '3px', fontSize: '3vw', color: '#0B70D0', width:'19vw'
            }}>
                <FormGroup
                    controlId="formBasicText"
                >
                    <FormControl
                        type="password"
                        placeholder="Password"
                        onKeyUp={(e) => {this.delay_onKeyUp(e,'pw')}}
                    />
                </FormGroup>
            </div>
            <div style={{
                position: 'relative', top: '33%', left: '31%', fontWeight: 'normal',
                letterSpacing: '3px', fontSize: '3vw', color: '#0B70D0', width:'19vw'
            }}>
               <Button bsStyle="primary" type="submit" style={{
                width:'9vw', padding:'2px'
            }} onClick={(e:any) => {
                let new_obj:Info = {user:'',pw:''};
                new_obj['user'] = this.state.user;
                new_obj['pw'] = this.state.pw;
                this.props.login(new_obj)
            }}>Submit</Button> 
            </div>
        </div>)
    }
}
