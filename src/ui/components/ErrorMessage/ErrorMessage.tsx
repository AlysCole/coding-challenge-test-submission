import React, { FunctionComponent } from "react";

import $ from './ErrorMessage.module.css';

interface ErrorMessageProps {
    children: React.ReactNode;
}

const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({ children }) => {
    return <div className={$.error}>{children}</div>;
};

export default ErrorMessage;
