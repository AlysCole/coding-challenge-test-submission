import React, { FunctionComponent} from "react";

import $ from './Spinner.module.css';

interface SpinnerProps {
    loading: boolean;
}

const Spinner: FunctionComponent<SpinnerProps> = ({ loading }) => {
    if (!loading) return;

    return (
        <div className={$.spinner}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Spinner;