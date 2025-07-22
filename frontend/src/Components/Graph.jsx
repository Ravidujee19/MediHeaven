import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Graph = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/patients');
            const formattedData = res.data.map((patient, index) => ({
                index: index + 1,  // Using index for X-Axis to show all patients
                name: patient.name,
                bmi: patient.bmi,
                sleep: patient.sleepHours,
                exercise: patient.exerciseHours
            }));
            setData(formattedData);
        } catch (error) {
            console.error("Error fetching patient data", error);
        }
    };

    return (
        <div className="card p-4 shadow mt-4">
            <h3 className="text-center text-success">Health Trends</h3>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <XAxis dataKey="index" label={{ value: "Patients", position: "insideBottom", dy: 10 }} />
                    <YAxis label={{ value: "Values", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="bmi" stroke="#28a745" name="BMI" />
                    <Line type="monotone" dataKey="sleep" stroke="#007bff" name="Sleep Hours" />
                    <Line type="monotone" dataKey="exercise" stroke="#ffc107" name="Exercise Hours" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Graph;
