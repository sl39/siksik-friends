package com.ssf.domain.Member.Member.entity.dto;


import com.ssf.domain.Member.Member.entity.Member;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberFriendDTO {


    private Long id;
    private String nickname;
    private Long score;
    private String profile;

    public MemberFriendDTO(Member member) {
        this.id = member.getId();
        this.nickname = member.getNickname();
        this.score = member.getScore();
        this.profile = member.getProfile();
    }

}
