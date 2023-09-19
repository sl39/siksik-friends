package com.ssf.member.entity;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberUpdateDTO {
    private String nickname;
    private String profile;

    public MemberUpdateDTO(MemberUpdateDTO memberUpdateDTO) {
        this.nickname = memberUpdateDTO.getNickname();
        this.profile = memberUpdateDTO.getNickname();
    }




}
