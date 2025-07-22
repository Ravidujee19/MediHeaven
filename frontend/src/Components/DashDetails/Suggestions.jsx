import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const OneSuggestion = () => {
    const [lastSuggestion, setLastSuggestion] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
        fetchLatestSuggestion();
    }, []);

    const fetchLatestSuggestion = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/patients');
            const patientsData = res.data;
            if (patientsData.length > 0) {
                const last = patientsData[patientsData.length - 1];
                setLastSuggestion(last.suggestions);
            }
        } catch (error) {
            console.error("Error fetching suggestion", error);
        }
    };

    const handleClick = () => {
        navigate('/dashboard/user'); 
    };

    return (
        <div 
            className="card p-4 shadow mt-4" 
            onClick={handleClick} 
            style={{ cursor: 'pointer' }}
        >
            <h3 className="text-center text-success">Latest Health Suggestion</h3>
            {lastSuggestion ? (
                <p className="mt-3 text-center fs-5">{lastSuggestion}</p>
            ) : (
                <p className="text-center mt-3">No suggestions available.</p>
            )}
        </div>
    );
};

export default OneSuggestion;


