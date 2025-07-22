import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarGraph = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/patients');
            const patients = res.data;

            // Aggregate data (e.g., calculate averages or counts)
            const genderCount = {
                Male: 0,
                Female: 0,
                Other: 0,
            };

            let totalAge = 0, totalHeight = 0, totalWeight = 0;

            patients.forEach(patient => {
                

                totalAge += patient.age;
                totalHeight += patient.height;
                totalWeight += patient.weight;
            });

            const patientCount = patients.length;

            // Prepare data for the graph
            const formattedData = [
                { name: 'Average Age', count: (totalAge / patientCount).toFixed(1) },
                { name: 'Average Height (cm)', count: (totalHeight / patientCount).toFixed(1) },
                { name: 'Average Weight (kg)', count: (totalWeight / patientCount).toFixed(1) }
            ];

            setData(formattedData);
        } catch (error) {
            console.error("Error fetching patient data", error);
        }
    };

    return (
        <div className="card p-4 shadow mt-4">
            <h3 className="text-center text-success">Data Overview</h3>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#a5d6a7" name="Count / Average" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarGraph;
