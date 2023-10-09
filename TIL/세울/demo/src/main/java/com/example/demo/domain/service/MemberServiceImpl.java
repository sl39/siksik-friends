package com.example.demo.domain.service;

import com.example.demo.domain.Member;
import com.example.demo.domain.MemberResponseDTO;
import com.example.demo.domain.MemberSaveRequestDTO;
import com.example.demo.domain.repository.MemberRepsitory;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.ListResourceBundle;
import java.util.Optional;

@Service            // 내가 서비스다
@Transactional
@RequiredArgsConstructor    // 밑에 MemberRepository의 생성자를 쓰지 않기 위해서
public class MemberServiceImpl implements MemberService  {
    private final MemberRepsitory memberRepsitory;

    @Override
    public Long join(MemberSaveRequestDTO memberSaveRequestDTO){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        Member member = Member.builder()
                .email(memberSaveRequestDTO.getEmail())
                .username(memberSaveRequestDTO.getUsername())
                .password(passwordEncoder.encode(memberSaveRequestDTO.getPassword1()))
                .build();
        validateDuplicateMember(member);
        return memberRepsitory.save(member).getId();
    }

    @Override
    public List<MemberResponseDTO> findMembers(){
        List<Member> all = memberRepsitory.findAll();
        List<MemberResponseDTO> members = new ArrayList<>();
        for(Member member: all){
            MemberResponseDTO build = MemberResponseDTO.builder()
                    .member(member)
                    .build();
            members.add(build);
        }
        return members;
    }

    private void validateDuplicateMember(Member member){
        Optional<Member> findEmail = memberRepsitory.findByEmail(member.getEmail());
        Optional<Member> findUsername = memberRepsitory.findByUsername(member.getUsername());
        System.out.println((findEmail));
        if(!findEmail.isEmpty()){
            throw new IllegalStateException("이미 가입된 이메일 입니다");
        }
        if(!findUsername.isEmpty()){
            throw new IllegalStateException("이미 존재하는 유저이름입니다.");
        }
    }

}
