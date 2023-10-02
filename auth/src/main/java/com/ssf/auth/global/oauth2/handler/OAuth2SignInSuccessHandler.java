package com.ssf.auth.global.oauth2.handler;

import com.ssf.auth.domain.user.domain.Role;
import com.ssf.auth.domain.user.repository.UserRepository;
import com.ssf.auth.global.jwt.service.JwtService;
import com.ssf.auth.global.oauth2.CustomOAuth2User;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SignInSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("OAuth2 SignIn 성공!");

        try {
            CustomOAuth2User customOAuth2User = (CustomOAuth2User) authentication.getPrincipal();

            if (customOAuth2User.getRole() == Role.GUEST) {
                String accessToken = jwtService.createAccessToken(customOAuth2User.getId());
                response.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);
                response.sendRedirect("auth/oauth2/sign-up");

//                jwtService.sendAccessAndRefreshToken(response, accessToken, null);
                jwtService.sendAccessToken(response, accessToken);

            } else {
                signInSuccess(response, customOAuth2User);
            }

        } catch (Exception e) {
            throw e;
        }
    }

    private void signInSuccess(HttpServletResponse response, CustomOAuth2User customOAuth2User) throws IOException {
        String accessToken = jwtService.createAccessToken(customOAuth2User.getId());
        String refreshToken = jwtService.createRefreshToken();

        response.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);
//        response.addHeader(jwtService.getRefreshHeader(), "Bearer " + refreshToken);

//        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);
        jwtService.sendAccessToken(response, accessToken);
        jwtService.updateRefreshToken(customOAuth2User.getId(), refreshToken);
    }
}
