package com.example.demo.domain.service;

import com.example.demo.domain.Member;
import com.example.demo.domain.MemberResponseDTO;
import com.example.demo.domain.MemberSaveRequestDTO;

import java.util.List;
import java.util.Optional;

public interface MemberService {
    Long join(MemberSaveRequestDTO memberSaveRequestDTO);

    List<MemberResponseDTO> findMembers();


}
