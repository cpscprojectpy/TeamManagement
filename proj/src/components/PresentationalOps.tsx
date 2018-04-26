import * as React from 'react';

export class Ops extends React.Component<{ops:string[], setup:any}, undefined> {
    constructor(props:{ops:string[], setup: any}) {
        super(props);
    }
    
    render() {
        let width:number = 100/this.props.ops.length;
        let width_str:string = width.toString() + 'vw'
        let op_divs:any[] = this.props.ops.map((str:string,key:number) => {
            return <div className="col-md-2 col-sm-4 col-xs-6 col-xxs-12 clink" style={{height:'6vh', 
            width:width_str}} key={key} onClick={(e:any) => {this.props.setup(str)}}>
                    <div className="all" >{str}</div>
            </div>
        });
         
            
        return   <div className="category">
                {op_divs}
            </div>
            
        
        
    }
}
