import React, { Component, Fragment } from 'react';
import { drizzleConnect } from 'drizzle-react';
import { CryptoKittiesContractName } from '../../constants/contractsConstants';
import { Form, Input, Button, Divider, Alert, Card } from 'antd';
import { getKittyLoading, getKittyImageUrl, getKittyLoadError } from '../../reducers/index';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';


import styles from './KittyForm.module.scss';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class KittyForm extends Component {
    static displayName = 'KittyForm';

    componentDidMount() {
        this.props.form.validateFields();
    }

    componentDidUpdate() {
        this.inputRef.focus();
    }

    handleSubmit = e => {
        e.preventDefault();
        const { onSubmit, form } = this.props;
        const { getFieldValue, validateFields } = form;
        validateFields((err, values) => {
            if (!err) {
                onSubmit(parseInt(getFieldValue('kittyId'), 10));
            }
        });
    };

    renderResults() {
        const { kittyResult, isImageLoading, imageUrl, error } = this.props;
        const value = !!kittyResult && kittyResult.value;
        const drizzleError = !!kittyResult && kittyResult.error;
        if (drizzleError) {
            return (
                <Fragment>
                    <Divider />
                    <Alert
                        className={styles.alert}
                        message="Error"
                        description="An error occurred while processing your request."
                        type="error"
                    />
                </Fragment>
            );
        }
        if (value) {
            function renderCover() {
                if (error) {
                    return (
                        <Alert
                            className={styles.imageError}
                            message="Image Not Available"
                            description="There was an problem retrieving your kitty's image"
                            type="error"
                        />
                    );
                }
                if (isImageLoading) {
                    return <LoadingIndicator />;
                }
                return <img alt="kittyimage" src={imageUrl} />;
            }

            return (
                <Fragment>
                    <Divider />
                    <Card className={styles.card} cover={renderCover()}>
                        <div className={styles.cardSection}>
                            <h3>ID</h3>
                            <span>{kittyResult.args[0]}</span>
                        </div>
                        <div className={styles.cardSection}>
                            <h3>Genes</h3>
                            <span>{value.genes}</span>
                        </div>
                        <div className={styles.cardSection}>
                            <h3>Generation</h3>
                            <span>{value.generation}</span>
                        </div>
                        <div className={styles.cardSection}>
                            <h3>Birth Time</h3>
                            <span>{new Date(value.birthTime * 1000).toDateString()}</span>
                        </div>
                    </Card>
                </Fragment>
            );
        }
    }

    render() {
        const { form, kittyResult, transactionDataKey } = this.props;
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;

        const kittyIdError = isFieldTouched('kittyId') && getFieldError('kittyId');

        const requestInFlight = !kittyResult && !!transactionDataKey;

        return (
            <div>
                <div className={styles.formContainer}>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Form.Item
                            validateStatus={kittyIdError ? 'error' : ''}
                            help={kittyIdError || ''}
                        >
                            {getFieldDecorator('kittyId', {
                                rules: [{ required: true, message: 'Please input your kitty\'s ID!' }],
                            })(
                                <Input
                                    ref={node => this.inputRef = node}
                                    autoFocus
                                    disabled={requestInFlight}
                                    className={styles.input}
                                    placeholder="Kitty ID"
                                    type='number'
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={hasErrors(getFieldsError()) || requestInFlight}
                            >
                                Here kitty kitty!
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

                {this.renderResults()}
            </div>
        );
    }
}

const mapStateToProps = (state, { transactionDataKey, kittyId }) => {
    const kittyContract = state.contracts[CryptoKittiesContractName];
    return {
        kittyResult: kittyContract.getKitty[transactionDataKey],
        isImageLoading: typeof kittyId === 'number' ? getKittyLoading(state, kittyId) : false,
        imageUrl: typeof kittyId === 'number' ? getKittyImageUrl(state, kittyId) : '',
        error: typeof kittyId === 'number' ? getKittyLoadError(state, kittyId) : '',
    }
};

const WrappedKittyForm = Form.create()(KittyForm);

export default drizzleConnect(WrappedKittyForm, mapStateToProps);
