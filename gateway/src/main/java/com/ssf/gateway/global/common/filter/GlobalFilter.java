package com.ssf.gateway.global.common.filter;

import com.ssf.gateway.global.common.domain.CommonConstants;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class GlobalFilter extends AbstractGatewayFilterFactory<GlobalFilter.Config> {

    public GlobalFilter() {
        super(Config.class);
    }

    @Data
    public static class Config {}

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            String uri = request.getURI().getPath();

            for (CommonConstants constant : CommonConstants.values()) {
                if (uri.equals(constant.getValue())) {
                    return chain.filter(exchange);
                }
            }

            return chain.filter(exchange);
        });
    }
}
