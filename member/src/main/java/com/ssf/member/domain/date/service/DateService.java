package com.ssf.member.domain.date.service;

import java.util.Map;

public interface DateService {

    Map<String, String> findDate();
    void changeDate(Map<String, String> date);
}
