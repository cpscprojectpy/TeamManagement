import * as React from "react";


export class TableContainer extends React.Component<{resultArray:any[], query:any}, undefined> {
    constructor(props:{resultArray:any[], query:any, approvable:boolean}) {
        super(props);

    }
    private width:number = 100;
    private height:number = 70.2;
    private timer: any;
    componentDidMount() {
        //alert('update')
        if(this.props.query !== null){
            this.props.query();
        }
        
    }
    //UI set state does not include updating query function then not updating
    componentDidUpdate() {
        if(this.props.resultArray.length !== 0 && this.props.query !== null){
            this.timer = window.setTimeout(() => {
                //alert('update')
                this.props.query();
            }, 5000)
        }   
    }
    tableGenerate():any{
        //console.log('enter');
        //let width:number = document.getElementById('#course-table-container').clientWidth;
        //console.log(this.width);
        //console.log(JSON.stringify(this.props.resultArray));
        let style_obj:any = {};
        // style_obj['width'] = this.width.toString() + 'px';
        //let width_str:string = this.width.toString() + 'vw';
        style_obj['width'] ='100vw';
        let row_num:number = this.props.resultArray.length + 1;
        //console.log(row_num);
        let colunm_num:number = Object.keys(this.props.resultArray[0]).length;
        //console.log(colunm_num);
        let each_column_width:number = this.width / colunm_num;
        let each_column_height:number = this.height / row_num;
        let table_height:number = row_num * 10;
        style_obj['height'] = table_height.toString() + 'px';
        style_obj['backgroundColor'] = 'white';
        //console.log(JSON.stringify(style_obj));
        //generate actual table row
        let table_rows:any[] = [];
        let style_obj_row:any = {width: each_column_width.toString() + 'vw',height:'3vw', border: '1px solid black'};
        for (let i = 0; i < row_num; i++) {
            let tr_arr:any[] = [];
            for (let j = 0; j < colunm_num; j++) {
                if (i === 0) {
                    // create th
                    let th_text = Object.keys(this.props.resultArray[0])[j];
                    let th:any = <th style={style_obj_row} key={j.toString()}>{th_text}</th>;
                    tr_arr.push(th);
                } else {
                    //create td
                    let td_key:any = Object.keys(this.props.resultArray[i - 1])[j];
                    let td_text:any;
                    if(typeof(this.props.resultArray[i - 1][td_key]) === 'boolean'){
                        if(this.props.resultArray[i - 1][td_key]){
                            td_text='yes';
                        }else if(this.props.resultArray[i - 1][td_key] ===null){
                            td_text='null';
                        }else{
                            td_text='no';
                        }
                    }else if (this.props.resultArray[i - 1][td_key] === null){
                        td_text = "not found";
                    }else{
                        td_text = this.props.resultArray[i - 1][td_key];
                    }
                    
                    let td:any = <td style={style_obj_row} key={j.toString()}>{td_text}</td>;
                    tr_arr.push(td);
                }
            }
            table_rows.push(<tr key={i.toString()}>{tr_arr}</tr>);
        }
        //let table:any = <table style={style_obj}>{table_rows}</table>;
        //console.log(table_rows);
        return <table style={style_obj}><tbody>{table_rows}</tbody></table>;
    }
    // componentDidMount(){
    //     const width_update:number = document.getElementById('course-table-container').clientWidth;
    //     this.width = width_update;
    // }
    render() {
        let id:string = 'table-container';
        // let tableDiv:any = <div id={id}></div>;
        // if(this.props.resultArray.length !== 0){
        //     let table:any = this.tableGenerate();
        //     tableDiv = <div id={id}>{table}</div>;
        // }
        let table:any = this.props.resultArray.length === 0? <div></div>: this.tableGenerate();
        return <div id={id}>{table}</div>
                   
                
    }
}


