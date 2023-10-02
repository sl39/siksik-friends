package com.ssf.auth.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssf.auth.domain.user.repository.UserRepository;
import com.ssf.auth.global.jwt.service.JwtService;
import com.ssf.auth.global.signin.filter.CustomJsonUsernamePasswordAuthenticationFilter;
import com.ssf.auth.global.signin.handler.SignInFailureHandler;
import com.ssf.auth.global.signin.handler.SignInSuccessHandler;
import com.ssf.auth.global.signin.service.SignInService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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

    private final ObjectMapper objectMapper;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final SignInService signInService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .cors(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .sessionManagement(sessionManagement -> sessionManagement
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry -> authorizationManagerRequestMatcherRegistry
                        .requestMatchers("", "/**").permitAll()
                        .anyRequest().authenticated())
                .addFilterAfter(customJsonUsernamePasswordAuthenticationFilter(), LogoutFilter.class)
                .build();
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
        return new SignInSuccessHandler(jwtService, userRepository);
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
}
