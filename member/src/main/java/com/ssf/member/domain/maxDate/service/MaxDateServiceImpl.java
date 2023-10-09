package com.ssf.member.domain.maxDate.service;

import com.ssf.member.domain.maxDate.MaxDate;
import com.ssf.member.domain.maxDate.repository.MaxDateRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class MaxDateServiceImpl implements MaxDateService {

    private final MaxDateRepository maxDateRepository;

    @Override
    public String findMaxDate() {
        return maxDateRepository.findMaxDateById(1L).get().getDate();
    }

    @Override
    public void changeMaxDate(String date) {
        MaxDate maxDate = maxDateRepository.findMaxDateById(1L).get();
        maxDate.changeDate(date);
    }
}
