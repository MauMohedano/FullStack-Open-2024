import React from 'react';

interface TotalProps {
    totalExercises: number;
}

const Total: React.FC<TotalProps> = ({ totalExercises }) => {
    return (
        <p>
            <strong>Total exercises: {totalExercises}</strong>
        </p>
    );
};

export default Total;