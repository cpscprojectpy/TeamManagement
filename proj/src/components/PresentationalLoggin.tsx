import * as React from 'react';
import { LogginInterface } from "./LoginContainer";


export class Loggin extends React.Component<{login:any}, {interface:any}> {
    constructor(props:{login:any}) {
        super(props);
    }
    
    render() {
        return (<div style={{position:'absolute', top:'17vh', left:'0vw', width:'70vw', height:'83vh', backgroundColor:'orange', 
                margin:'0', shadow:'5px 10px red'}}>
                    <LogginInterface login={this.props.login}/>
                </div>)
    }
}
