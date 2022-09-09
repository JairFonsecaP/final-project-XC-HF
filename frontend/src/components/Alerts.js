import React from 'react';
import { Alert } from 'antd';

const Alerts = (props) => {
    return (
        <>
            <Alert
                message={props.message}
                description={props.desciption}
                type={props.type}
                showIcon
                style={{ marginBottom: '5px' }}
            />
        </>
    );
};

export default Alerts;
