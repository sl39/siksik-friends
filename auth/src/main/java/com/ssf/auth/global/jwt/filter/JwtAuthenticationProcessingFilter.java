package com.ssf.auth.global.jwt.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ssf.auth.domain.user.domain.User;
import com.ssf.auth.domain.user.repository.UserRepository;
import com.ssf.auth.global.jwt.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationProcessingFilter extends OncePerRequestFilter {

    private static final String SIGN_UP_URL = "/api/auth/sign-up";
    private static final String SIGN_IN_URL = "/api/auth/sign-in";
    private static final String EMAIL_CHECK_URL = "/api/auth/email";
    private static final String NICKNAME_CHECK_URL = "/api/auth/nickname";

    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Value("${jwt.access.header}")
    private String accessHeader;

    @Value("${jwt.secretKey}")
    private String secretKey;

    private final GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
        if (request.getRequestURI().equals(SIGN_UP_URL) || request.getRequestURI().equals(SIGN_IN_URL) || request.getRequestURI().equals(EMAIL_CHECK_URL) || request.getRequestURI().equals(NICKNAME_CHECK_URL)) {
            filterChain.doFilter(request, response);
            return;
        }

        System.out.println(JWT.require(Algorithm.HMAC512(secretKey))
                .build()
                .verify(request.getHeader(accessHeader).replace("Bearer ", ""))
                .getClaim("id").toString());

        String accessToken =  jwtService.extractAccessToken(request).orElseThrow();
        String id = jwtService.extractId(accessToken).orElseThrow();

//        String refreshToken = jwtService.extractRefreshToken(request)
//                .filter(jwtService::isTokenValid)
//                .orElse(null);

        String refreshToken = jwtService.extractRefreshToken(accessToken);

        if (!jwtService.isTokenValid(refreshToken)) {
            refreshToken = null;
        }

        if (refreshToken != null) {
            System.out.println("리프레시 토큰 있다!");
            checkRefreshTokenAndReIssueAccessToken(response, refreshToken);
            return;
        }

        checkAccessTokenAndAuthentication(request, response, filterChain);
    }

    public void checkRefreshTokenAndReIssueAccessToken(HttpServletResponse response, String refreshToken) {
        userRepository.findByRefreshToken(refreshToken)
                .ifPresent(user -> {
//                    String reIssueRefreshToken = reIssueRefreshToken(user);
//                    jwtService.sendAccessAndRefreshToken(response, jwtService.createAccessToken(user.getId()), reIssueRefreshToken);
                    jwtService.sendAccessToken(response, jwtService.createAccessToken(user.getId()));
                });
    }

    private String reIssueRefreshToken(User user) {
        String reIssueRefreshToken = jwtService.createRefreshToken();
        user.updateRefreshToken(reIssueRefreshToken);
        userRepository.saveAndFlush(user);
        return reIssueRefreshToken;
    }

    public void checkAccessTokenAndAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        jwtService.extractAccessToken(request)
                .filter(jwtService::isTokenValid).flatMap(jwtService::extractId).flatMap(id -> userRepository.findById(Long.valueOf(id))).ifPresent(this::saveAuthentication);

        filterChain.doFilter(request, response);
    }

    public void saveAuthentication(User user) {
        String password = user.getPassword();

        UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(password)
                .roles(user.getRole().name())
                .build();

        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, authoritiesMapper.mapAuthorities(userDetails.getAuthorities()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
