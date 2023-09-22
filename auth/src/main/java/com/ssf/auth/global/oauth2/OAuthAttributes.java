package com.ssf.auth.global.oauth2;

import com.ssf.auth.domain.user.Role;
import com.ssf.auth.domain.user.SocialType;
import com.ssf.auth.domain.user.User;
import com.ssf.auth.global.oauth2.userinfo.KakaoOAuth2UserInfo;
import com.ssf.auth.global.oauth2.userinfo.OAuth2UserInfo;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;
import java.util.UUID;

@Getter
public class OAuthAttributes {

    private OAuth2UserInfo oauth2UserInfo;
    private String nameAttributeKey;

    @Builder
    public OAuthAttributes(String nameAttributeKey, OAuth2UserInfo oauth2UserInfo) {
        this.oauth2UserInfo = oauth2UserInfo;
        this.nameAttributeKey = nameAttributeKey;
    }

    public static OAuthAttributes of(Map<String, Object> attributes, SocialType socialType, String userNameAttributeName) {
        return ofKakao(attributes, userNameAttributeName);
    }

    private static OAuthAttributes ofKakao(Map<String, Object> attributes, String userNameAttributeName) {
        return OAuthAttributes.builder()
                .nameAttributeKey(userNameAttributeName)
                .oauth2UserInfo(new KakaoOAuth2UserInfo(attributes))
                .build();
    }

    public User toEntity(SocialType socialType, OAuth2UserInfo oauth2UserInfo) {
        return User.builder()
                .socialType(socialType)
                .socialId(oauth2UserInfo.getSocialId())
                .email(UUID.randomUUID() + "@socialUser.com")
                .profile(oauth2UserInfo.getProfile())
                .role(Role.GUEST)
                .build();
    }
}
