package com.example.demo.domain;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class MemberDetailDTO {
    private String email;
    private String password;


}
