import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter
} from 'reactstrap';


import '../assets/restore.css';
import { getBorrows, updateBorrow } from '../Publics/redux/actions/borrow';

class Restore extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			borrow: [],
			update: []
		};

		this.toggle = this.toggle.bind(this);
	}

	componentDidMount = async () => {
		const bookid = this.props.id
		await this.props.dispatch(getBorrows(bookid));
		this.setState({
			borrow: this.props.borrow
		});
	};

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	changeHandle = (e) => {
		const name = e.currentTarget.name;
		let val = e.currentTarget.value;
		this.state.borrow.borrowList[name] = val;
		this.setState({ borrow: this.state.borrow })
	};

	render() {
		const editBorrow = () => {
			this.state.update.push({
				tanggal_kembali: new Date()
			})

			update()
			this.setState((prevState) => ({
				modal: !prevState.modal
			}));
		};
		let update = async () => {
			await this.props.dispatch(updateBorrow((this.state.update[0]), this.props.id))
		};

		const { borrow } = this.state;
		const list = borrow.borrowList;
	
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0');
		var yyyy = today.getFullYear();

		const date = dd + ' - ' + mm + ' - ' + yyyy;
		return (
			<div>
				<button style={{
					color: 'white',
					backgroundColor: 'black',
					marginBottom: '10px',
					width: '100px'
				}}
					onClick={this.toggle} >
					Return
				</button>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className="{this.props.className} modal-md">
					
					<ModalHeader toggle={this.toggle}>
						<b>Restore</b>
					</ModalHeader>

					<ModalBody>
						<table style={{marginLeft:'30px'}}>
							<tr>
								<th style={{paddingRight:'50px'}}>Book Title</th>
								<th>: {this.props.name}</th>
							</tr>
							<tr>
								<th style={{paddingRight:'50px'}}>Date Return</th>
								<th>: {date}</th>
							</tr>
						</table>
					</ModalBody>

					<ModalFooter>
						<a href={`/booq/${this.props.id}`}><button class="buttonSave" onClick={editBorrow.bind(this)}>
							Confirm
						</button></a>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		borrow: state.borrow
	};
};
export default connect(mapStateToProps)(Restore);
