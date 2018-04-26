import * as React from 'react';
import {StatusBar} from './components/PresentationalStatusBar'
import {Ops} from './components/PresentationalOps'
import {Inputs} from './components/PresentationalInputs'
import {TableContainer} from './components/TableContainer'
import axios from 'axios';

export class PlayerUI extends React.Component<{identity:string, id:number}, {operations:string[], op:any, table_query:any, result:any, msg:any}> {
    constructor(props:{identity:string, id:number}) {
        super(props);
        this.state={
            operations: ["Find new coach" ,  "Search your utilities"],
            op: <div></div>,
            table_query: null,
            result: [],
            msg: ''
        }
    }
    //Make proposal / like proposals && approve proposals / add players
    opUI(str:string):any{
        // console.log('coach' + str)
        switch(str) { 
            case "Find new coach": { 
                // console.log('enter coach');
                return <Inputs add={this.query_find_new.bind(this)} fields={[{type:'number', name:'cid'}]} submit={'Try'} />
            } 
            case "Search your utilities": { 
                // console.log('enter coach');
                return <Inputs add={this.query_util.bind(this)} fields={[{type:'checkboxes', name:[ 'uid', 'pid']}]} submit={'Search'} />
            } 
            default: { 
               return <div></div>
            } 
         } 
    }
    setOpUI(str: string) {
        let op_div: any = this.opUI(str);
        this.setState({ op: op_div });
    }
    setTableQuery(query:any){
        this.setState({table_query:query});
    }
    
    query_find_new(info){
        info['pid'] = this.props.id;
        axios.post('/findnewcoach', info, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res:any) => {
            //console.log(JSON.stringify(res.data.result)); 
            //console.log(JSON.stringify(res.data.result));
            if(res.data.str === ''){
                this.setState({
                    msg:res.data.info
                })
            }else{
                this.setState({
                    msg:res.data.info,
                    table_query: null,
                    result: res.data.result.rows
                })
            }
            return true;
        })
    }
    query_util(info:any){
        let info_str: string = JSON.stringify(info);
        //console.log(info_str);
        info['pid'] = this.props.id;
        console.log(info);
        axios.post('/seeplayerutilities', info, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res: any) => {
            //console.log(JSON.stringify(res.data.result));
            console.log(JSON.stringify(res));
            console.log('enter util');
            if(res.data.result === null){
                this.setState({
                    msg: res.data.info,
                    table_query:null
                })
            }else{
                this.setState({
                    result: res.data.result.rows,
                    msg: res.data.info,
                    table_query:null
                })
            }
            return true;
        })
    }
    render() {
        let table_div: any = (this.state.result.length !== 0 || this.state.table_query !== null) ? <TableContainer resultArray={this.state.result} query={this.state.table_query} /> :
            <div style={{ position: 'relative', left: '36vw', top: '27vh', padding: '0', color: 'white', fontSize: '4em', width: '60vw', height: '20vh' }}>table to display</div>;
        return <div>
            <div style={{ height: '6vh', margin: '0px', backgroundColor: '#0B70D0' }}>
                <StatusBar user={this.props.identity} info={this.state.msg} />
                <Ops ops={this.state.operations} setup={this.setOpUI.bind(this)} />
            </div>
            <div style={{ position: "relative", top: '4.6vh', height: '19vh', backgroundColor: 'white', margin: '0px' }}>
                {this.state.op}
            </div>
            <div style={{ position: "relative", top: '4.6vh', height: '70.2vh', backgroundColor: 'rgb(116,180,231)', margin: '0px' }}>
                {table_div}
            </div>
        </div>
    }
}

