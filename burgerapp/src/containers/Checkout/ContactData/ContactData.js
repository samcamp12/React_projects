import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../component/UI/Button/Button';
import Spinner from '../../../component/UI/Spinner/Spinner';
import './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../component/UI/Input/Input';


class ContactData extends Component {
    state = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zip Code'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Country'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false
                },
                emails: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    value: ''
                }
        },
            
        loading: false
    
    }

    orderHandler = (event) => {
        event.preventDefault(); // prevent the form auto reload
        this.setState({loading: true});
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
            
        }
        axios.post('/orders.json', order)
            .then(response =>{ 
                this.setState({ loading: false });
                this.props.history.push('/'); // means we are back to home page. i.e. evevy response need a redirection
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    checkValidation = (value, rules) => {
        
        let isValid = false;
        
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
    }

    inputChangedHandler = (event, inputidentifier) => { // inputidentifier is the formElement id -> key of orderform
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputidentifier]
        }
        updatedFormElement.value = event.target.value; // here we changed the value of original form
        updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputidentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm}) // rerender
    }

    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]            
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id} 
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button 
                btnType="Success">ORDER</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className='ContactData'>
                <h4>Enter Your Contact Data</h4>
               {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);