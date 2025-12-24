package com.example.hospital.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "patients")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer age;
    
    private String gender;
    
    private String address;
    
    private String bloodGroup;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

  
    public Patient() {
    }

    public Patient(Long id, Integer age, String gender, String address, String bloodGroup, User user) {
        this.id = id;
        this.age = age;
        this.gender = gender;
        this.address = address;
        this.bloodGroup = bloodGroup;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}