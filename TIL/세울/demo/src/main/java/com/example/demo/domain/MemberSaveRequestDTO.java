package com.example.demo.domain;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberSaveRequestDTO {

    @NotBlank(message="이메일을 입력해주세요.")
    @Email(message = "올바른 이메일 주소를 입력해주세요.")
    private String email;

    @NotBlank(message = "닉네임을 입력해주세요.")
    @Size(min = 2, max = 15, message = "닉네임은 2 ~ 15자 사이로 입력해주세요")
    private String username;

    @NotBlank(message = "비밀번호를 입력해주세요.")
    private String password;
}