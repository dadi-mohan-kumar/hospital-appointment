package com.example.hospital.service;

import com.example.hospital.entity.Patient;
import com.example.hospital.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    // Get all patients
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // Get patient by ID
    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    // Get patient by user ID
    public Optional<Patient> getPatientByUserId(Long userId) {
        return patientRepository.findByUserId(userId);
    }

    // Get patients by blood group
    public List<Patient> getPatientsByBloodGroup(String bloodGroup) {
        return patientRepository.findByBloodGroup(bloodGroup);
    }

    // Update patient
    public Patient updatePatient(Long id, Patient patientDetails) {
        Optional<Patient> patientOpt = patientRepository.findById(id);
        
        if (patientOpt.isPresent()) {
            Patient patient = patientOpt.get();
            patient.setAge(patientDetails.getAge());
            patient.setGender(patientDetails.getGender());
            patient.setAddress(patientDetails.getAddress());
            patient.setBloodGroup(patientDetails.getBloodGroup());
            return patientRepository.save(patient);
        }
        
        return null;
    }

    // Delete patient
    public boolean deletePatient(Long id) {
        if (patientRepository.existsById(id)) {
            patientRepository.deleteById(id);
            return true;
        }
        return false;
    }
}