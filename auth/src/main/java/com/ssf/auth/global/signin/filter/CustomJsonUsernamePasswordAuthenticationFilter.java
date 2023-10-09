package com.ssf.auth.global.signin.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssf.auth.global.signin.domain.SignInConstants;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

public class CustomJsonUsernamePasswordAuthenticationFilter extends AbstractAuthenticationProcessingFilter {
    private static final AntPathRequestMatcher DEFAULT_SIGN_IN_PATH_REQUEST_MATCHER =
            new AntPathRequestMatcher(SignInConstants.DEFAULT_SIGN_IN_REQUEST_URL.getValue(),
                    SignInConstants.HTTP_METHOD.getValue());

    private final ObjectMapper objectMapper;

    public CustomJsonUsernamePasswordAuthenticationFilter(ObjectMapper objectMapper) {
        super(DEFAULT_SIGN_IN_PATH_REQUEST_MATCHER);
        this.objectMapper = objectMapper;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,HttpServletResponse response)
            throws AuthenticationException, IOException {

        if (request.getContentType() == null
                || !request.getContentType().equals(SignInConstants.CONTENT_TYPE.getValue())) {

            throw new AuthenticationServiceException("Authentication Content-Type not supported: "
                    + request.getContentType());
        }

        String messageBody = StreamUtils.copyToString(request.getInputStream(), StandardCharsets.UTF_8);
        Map<String, String> usernamePasswordMap = objectMapper.readValue(messageBody, Map.class);

        String username = usernamePasswordMap.get(SignInConstants.USERNAME_KEY.getValue());
        String password = usernamePasswordMap.get(SignInConstants.PASSWORD_KEY.getValue());

        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);

        return this.getAuthenticationManager().authenticate(authRequest);
    }
}
