import * as React from 'react';
import { Loggin } from "./components/PresentationalLoggin";
import { CoachUI } from './PresentationalCoachUI'
import { PlayerUI } from './PresentationalPlayerUI'
import { ManagerUI } from './PresentationalManagerUI'
import axios from 'axios';

interface UI{
    log:boolean,
    identity:string,
    id:number
}
export interface TypedInput{
    type:string,
    name:any
}
export interface Info {
    user: string,
    pw: string
}
export class Main extends React.Component<undefined, {ui:UI}> {
    constructor() {
        super();
        this.state={
            ui:{
                log:false,
                identity:'',
                id:-1
            }
        }
    }
    login(info:Info):boolean{
        //console.log(JSON.stringify(info));
        
        let info_str:string = JSON.stringify(info);
        axios.post('/login', info_str, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res:any) => {
            //console.log(JSON.stringify(res.data.result));
            console.log(res.data.login);
            if(res.data.login){
                let ui_obj:UI = {
                    log:true,
                    identity:'',
                    id:-1
                }
                console.log('identity' + res.data.identity)
                ui_obj['identity'] = res.data.identity;
                ui_obj['id'] = parseInt(info.pw);
                this.setState({ui: ui_obj})
            }else{
                alert('invalid password')
            }
        }).catch((err:any) => {
            alert(err.body);
            return false;
        });
        return false;
    }
    render() {
        if(this.state.ui.log){
            if(this.state.ui.identity === 'player'){
                return <PlayerUI identity={this.state.ui.identity} id={this.state.ui.id} />;
            }else if (this.state.ui.identity === 'coach'){
                return <CoachUI identity={this.state.ui.identity} id={this.state.ui.id} />;
            }else if (this.state.ui.identity === 'manager'){
                return <ManagerUI identity={this.state.ui.identity} id={this.state.ui.id} />;
            }
        }else{
            return <Loggin login={this.login.bind(this)} />;
        }
        //return <PlayerUI identity={this.state.ui.identity} id={this.state.ui.id} />;
        //return <ManagerUI identity={this.state.ui.identity} id={2} />;
        // return <Loggin login={this.login.bind(this)} />;
        // // update id
         //return <CoachUI identity={'manager'} id={this.stat} />;
        // // return <CoachUI identity={this.state.ui.identity} id={123} />
    
    }
}