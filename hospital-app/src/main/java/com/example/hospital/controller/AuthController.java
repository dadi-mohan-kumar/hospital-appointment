package com.example.hospital.controller;

import com.example.hospital.request.LoginRequest;
import com.example.hospital.request.RegisterRequest;
import com.example.hospital.request.DoctorRegisterRequest;
import com.example.hospital.response.LoginResponse;
import com.example.hospital.response.ApiResponse;
import com.example.hospital.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Login
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    // Register Patient
    @PostMapping("/register/patient")
    public ResponseEntity<ApiResponse> registerPatient(@RequestBody RegisterRequest request) {
        ApiResponse response = authService.registerPatient(request);
        return ResponseEntity.ok(response);
    }

    // Register Doctor
    @PostMapping("/register/doctor")
    public ResponseEntity<ApiResponse> registerDoctor(@RequestBody DoctorRegisterRequest request) {
        ApiResponse response = authService.registerDoctor(request);
        return ResponseEntity.ok(response);
    }

    // Register Admin
    @PostMapping("/register/admin")
    public ResponseEntity<ApiResponse> registerAdmin(@RequestBody RegisterRequest request) {
        ApiResponse response = authService.registerAdmin(request);
        return ResponseEntity.ok(response);
    }
}