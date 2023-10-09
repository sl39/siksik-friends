package com.ssf.member.domain.date.service;

import com.ssf.member.domain.date.Date;
import com.ssf.member.domain.date.repository.DateRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class DateServiceImpl implements DateService {

    private final DateRepository dateRepository;

    @Override
    public Map<String, String> findDate() {
        Date date = dateRepository.findDateById(1L).get();

        Map<String, String> map = new HashMap<>();
        map.put("minDate", date.getMinDate());
        map.put("maxDate", date.getMaxDate());

        return map;
    }

    @Override
    public void changeDate(Map<String, String> request) {
        Date date = dateRepository.findDateById(1L).get();

        if (StringUtils.hasText(request.get("minDate"))) {
            date.changeMinDate(request.get("minDate"));
        }

        if (StringUtils.hasText(request.get("maxDate"))) {
            date.changeMaxDate(request.get("maxDate"));
        }
    }
}
