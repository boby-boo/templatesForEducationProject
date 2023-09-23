import React from 'react';
import { MagnifyingGlass } from "react-loader-spinner";

const Spinner = ({text, width, height}) => {

    return (
        <div className="spinner">
            <h2>{text}</h2>
            <MagnifyingGlass
                visible={true}
                height={height}
                width={width}
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor = '#cadae4'
                color = '#eb4242'
            /> 
        </div>
    )
}

export default Spinner;