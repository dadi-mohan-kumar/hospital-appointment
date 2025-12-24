package com.example.hospital.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "doctors")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String specialization;
    
    private String qualification;
    
    private Integer experience;
    
    private String availableSlots;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

   
    public Doctor() {
    }

    public Doctor(Long id, String specialization, String qualification, Integer experience, String availableSlots, User user) {
        this.id = id;
        this.specialization = specialization;
        this.qualification = qualification;
        this.experience = experience;
        this.availableSlots = availableSlots;
        this.user = user;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public Integer getExperience() {
        return experience;
    }

    public void setExperience(Integer experience) {
        this.experience = experience;
    }

    public String getAvailableSlots() {
        return availableSlots;
    }

    public void setAvailableSlots(String availableSlots) {
        this.availableSlots = availableSlots;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}