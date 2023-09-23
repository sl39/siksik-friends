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

    @Column
    private Long fromUserId;

    @Column
    private boolean activated = false;

    public Friends(Long toUserId,Long fromUserId, boolean activated){
        this.toUserId = toUserId;
        this.fromUserId = fromUserId;
        this.activated = activated;

    }
}
