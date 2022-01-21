import React from 'react';
import './home.css';
import Moment from 'moment';

class Home extends React.Component
{
    constructor()
    {
        super();
        
        this.state = {Sub:false,sname:"",stime:Moment().format('DD-MM-YYYY'),Err:""};
    }
    submit = (event)=>
    {
        this.setState({Sub:true});
        event.preventDefault();
        let d = {
            Sub:this.state.Sub,
            sname:this.state.sname,
            stime:this.state.stime
        }
        this.props.rdata(d);
    }
    change = (event) =>
    {
        event.preventDefault();
        let x=event.target.name;
        let y=event.target.value;
        this.setState({[x]:y});
    }
    render()
    {
        return(
            <div>
                <form  onSubmit={this.submit} autoComplete="off">
                <input onChange={this.change} name='sname' value={this.state.sname} type="text" placeholder='Enter the shop name' className='shopin' id='shopid1'></input>
                <br></br>
                <input onChange={this.change} name='stime' value={this.state.stime} type="date" class="shopin" id='shopid2'></input>
                <br></br>
                <button type="submit" className="btn mt-3 ">Show receipt</button>
                </form>
            </div>
         )
     }
}

export default Home;