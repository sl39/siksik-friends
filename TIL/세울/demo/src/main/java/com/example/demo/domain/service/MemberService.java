package com.example.demo.domain.service;

import com.example.demo.domain.MemberSaveRequestDTO;

public interface MemberService {
    Long join(MemberSaveRequestDTO memberSaveRequestDTO);
}
