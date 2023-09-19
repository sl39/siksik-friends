package com.ssf.domain.Member.Member.entity.dto;

import com.ssf.domain.Member.Member.entity.Member;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberDetailDTO {

    private Long id;

    private String email;

    private String nickname;


    private Long score;

    private String profile = "/profile.png";

    public MemberDetailDTO(Member member){
        this.id = member.getId();
        this.email = member.getEmail();
        this.nickname = member.getNickname();
        this.score = member.getScore();
        this.profile = member.getProfile();
        
    }
}
