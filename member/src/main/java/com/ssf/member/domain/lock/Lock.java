package com.ssf.member.domain.lock;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Lock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Builder.Default
    private boolean lock = false;

    public void changeLock() {
        lock = !lock;
    }
}
