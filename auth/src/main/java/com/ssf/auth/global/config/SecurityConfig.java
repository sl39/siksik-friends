package com.ssf.auth.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssf.auth.domain.user.repository.UserRepository;
import com.ssf.auth.global.jwt.filter.JwtAuthenticationProcessingFilter;
import com.ssf.auth.global.jwt.service.JwtService;
import com.ssf.auth.global.oauth2.handler.OAuth2SignInFailureHandler;
import com.ssf.auth.global.oauth2.handler.OAuth2SignInSuccessHandler;
import com.ssf.auth.global.oauth2.service.CustomOAuth2UserService;
import com.ssf.auth.global.signin.filter.CustomJsonUsernamePasswordAuthenticationFilter;
import com.ssf.auth.global.signin.handler.SignInFailureHandler;
import com.ssf.auth.global.signin.handler.SignInSuccessHandler;
import com.ssf.auth.global.signin.service.SignInService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final SignInService signInService;
    private final RedisTemplate redisTemplate;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;
    private final OAuth2SignInSuccessHandler oAth2SignInSuccessHandler;
    private final OAuth2SignInFailureHandler oAuth2SignInFailureHandler;
    private final CustomOAuth2UserService customOAuth2UserService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .sessionManagement(sessionManagement -> sessionManagement
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry -> authorizationManagerRequestMatcherRegistry
                        .requestMatchers("", "/", "index.html", "/api/auth/sign-up", "/api/auth/email", "/api/auth/nickname").permitAll()
//                        .requestMatchers("", "/**").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/api/auth/sign-in").permitAll()
                        .anyRequest().authenticated());
//                .oauth2Login(oAuth2LoginConfigurer -> oAuth2LoginConfigurer
//                        .userInfoEndpoint(userInfoEndpointConfig -> userInfoEndpointConfig
//                                .userService(customOAuth2UserService))
//                        .successHandler(oAth2SignInSuccessHandler)
//                        .failureHandler(oAuth2SignInFailureHandler)
//                        .redirectionEndpoint(redirectionEndpointConfig -> redirectionEndpointConfig
//                                .baseUri("/api/auth/sign-in/oauth2/code/"))
//                );
//                .oauth2Login(Customizer.withDefaults());

        http.addFilterAfter(customJsonUsernamePasswordAuthenticationFilter(), LogoutFilter.class);
        http.addFilterBefore(jwtAuthenticationProcessingFilter(), CustomJsonUsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(signInService);
        return new ProviderManager(provider);
    }

    @Bean
    public SignInSuccessHandler signInSuccessHandler() {
        return new SignInSuccessHandler(redisTemplate, jwtService, userRepository);
    }

    @Bean
    public SignInFailureHandler signInFailureHandler() {
        return new SignInFailureHandler();
    }

    @Bean
    public CustomJsonUsernamePasswordAuthenticationFilter customJsonUsernamePasswordAuthenticationFilter() {
        CustomJsonUsernamePasswordAuthenticationFilter customJsonUsernamePasswordSignInFilter = new CustomJsonUsernamePasswordAuthenticationFilter(objectMapper);
        customJsonUsernamePasswordSignInFilter.setAuthenticationManager(authenticationManager());
        customJsonUsernamePasswordSignInFilter.setAuthenticationSuccessHandler(signInSuccessHandler());
        customJsonUsernamePasswordSignInFilter.setAuthenticationFailureHandler(signInFailureHandler());
        return customJsonUsernamePasswordSignInFilter;
    }

    @Bean
    public JwtAuthenticationProcessingFilter jwtAuthenticationProcessingFilter() {
        return new JwtAuthenticationProcessingFilter(jwtService, userRepository);
    }
}
