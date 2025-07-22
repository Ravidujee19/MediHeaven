import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdatePatient = () => {  
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState({
        height: '', weight: '', sleepHours: '', exerciseHours: '', target: ''
    });

    useEffect(() => {
        fetchPatient();
    }, []);

    const fetchPatient = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/patients/${id}`);
            setPatient(res.data);
        } catch (error) {
            console.error("Error fetching patient", error);
        }
    };

    const handleChange = (e) => {
        setPatient({ ...patient, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/patients/${id}`, patient);
            navigate('/view-patients'); // Redirect after update
        } catch (error) {
            console.error("Error updating patient", error);
        }
    };

    return (
        <div className="card p-4 shadow mt-4">
            <h3 className="text-center text-primary">Update Health Details</h3>
            <form onSubmit={handleUpdate}>
                {['height', 'weight', 'sleepHours', 'exerciseHours', 'target'].map((field, index) => (
                    <div className="mt-2" key={index}>
                        <label className="form-label">{field.replace(/([A-Z])/g, ' $1')}</label>
                        <input type="text" name={field} className="form-control" value={patient[field]} onChange={handleChange} required />
                    </div>
                ))}
                <button type="submit" className="btn btn-primary mt-3">Update</button>
            </form>
        </div>
    );
};

export default UpdatePatient;
