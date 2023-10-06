package com.OAuth.spring.member.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.validation.beanvalidation.SpringValidatorAdapter;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String useremail;

    @Column
    private String username;

    @Column
    private String password;

    @Column
    private String role;

    @CreatedDate
    private LocalDateTime createDate;
}
