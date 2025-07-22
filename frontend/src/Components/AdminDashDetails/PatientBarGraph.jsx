import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PatientBarGraph = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/patients');
            const patients = res.data;
            const genderCount = {
                Male: 0,
                Female: 0,
                Other: 0,
            };

            let totalAge = 0, totalHeight = 0, totalWeight = 0;

            patients.forEach(patient => {
                if (patient.gender === "Male") genderCount.Male++;
                if (patient.gender === "Female") genderCount.Female++;
                if (patient.gender === "Other") genderCount.Other++;

                totalAge += patient.age;
                totalHeight += patient.height;
                totalWeight += patient.weight;
            });

            const patientCount = patients.length;

            // Prepare data for the graph
            const formattedData = [
                { name: 'Male', count: genderCount.Male },
                { name: 'Female', count: genderCount.Female },
                { name: 'Other', count: genderCount.Other },
                { name: 'Age', count: (totalAge / patientCount).toFixed(1) },
                { name: 'Height(cm)', count: (totalHeight / patientCount).toFixed(1) },
                { name: 'Weight(kg)', count: (totalWeight / patientCount).toFixed(1) }
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

export default PatientBarGraph;
