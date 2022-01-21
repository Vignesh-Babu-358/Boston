import React from 'react';
import './App.css';
import Home from './home'
import Receipt from './receipt';
import axios from 'axios';

class  App extends React.Component {
  constructor()
  {
    super();
    this.state = {sub:0,recdata:[],sdata:[],err:""};
  }
   
  check = (d) =>
  {
    if(d.Sub == false)
    {
      console.log(d.Sub);
      this.setState({sub:1,sdata:d});
      console.log(d.stime);
      this.getall(d);
      //var date = new Date(d.stime);
      //var unixTimeStamp = Math.floor(date.getTime() / 1000)
      //console.log(unixTimeStamp)
    }
  }
 
 
  
  getall(ftime)
  {
    axios.get("http://localhost:4000/receipt").then(res =>{
        //console.log(res.data[0]);
        //console.log(ftime.stime);
        for(let i=0;i<res.data.length;i++)
        {
          var timestamp = res.data[i].create_timestamp;
          var date = new Date(timestamp*1000);
          var fdata = (date.getFullYear()) + '-'+ ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
          console.log(fdata);
          if(fdata == ftime.stime)
          {
            //console.log(res.data[i]);
            //var fres = []
            res.data[i].create_timestamp = fdata;
            this.state.recdata[i] = res.data[i];
            //console.log(fres[i]);
            //this.setState({recdata:res.data[i]});
            
          }
          
        }
        console.log(this.state.recdata);
        
        
      });
      
  }
  
  render()
  {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-collapse" id="navbarTogglerDemo01" >
        <a className="navbar-text navbar-collapse" id="navbarTogglerDemo01" href='http://localhost:3000/'>
         Boston creative company
        </a>
        <br/>
        <br/>
        </nav>
        {this.state.sub ? <Receipt  sdata={this.state.sdata}  redata = {this.state.recdata}/> : <Home rdata={this.check}/>}
      </div>
    );
  }
}

export default App;
