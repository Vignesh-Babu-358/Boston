import React from 'react';
import './home.css';
import Moment from 'moment';
import html2pdf from 'html2pdf.js'
import img from './download copy.jpg'
import img1 from './logo1.jpg'
import axios from 'axios';
class Home extends React.Component {
    constructor() {
        super();

        this.state = { Sub: false, sname: "", stime: Moment().format('DD-MM-YYYY'), Err: "", shipdata: [], shiporderdata: [] };
        this.checkorder = this.checkorder.bind(this);
    }
    submit = (event) => {
        this.setState({ Sub: true });
        event.preventDefault();
        let d = {
            Sub: this.state.Sub,
            sname: this.state.sname,
            stime: this.state.stime
        }
        this.props.rdata(d);
    }
    change = (event) => {
        event.preventDefault();
        let x = event.target.name;
        let y = event.target.value;
        this.setState({ [x]: y });
    }
    showsname = (event) => {
        const a = event.target.value;
        axios.get("http://localhost:4000/").then(res => {
            this.setState({ shipdata: res.data })

        })
    }

    checkorder = (event) => {
        axios.get("http://localhost:4000/").then(res => {
            const a = event.target.value;
            console.log(a);
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].Shop_name == a) {
                    var id = res.data[i].Shop_ID;
                    console.log(id);
                    axios.get("http://localhost:4000/orders").then(res => {
                        for (var j = 0; j < res.data.length; j++) {
                            if (res.data[j].Store_ID == id) {
                                //this.setState({ shiporderdata: res.data[j] })
                                this.state.shiporderdata[j] = res.data[j];
                                console.log(this.state.shiporderdata[j])
                                //console.log(this.state.shiporderdata);

                            }
                            else {
                                continue;
                            }
                        }
                    })
                }
            }
        })

    }

    inv = () => {
        const a = document.getElementById("invoice");
        console.log(a);
        html2pdf().from(a).save();
    }

    render() {
        return (
            <div id='homebdy'>
                <img src={img} id='boslogo' />
                <form autoComplete="off" id='form'>
                    <select id="sel1" name="shops" value={this.state.shipdata.Shop_name}
                        onMouseOver={this.showsname} onChange={this.checkorder}>
                        {this.state.shipdata.map((v, key) => (
                            <option key={key} value={v.Shop_name}>{v.Shop_name}</option>
                        ))}
                    </select>
                    <br></br>
                </form>
                <button onClick={this.inv} className='btn btn-primary'>Download Reciept</button>
                <div style={{ marginRight: 20 }} >
                    <table className="table table-dark table-hover table-bordered table-responsive" id="invoice" >
                        <thead className='table-light'>
                            <tr>
                                <th className="tab" scope='col'>Reciept_number</th>
                                <th className="tab" scope="col">Order_date</th>
                                <th className="tab" scope="col">Shipping_address</th>
                                <th className="tab" scope="col">Order_value</th>
                                <th className="tab" scope="col">Shipping_cost</th>
                                <th className="tab" scope="col">Tax_amount</th>
                                <th className="tab" scope="col">Gift_message</th>
                                <th className="tab" scope="col">Quantity</th>
                                <th className="tab" scope="col">Image</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.shiporderdata.length > 0 ?
                                    (
                                        this.state.shiporderdata.map(r =>
                                            <tr>
                                                <td >{r.Reciept_number}</td>
                                                <td>{r.Order_date}</td>
                                                <td style={{ width: 292 }}>{r.Shipping_address}</td>
                                                <td>{r.Order_value}</td>
                                                <td>{r.Shipping_cost}</td>
                                                <td>{r.Tax_amount}</td>
                                                <td style={{ width: 273 }}>{r.Gift_message}</td>
                                                <td>{r.Quantity}</td>
                                                <td><img src={r.Image_link} width='100px' height='100px'></img></td>
                                            </tr>
                                        )
                                    )
                                    :
                                    (
                                        <tr>
                                            <td>
                                                please select your shop
                                            </td>
                                        </tr>

                                    )
                            }

                        </tbody>
                    </table>
                </div>
            </div >
        )
    }
}

export default Home;