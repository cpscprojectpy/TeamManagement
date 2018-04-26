import * as React from 'react';
import { StatusBar } from './components/PresentationalStatusBar'
import { Ops } from './components/PresentationalOps'
import { Inputs } from './components/PresentationalInputs'
import { TableContainer } from './components/TableContainer'
import { TypedInput } from './main'
import axios from 'axios';

export class ManagerUI extends React.Component<{ identity: string, id: number }, { operations: string[], op: any, table_query: any, result: any, msg: string }> {
    constructor(props: { identity: string, id: number }) {
        super(props);
        this.state = {
            operations: ["Budget utilities", "Examine approved utilities", "Update Cost", "Find Max/Min/Avg utilites", "Delete Coach", "Search Player", "Display shared utilities","Insert global utility"],
            op: <div></div>,
            table_query: null,
            result: [],
            msg: ''
        }
    }
    //Make proposal / like proposals && approve proposals / add players
    
    opUI(str: string): any {
        switch (str) {
            case "Budget utilities": {
                return <Inputs add={this.query_budget_cost.bind(this)} fields={[{type:'number', name:'budget'}]} submit={'search over cost'} />
            }
            case "Examine approved utilities": {
                return <Inputs add={this.query_explain.bind(this)} fields={[{type:'string', name:'name'},{type:'radios', name:['Max','Min']}]} submit={'examine utilities'} />
            }
            case "Update Cost": {
                //statements;
                return <Inputs add={this.query_update_cost.bind(this)} fields={[{type:'number', name:'uid'}, {type:'number', name:'cost'}]} submit={'update'} />
                //return <Inputs add={this.query.bind(this)} fields={['name', 'phone', 'gametag']} submit={'add'}/>  
            }
            case "Find Max/Min/Avg utilites": {
                return <Inputs add={this.query_max_min_avg.bind(this)} fields={[{type:'radios', name:['Max','Min','Avg']}]} submit={'Search'} />
            }
            case "Delete Coach": {
                return <Inputs add={this.query_delete_coach.bind(this)} fields={[{type:'number', name:'cid'}]} submit={'delete'} />
            }
            case "Search Player": {
                return <Inputs add={this.query_search.bind(this)} fields={[{type:'checkboxes', name:['pid','cid','gamertag']}]} submit={'search'} />
            }
            // case "Display shared utilities": {
            //     return <Inputs add={this.query_search_utilities.bind(this)} fields={[]} submit={'display all'} />
            // }
            case "Display shared utilities": {
                return true;
            }
            case "Insert global utility": {
                return <Inputs add={this.query_insert_util.bind(this)} fields={[{type:'number', name:'uid'},{type:'string', name:'name'},{type:'string', name:'description'},{type:'number', name:'cost'}]} submit={'insert'} />
            }
            default: {
                return <div></div>
            }
        }
    }
    setOpUI(str: string) {
        let func = (() => axios.post('/assignedutility', {info: 'display'}, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res: any) => {
            //console.log(JSON.stringify(res.data.result));
            console.log(JSON.stringify(res));
            console.log('enter');
            this.setState({
                result: res.data.result.rows
            })
            return true;
        }).catch((err: any) => {
            alert(err.body);
            return false;
        }));
        let op_div: any = this.opUI(str);
        if(typeof op_div === "boolean"){
            //alert('display')
            this.setState({op:<div></div>, table_query: func })
        }else{
            this.setState({ op: op_div });
        }
        
    }
    setTableQuery(query: any) {
        this.setState({ table_query: query });
    }
    query_max_min_avg(info:any){
        let that = this;
        //set as state later
        // let mid_num = '1';
        let mid_obj ={
            mid: this.props.id
        }
        if(info['radio'] === 'Max'){
            //alert('Max')
            let func = (() => axios.post('/mostexpensive', mid_obj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res: any) => {
                //console.log(JSON.stringify(res.data.result));
                console.log(JSON.stringify(res));
                console.log('find max enter');
                if(res.data.result === null){
                    that.setState({
                        msg: res.data.info
                    })
                }else{
                    that.setState({
                        result: res.data.result.rows
                    })
                }
                return true;
            }));
            axios.post('/mostexpensive', mid_obj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res: any) => {
                //console.log(JSON.stringify(res.data.result));
                console.log(JSON.stringify(res));
                console.log('find max enter');
                if(res.data.result === null){
                    that.setState({
                        msg: res.data.info
                    })
                }else{
                    that.setState({
                        result: res.data.result.rows,
                        table_query:func
                    })
                }
                return true;
            }).catch((err: any) => {
                alert('expensive' + err.body);
                return false;
            })
        }else if(info['radio'] === 'Min'){
            let func = (() => axios.post('/cheapest', mid_obj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res: any) => {
                //console.log(JSON.stringify(res.data.result));
                console.log(JSON.stringify(res));
                console.log('min enter');
                if(res.data.result === null){
                    that.setState({
                        msg: res.data.info
                    })
                }else{
                    that.setState({
                        result: res.data.result.rows
                    })
                }
                return true;
            }));
            axios.post('/cheapest', mid_obj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res: any) => {
                //console.log(JSON.stringify(res.data.result));
                console.log(JSON.stringify(res));
                console.log('min enter');
                if(res.data.result === null){
                    that.setState({
                        msg: res.data.info
                    })
                }else{
                    that.setState({
                        result: res.data.result.rows,
                        table_query:func
                    })
                }
                return true;
            }).catch((err: any) => {
                alert(err.body);
                return false;
            })
        }else if (info['radio'] === 'Avg'){
            //alert('Avg')
            let func = (() => axios.post('/averagecost', mid_obj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res: any) => {
                //console.log(JSON.stringify(res.data.result));
                console.log(JSON.stringify(res));
                console.log('avg enter');
                if(res.data.result === null){
                    that.setState({
                        msg: res.data.info
                    })
                }else{
                    that.setState({
                        result: res.data.result.rows
                    })
                }
                return true;
            }).catch((err: any) => {
                alert(err.body);
                return false;
            }));
            axios.post('/averagecost', mid_obj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res: any) => {
                //console.log(JSON.stringify(res.data.result));
                console.log(JSON.stringify(res));
                console.log('avg enter');
                if(res.data.result === null){
                    that.setState({
                        msg: res.data.info
                    })
                }else{
                    that.setState({
                        result: res.data.result.rows,
                        table_query:func
                    })
                }
                return true;
            }).catch((err: any) => {
                alert(err.body);
                return false;
            })
        }else{
            alert('expect Max/Min/Avg')
        }
        
    }
    query_search: any = ((info: any) => {
        //console.log(JSON.stringify(info));
        let that = this;
        let func = (() => axios.post('/searchplayer', info, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res: any) => {
            //console.log(JSON.stringify(res.data.result));
            console.log(JSON.stringify(res));
            console.log('enter');
            that.setState({
                result: res.data.result.rows
            })
            return true;
        }).catch((err: any) => {
            alert(err.body);
            return false;
        }));
        axios.post('/searchplayer', info, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res: any) => {
            //console.log(JSON.stringify(res.data.result));
            console.log(JSON.stringify(res));
            console.log('enter');
            that.setState({
                result: res.data.result.rows,
                table_query: func
            })
            return true;
        }).catch((err: any) => {
            alert(err.body);
            return false;
        })
        // this.setState({
        //     table_query: func
        // })
    });

    query_delete_coach(info: any): any {
        //console.log(JSON.stringify(info));
        axios.post('/deletecoach', info, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res: any) => {
            //console.log(JSON.stringify(res.data.result));
            console.log(JSON.stringify(res));
            console.log('delete');
            this.setState({
                msg: res.data.info,
                result: res.data.result.rows,
                table_query:null
            })
            return true;
        }).catch((err: any) => {
            alert(err.body);
            return false;
        });
    }
    query_update_cost(info: any): any {
        //console.log(JSON.stringify(info));
        let info_str: string = JSON.stringify(info);
        console.log(info_str);
        axios.post('/updatecost', info, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res: any) => {
            //console.log(JSON.stringify(res.data.result));
            console.log(JSON.stringify(res));
            console.log('enter');
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
    query_budget_cost(info:any):any{
        let info_str: string = JSON.stringify(info);
        console.log(info_str);
        axios.post('/budgetutilitycost', info, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res: any) => {
            //console.log(JSON.stringify(res.data.result));
            console.log(JSON.stringify(res));
            console.log('enter budget cost');
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
    query_explain(info:any){
        let info_str: string = JSON.stringify(info);
        console.log(info_str);
        axios.post('/explainutilities', info, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res: any) => {
            //console.log(JSON.stringify(res.data.result));
            console.log(JSON.stringify(res));
            console.log('enter explain');
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
    query_insert_util(info:any){
        let info_str: string = JSON.stringify(info);
        console.log(info_str);
        axios.post('/insertutil', info, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res: any) => {
            //console.log(JSON.stringify(res.data.result));
            console.log(JSON.stringify(res));
            console.log('enter insert util');
            if(res.data.result === null){
                this.setState({
                    msg: res.data.info
                })
            }else{
                this.setState({
                    msg: res.data.info
                })
            }
            return true;
        })
    }
    query_search_utilities(info:any){
        let that = this;
        let func = (() => axios.post('/assignedutility', info, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res: any) => {
            //console.log(JSON.stringify(res.data.result));
            console.log(JSON.stringify(res));
            console.log('enter');
            that.setState({
                result: res.data.result.rows
            })
            return true;
        }).catch((err: any) => {
            alert(err.body);
            return false;
        }));
        axios.post('/assignedutility', info, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res: any) => {
            //console.log(JSON.stringify(res.data.result));
            console.log(JSON.stringify(res));
            console.log('enter');
            that.setState({
                result: res.data.result.rows,
                table_query: func
            })
            return true;
        }).catch((err: any) => {
            alert(err.body);
            return false;
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
            <div style={{ position: "relative", top: '4.6vh', height: '16vh', backgroundColor: 'white', margin: '0px' }}>
                {this.state.op}
            </div>
            <div style={{ position: "relative", top: '4.6vh', height: '73.2vh', backgroundColor: 'rgb(116,180,231)', margin: '0px' }}>
                {table_div}
            </div>
        </div>
    }
}

