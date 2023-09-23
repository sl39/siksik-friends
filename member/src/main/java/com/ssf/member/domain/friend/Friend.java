package com.ssf.member.domain.friend;

import com.ssf.member.domain.user.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "friend_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "to_user_id")
    private User user;

    @Column(name = "from_user_id", nullable = false)
    private Long fromUserId;

    @Column(nullable = false)
    private boolean activated;
}
