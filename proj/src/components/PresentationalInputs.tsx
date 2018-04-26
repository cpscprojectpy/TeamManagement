import * as React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, DropdownButton, MenuItem,Checkbox } from 'react-bootstrap';
import { TypedInput } from '../main'

export class Inputs extends React.Component<{ add: any, fields: TypedInput[], submit: string }, { name: string, gametag: string, phone: string, pid: string, cid: string, mid: string, cost: string, uid: string, radio: string, checkboxes:string[],enable:boolean }> {
    constructor(props: { add: any, fields: TypedInput[], submit: string }) {
        super(props);
        this.state = {
            name: '',
            gametag: '',
            phone: '',
            pid: '',
            cid: '',
            mid: '',
            cost: '',
            uid: '',
            radio: 'Choose one',
            checkboxes:[],
            enable:true
        }
    }
    
    delay_onKeyUp(e: any, target: string, type: string) {
        let update_string: any = e.target.value;
        console.log(update_string);
        if (type === 'number' && !update_string.includes('-') && isNaN(update_string)) {
            alert('expect number input string')
            let new_obj = {};
            new_obj['enable'] = false;
            this.setState(new_obj);
        } else if (type === 'string' && !isNaN(update_string)) {
            let new_obj = {};
            new_obj['enable'] = false;
            this.setState(new_obj);
            alert('expect string input number')
        } else {
            let new_obj = {};
            new_obj[target] = update_string;
            new_obj['enable'] = true;
            console.log('update' + JSON.stringify(new_obj))
            this.setState(new_obj);
        }
        // setTimeout(() => console.log(JSON.stringify(this.state[target])), 0);
    }
    set_radio(str: string){
        // console.log("radio" + str);
        this.setState({radio: str});
    }
    set_checkboxes(str:string){
        console.log("checkbox" + str);
        let new_arry:string[] = this.state.checkboxes;
        if(this.state.checkboxes.indexOf(str) > -1){
            let i:number = new_arry.indexOf(str, 0);
            new_arry.splice(i, 1);   
        }else{
            new_arry.push(str);
        }
        this.setState({
            checkboxes: new_arry
        });
    }
    render() {
        let width: number = 48 / this.props.fields.length;
        if(width > 24){
            width = 16;
        }
        let width_str: string = width.toString() + 'vw';
        console.log(width_str)
        let fields_divs: any = this.props.fields.map((obj: TypedInput, key: number) => {
            if (obj.type === 'radios') {
                let menus:any = obj.name.map((s:string, key:number) => {
                    return <MenuItem eventKey={key} onClick = {(e) => {this.set_radio(s)}}>{s}</MenuItem>
                })
                return <DropdownButton
                    bsStyle={"info"}
                    title={this.state.radio}
                    key={key}
                >   
                {menus}
                </DropdownButton>
            }else if (obj.type === 'checkboxes'){
                let menus:any = obj.name.map((s:string, key:number) => {
                    return <Checkbox style ={{width: width_str}} onClick = {(e) => {this.set_checkboxes(s)}}>{s}</Checkbox>
                })
                return <DropdownButton
                    bsStyle={"info"}
                    title={'select columns to display'}
                    key={key}
                >   
                {menus}
                </DropdownButton>
            } else {
                return <FormGroup
                    controlId="formBasicText"
                    style={{
                        fontWeight: 'normal', width: width_str, float: 'left', marginLeft: '6vw'
                    }}
                    key={key}
                >
                    <FormControl
                        type="text"
                        placeholder={obj.name + ": "}
                        onKeyUp={(e) => { this.delay_onKeyUp(e, obj.name, obj.type) }}
                    />
                </FormGroup>
            }
        })

        let new_obj: any = {};
        
        this.props.fields.forEach((f: TypedInput) => {
            //console.log('enter')
            console.log(f.type);
            if(f.type === 'radios'){
                new_obj['radio'] = this.state.radio;
            }else if(f.type === 'checkboxes'){
                console.log('enter checkbox')
                new_obj['filter'] = this.state.checkboxes;
            }else{
                new_obj[f.name] = this.state[f.name];
            }     
        })
        let left: string = '6%';
        //console.log('length equals' + this.props.fields.length)
        if( this.props.fields.length === 0){
            left = '39%';
        }
        else if (this.props.fields.length === 0|| this.props.fields[0].type === 'radios' || this.props.fields[0].type ==='checkboxes' || this.props.fields.length === 1) {
            
            //console.log('enter')
            left = '34%';
        }else if(this.props.fields[0].type === 'string' && this.props.fields[1].type === 'radios' ){
            // console.log(
            //     'enter'
            // )
            left = '16%';
        }
        console.log(JSON.stringify(new_obj));
        let button:any = this.state.enable? <Button bsStyle="primary" type="submit" style={{
            width: '9vw', padding: '2px', marginLeft: '6vw', marginTop: '0.2%'
        }} onClick={(e: any) => { this.props.add(new_obj) }}>{this.props.submit}</Button> : <Button bsStyle="primary" type="submit" style={{
            width: '9vw', padding: '2px', marginLeft: '6vw', marginTop: '0.2%'
        }} onClick={(e: any) => { this.props.add(new_obj) }} disabled>{this.props.submit}</Button>
        return <div style={{
            position: 'absolute', top: '32%', left: left
        }}>
            {fields_divs}
            {button}
        </div>

    }
}
