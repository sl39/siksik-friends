package com.ssf.member.domain.minDate.service;

import com.ssf.member.domain.minDate.MinDate;
import com.ssf.member.domain.minDate.repository.MinDateRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class MinDateServiceImpl implements MinDateService {

    private final MinDateRepository minDateRepository;

    @Override
    public String findMinDate() {
        return minDateRepository.findMinDateById(1L).get().getDate();
    }

    @Override
    public void changeMinDate(String date) {
        MinDate minDate = minDateRepository.findMinDateById(1L).get();
        minDate.changeDate(date);
    }
}
