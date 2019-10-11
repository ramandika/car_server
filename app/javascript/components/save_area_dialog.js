import React from "react"
import axios from "axios";
import Cookies from 'js-cookie'

export default class SaveAreaDialog extends React.Component{
    constructor(props){
        super(props)
        this.state={area_name: "",price: ""}
        this.CREATE_AREA_URL="http://car-io.montrax.id/api/v1/areas"
    }

    onSubmit(){
        axios.post(this.CREATE_AREA_URL,{
            area: {
                name: this.state.area_name,
                price: this.state.price,
                boundaries: this.props.boundaries
            }
        },{
            headers: {
                'content-type': 'application/json'
            }

        }).then((response) => {
            this.props.fetchAreas();
            this.setState({area_name: "", price: ""})
            this.props.closeSaveAreaDialog();
            alert(response.data.message)
        }).catch((error) => {
            console.log(error);
        })
    }

    render() {
        return(
            <div className={`modal fade ${this.props.show ? 'show' : ''}`} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" style={{display: this.props.show ? "block" : "none"}} aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Area</h5>
                            <button onClick={this.props.closeSaveAreaDialog} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group row">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Name</label>
                                    <div className="col-sm-10">
                                        <input value={this.state.area_name} type="text" className="form-control" placeholder="area name" onChange={(e) => {this.setState({area_name: e.target.value})}}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Price</label>
                                    <div className="col-sm-10">
                                        <input value={this.state.price} type="number" className="form-control" placeholder="price" onChange={(e) => {this.setState({price: e.target.value})}} />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button onClick={this.onSubmit.bind(this)} type="button" className="btn btn-primary">Save Area</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}