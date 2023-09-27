package com.ssf.auth.domain.refreshtoken;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.TimeToLive;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class RefreshToken {

    @Id
    private String id;
    private String refreshToken;

    @TimeToLive
    @Builder.Default
    private long refreshTokenExpirationPeriod = 30L;
}
