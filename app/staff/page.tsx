'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Pusher from 'pusher-js';

type PatientStatus = 'filling' | 'submitted' | 'inactive';

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  preferredLanguage: string;
  nationality: string;
  emergencyContact: string;
  religion: string;
  status: PatientStatus;
}

export default function StaffPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  useEffect(() => {
    const savedPatients = localStorage.getItem('submittedPatients');
    if (savedPatients) {
      try {
        const parsed = JSON.parse(savedPatients);
        setPatients(parsed);
      } catch (error) {
        console.error('Error loading saved patients:', error);
      }
    }
  }, []);

  useEffect(() => {
    const submittedPatients = patients.filter(p => p.status === 'submitted');
    if (submittedPatients.length > 0) {
      localStorage.setItem('submittedPatients', JSON.stringify(submittedPatients));
    }
  }, [patients]);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe('hospital-system');

    channel.bind('patient-input', function (data: { patientData: Patient; status: string }) {
      console.log('Received patient update:', data);
      
      setPatients((prevPatients) => {
        const existingPatientIndex = prevPatients.findIndex(
          (p) => p.id === data.patientData.id
        );

        if (existingPatientIndex > -1) {
          const updatedPatients = [...prevPatients];
          updatedPatients[existingPatientIndex] = data.patientData;
          return updatedPatients;
        } else {
          return [...prevPatients, data.patientData];
        }
      });
    });

    return () => {
      channel.unbind_all();  
      pusher.unsubscribe('hospital-system');  
      pusher.disconnect();  
    };
  }, []); 

  const getStatusColor = (status: PatientStatus) => {
    switch (status) {
      case 'submitted':
        return 'bg-green-100 text-green-800';
      case 'filling':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Staff Dashboard
              </h1>
              <p className="text-gray-600">
                Monitor patient registrations in real-time
              </p>
            </div>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 text-center"
            >
              Back to Form
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600 mb-1">Total Patients</p>
            <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600 mb-1">Submitted</p>
            <p className="text-2xl font-bold text-green-600">
              {patients.filter(p => p.status === 'submitted').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600 mb-1">Filling In</p>
            <p className="text-2xl font-bold text-yellow-600">
              {patients.filter(p => p.status === 'filling').length}
            </p>
          </div>
        </div>
          <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Patient List
          </h2>

          {patients.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No patients found
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {patients.map((patient) => (
                <div
                  key={patient.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="mb-3">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(
                        patient.status
                      )}`}
                    >
                      {patient.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {patient.firstName} {patient.lastName}
                    </h3>
                    
                    <div className="text-sm text-gray-700 space-y-1.5">
                      <div className="grid grid-cols-2 gap-x-2">
                        <p className="text-gray-600">Date of Birth:</p>
                        <p className="font-medium">{patient.dateOfBirth}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-x-2">
                        <p className="text-gray-600">Gender:</p>
                        <p className="font-medium">{patient.gender}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-x-2">
                        <p className="text-gray-600">Email:</p>
                        <p className="font-medium break-all">{patient.email}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-x-2">
                        <p className="text-gray-600">Phone:</p>
                        <p className="font-medium">{patient.phone}</p>
                      </div>
                      
                      <div className="pt-1">
                        <p className="text-gray-600 mb-1">Address:</p>
                        <p className="font-medium">{patient.address}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-x-2">
                        <p className="text-gray-600">Language:</p>
                        <p className="font-medium">{patient.preferredLanguage}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-x-2">
                        <p className="text-gray-600">Nationality:</p>
                        <p className="font-medium">{patient.nationality}</p>
                      </div>
                      
                      <div className="pt-1">
                        <p className="text-gray-600 mb-1">Emergency Contact:</p>
                        <p className="font-medium">{patient.emergencyContact}</p>
                      </div>
                      
                      {patient.religion && (
                        <div className="grid grid-cols-2 gap-x-2">
                          <p className="text-gray-600">Religion:</p>
                          <p className="font-medium">{patient.religion}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
