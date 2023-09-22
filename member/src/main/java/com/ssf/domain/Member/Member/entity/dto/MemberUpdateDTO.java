package com.ssf.domain.Member.Member.entity.dto;

import com.ssf.domain.Member.Member.enums.Role;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberUpdateDTO {
    private String email;
    private String nickname;
    private String profile;
    private String password;
    private Role role;

    public MemberUpdateDTO(MemberUpdateDTO memberUpdateDTO) {
        this.email = memberUpdateDTO.getEmail();
        this.nickname = memberUpdateDTO.getNickname();
        this.password = memberUpdateDTO.getPassword();
        this.role = Role.MANAGER;
        this.profile = memberUpdateDTO.getProfile();
    }




}
