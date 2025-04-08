import React,{useState,useEffect} from 'react';
import PatientSidebar from '../components/PatientSidebar';
import api from '../services/api';
import {toast} from 'react-toastify'
import {FileText} from 'lucide-react'
import {ToastContainer} from 'react-toastify';
import Prescription from '../components/PrescriptionView';

const PrescriptionPage=()=>{
    const [prescriptions,setPrescriptions]=useState([]);
    const [loading,setLoading]=useState(true);
    const [patient,setPatient]=useState(null);
    const[error,setError]=useState(null);
    

    useEffect(()=>{
        fetchPrescriptions();
        fetchCurrentPatient();
    },[]);

    const fetchPrescriptions=async()=>{
        try{
            const response=await api.getPrescriptionsCurrentPatient();
            setPrescriptions(response.data);
        }catch(error){
           console.log(error.message);
           setError(error.message);
            toast.error("failed to get prescriptions" );
        }finally{
            setLoading(false);
        }
    }
    const fetchCurrentPatient=async()=>{
        try{
            const response=await api.getCurrentPatient();
            setPatient(response.data);
        }catch(error)
        {
            console.log(error.message);
            toast.error("No patient found");
            setError(error.message);
        }
    }

    if(loading)
    {
        return (
            <div className="flex h-screen bg-gray-100 items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading prescriptions...</p>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex h-screen bg-gray-100 items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 text-lg font-medium">{error}</p>
                </div>
            </div>
        );
    }
    return (
        <div className="flex h-screen bg-gray-100">
            <ToastContainer/>
            <PatientSidebar patient={patient} />
            <div className="flex-1 overflow-auto">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Prescriptions</h1>
                    </div>

                    {prescriptions.length === 0 ? (
                        <div className="text-center py-12">
                            <FileText className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                                No Prescriptions
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                You don't have any prescriptions yet.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {prescriptions.map((prescription) => (
                                <Prescription
                                    key={prescription._id}
                                    prescription={prescription}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PrescriptionPage;