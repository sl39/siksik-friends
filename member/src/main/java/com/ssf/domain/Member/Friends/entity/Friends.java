package com.ssf.domain.Member.Friends.entity;

import com.ssf.domain.Member.Member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Entity
@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"toUserId", "fromUserId"}

                )
        }
)
public class Friends {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long toUserId;

    @JoinColumn(name = "fromUserId")
    @ManyToOne(fetch = FetchType.LAZY)
    private Member fromUser;

    @Column
    private boolean activated = false;

    public Friends(Long toUserId,Member fromUser, boolean activated){
        this.toUserId = toUserId;
        this.fromUser = fromUser;
        this.activated = activated;

    }
}
