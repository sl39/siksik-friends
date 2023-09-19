package com.ssf.member.entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.ws.rs.POST;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

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
