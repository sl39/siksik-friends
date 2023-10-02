package com.ssf.gateway.global.common.filter;

import com.ssf.gateway.global.common.domain.CommonConstants;
import com.ssf.gateway.global.jwt.service.JwtService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

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
                if (uri.equals(constant.getValue())) {
                    log.info("인증이 필요없는 서비스");
                    return chain.filter(exchange);
                }
            }

            HttpHeaders headers = request.getHeaders();

            if (!jwtService.hasAccessHeader(headers)) {
                log.info("해더가 없음");
                return handleForbidden(response);
            }

            String token = jwtService.extractToken(headers);

            if (!jwtService.hasAuthType(token)) {
                log.info("액세스 토큰 인증 타입 오류");
                return handleForbidden(response);
            }

            String accessToken = jwtService.extractAccessToken(token);

            if (jwtService.hasKeyBlackList(accessToken)) {
                log.info("블랙리스트 등록 토큰");
                return handleForbidden(response);
            }

            if (uri.equals(CommonConstants.RE_ISSUANCE_ACCESS_TOKEN_URL.getValue())
                    || jwtService.isTokenValid(accessToken)) {

                log.info("유효하거나 액세스 토큰 재발급");
                return chain.filter(exchange);
            }

            log.info("액세스 토큰 유효기간 지남");
            return handleUnAuthorized(response);
        });
    }

    private Mono<Void> handleUnAuthorized(ServerHttpResponse response) {
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        return response.setComplete();
    }

    private Mono<Void> handleForbidden(ServerHttpResponse response) {
        response.setStatusCode(HttpStatus.FORBIDDEN);
        return response.setComplete();
    }
}
