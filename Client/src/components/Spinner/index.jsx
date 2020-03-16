import React from 'react';
import { CubeSpinner } from 'react-spinners-kit';
import './styles.scss';

const Spinner = ({ size = 30, loading }) => {
    return (
        <div className='spinner-wrapper'>
            <CubeSpinner size={size} frontColor="#3f51b5" loading={loading} />
        </div>
    )
}

export default Spinner;