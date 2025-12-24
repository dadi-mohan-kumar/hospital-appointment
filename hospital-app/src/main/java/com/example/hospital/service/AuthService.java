package com.example.hospital.service;

import com.example.hospital.entity.User;
import com.example.hospital.entity.Doctor;
import com.example.hospital.entity.Patient;
import com.example.hospital.entity.Role;
import com.example.hospital.repository.UserRepository;
import com.example.hospital.repository.DoctorRepository;
import com.example.hospital.repository.PatientRepository;
import com.example.hospital.request.LoginRequest;
import com.example.hospital.request.RegisterRequest;
import com.example.hospital.request.DoctorRegisterRequest;
import com.example.hospital.response.LoginResponse;
import com.example.hospital.response.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    // Login
    public LoginResponse login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmailAndPassword(request.getEmail(), request.getPassword());
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return new LoginResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                "Login successful",
                true
            );
        }
        
        return new LoginResponse(null, null, null, null, "Invalid credentials", false);
    }

    // Register Patient
    public ApiResponse registerPatient(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return new ApiResponse("Email already exists", false);
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setPhone(request.getPhone());
        user.setRole(Role.PATIENT);

        User savedUser = userRepository.save(user);

        Patient patient = new Patient();
        patient.setUser(savedUser);
        patientRepository.save(patient);

        return new ApiResponse("Patient registered successfully", true, savedUser);
    }

    // Register Doctor
    public ApiResponse registerDoctor(DoctorRegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return new ApiResponse("Email already exists", false);
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setPhone(request.getPhone());
        user.setRole(Role.DOCTOR);

        User savedUser = userRepository.save(user);

        Doctor doctor = new Doctor();
        doctor.setUser(savedUser);
        doctor.setSpecialization(request.getSpecialization());
        doctor.setQualification(request.getQualification());
        doctor.setExperience(request.getExperience());
        doctor.setAvailableSlots(request.getAvailableSlots());
        doctorRepository.save(doctor);

        return new ApiResponse("Doctor registered successfully", true, savedUser);
    }

    // Register Admin
    public ApiResponse registerAdmin(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return new ApiResponse("Email already exists", false);
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setPhone(request.getPhone());
        user.setRole(Role.ADMIN);

        User savedUser = userRepository.save(user);

        return new ApiResponse("Admin registered successfully", true, savedUser);
    }
}