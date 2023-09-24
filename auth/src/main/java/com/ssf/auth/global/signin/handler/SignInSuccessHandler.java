package com.ssf.auth.global.signin.handler;

import com.ssf.auth.domain.user.User;
import com.ssf.auth.domain.user.repository.UserRepository;
import com.ssf.auth.global.jwt.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

@RequiredArgsConstructor
@Slf4j
public class SignInSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Value("${jwt.access.expiration}")
    private String accessTokenExpiration;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        Long id = Long.valueOf(extractUsername(authentication));
        String accessToken = jwtService.createAccessToken(id);
        String refreshToken = jwtService.createRefreshToken();
        User target = userRepository.findById(id).get();

//        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);
        jwtService.sendAccessAndRefreshTokenAndId(response, accessToken, refreshToken, target);

        userRepository.findById(id)
                .ifPresent(user -> {
                    user.updateRefreshToken(refreshToken);
                    userRepository.saveAndFlush(user);
                });
    }

    private String extractUsername(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails.getUsername();
    }
}
