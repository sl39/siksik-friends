package com.ssf.gateway.global.common.filter;

import com.ssf.gateway.global.common.domain.CommonConstants;
import com.ssf.gateway.global.jwt.service.JwtService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;

import static com.ssf.gateway.global.common.domain.Message.*;

@Component
@Slf4j
public class GlobalFilter extends AbstractGatewayFilterFactory<GlobalFilter.Config> {

    @Autowired
    private JwtService jwtService;

    public GlobalFilter() {
        super(Config.class);
    }

    public static class Config {}

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            ServerHttpResponse response = exchange.getResponse();
            String uri = request.getURI().getPath();

            for (CommonConstants constant : CommonConstants.values()) {
                if (uri.startsWith(constant.getValue())) {
                    log.info("헤더가 필요없는 요청");
                    return chain.filter(exchange);
                }
            }

            HttpHeaders headers = request.getHeaders();

            if (!jwtService.hasAccessHeader(headers)) {
                log.info("토큰이 없음");
                return handleForbidden(response, NO_TOKEN.getValue());
            }

            String token = jwtService.extractToken(headers);

            if (!jwtService.hasAuthType(token)) {
                log.info("방식이 틀린 토큰");
                return handleForbidden(response, INVALID_AUTH_TYPE.getValue());
            }

            String accessToken = jwtService.extractAccessToken(token);

            if (jwtService.hasKeyBlackList(accessToken)) {
                log.info("블랙리스트인 토큰");
                return handleForbidden(response, INVALID_TOKEN.getValue());
            }

            if (uri.equals(CommonConstants.RE_ISSUANCE_ACCESS_TOKEN_URL.getValue())) {
                String id = jwtService.extractId(accessToken);
                String refreshToken = jwtService.getRefreshToken(id);

                if (jwtService.isTokenValid(refreshToken)) {
                    log.info("유효한 리프래쉬 토큰 요청");
                    return chain.filter(exchange);
                }

                log.info("유효하지 않는 리프래쉬 토큰 요청");
                return handleForbidden(response, SIGN_IN_REQUIRED.getValue());
            }

            if (jwtService.isTokenValid(accessToken)) {
                log.info("유효한 액세스 토큰 요청");
                return chain.filter(exchange);
            }

            log.info("유효하지 않는 액세스 토큰 요청");
            return handleUnAuthorized(response, EXPIRED_TOKEN.getValue());
        });
    }

    private Mono<Void> handleUnAuthorized(ServerHttpResponse response, String message) {
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        byte[] bytes = message.getBytes(StandardCharsets.UTF_8);
        DataBuffer buffer = response.bufferFactory().wrap(bytes);
        return response.writeWith(Flux.just(buffer));
    }

    private Mono<Void> handleForbidden(ServerHttpResponse response, String message) {
        response.setStatusCode(HttpStatus.FORBIDDEN);
        byte[] bytes = message.getBytes(StandardCharsets.UTF_8);
        DataBuffer buffer = response.bufferFactory().wrap(bytes);
        return response.writeWith(Flux.just(buffer));
    }
}
