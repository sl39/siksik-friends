package com.spring.jpa.global.oauth;

import com.spring.jpa.domain.member.OAuthProvider;
import org.springframework.util.MultiValueMap;

public interface OAuthLoginParams {
    OAuthProvider oAuthProvider();

    MultiValueMap<String, String> makeBody();
}
