import React, { Component } from 'react';
import { object } from 'prop-types';
import { drizzleConnect } from 'drizzle-react';
import { CryptoKittiesContractName } from '../constants/contractsConstants';
import { Card } from 'antd';
import { Form, Input, Button } from 'antd';
import styles from '../styles/containers/KittyForm.module.scss';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class KittyForm extends Component {
    static displayName = 'KittyForm';

    componentDidMount() {
        this.props.form.validateFields();
    }

    handleSubmit = e => {
        e.preventDefault();
        const { onSubmit, form } = this.props;
        const { getFieldValue, validateFields } = form;
        validateFields((err, values) => {
            if (!err) {
                onSubmit(getFieldValue('kittyId'));
            }
        });
    };

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, transaction } = this.props.form;

        const kittyIdError = isFieldTouched('kittyId') && getFieldError('kittyId');

        // if (!transaction) return null;

        // return (
        //     <Card title='Blah'>
        //         <p>Card content</p>
        //     </Card>
        // );
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item
                    validateStatus={kittyIdError ? 'error' : ''}
                    help={kittyIdError || ''}
                >
                    {getFieldDecorator('kittyId', {
                        rules: [{ required: true, message: 'Please input your kitty\'s ID!' }],
                    })(
                        <Input className={styles.input} placeholder="Kitty ID" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                    >
                        Here kitty kitty!
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const mapStateToProps = (state, props) => {
    const txnHash = state.transactionStack && state.transactionStack[props.transactionStackId];
    return {
        transaction: txnHash && state.transactions[txnHash]
    }
};

const WrappedKittyForm = Form.create()(KittyForm);

export default drizzleConnect(WrappedKittyForm, mapStateToProps);
