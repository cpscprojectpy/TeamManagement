import * as React from 'react';


export class StatusBar extends React.Component<{ user: String, info: string }, { interface: any }> {
    constructor(props: { user: String, info: string }) {
        super(props);
    }

    render() {
        let str:string = '--- ---';
        if(this.props.info !== ''){
            str = '---'+ this.props.info + '---';
        }
        return (<div style={{
            width: '100vw', backgroundColor: 'white',
            margin: '0', shadow: '5px 10px red'
        }}>
            <div className ={'pull-left'}>Greetings, {this.props.user} </div> <div style={{ color: 'red' }}>{str}</div>
            {/* <div>Greetings, {this.props.user}</div> <div style={{color:'red'}}></div> */}
        </div>)
    }
}
