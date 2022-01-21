import React from 'react';
import './receipt.css'
class Receipt extends React.Component
{
    render()
    {
        return(
          
            <table className="table mt-5 table-dark table-hover table-bordered table-responsive">
            <thead className='table-light'>
              <tr>
                <th className="tab" scope='col'>Shopname</th>
                <th className="tab" scope="col">Recept_id</th>
                <th className="tab" scope="col">Buyer_user_id</th>
                <th className="tab" scope="col">Create_timestamp</th>
                <th className="tab" scope="col">Name</th>
                <th className="tab" scope="col">Total_tax_cost</th>
                <th className="tab" scope="col">Subtotal</th>
                <th className="tab" scope="col">Total_shipping_cost</th>
                <th className="tab" scope="col">Grandtotal</th>
              </tr>
            </thead>
            
            <tbody>
              {
                  this.props.redata.length > 0 ?
                  (
                    this.props.redata.map(r =>
                      <tr>
                        <td>{this.props.sdata.sname}</td>
                        <td>{r.receipt_id}</td>
                        <td>{r.buyer_user_id}</td>
                        <td>{r.create_timestamp}</td>
                        <td>{r.name}</td>
                        <td>{r.total_tax_cost.amount}</td>
                        <td>{r.subtotal.amount}</td>
                        <td>{r.total_shipping_cost.amount}</td>
                        <td>{r.grandtotal.amount}</td>
                        
                      </tr>
                      )
                  )
                  :
                  (
                     <tr>
                       <td>
                         Sorry,No Receipt Found..
                       </td>
                     </tr>

                  )
              }
               
            </tbody>
            </table>
        )
    }
}
export default Receipt;