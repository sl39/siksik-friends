package com.ssf.domain.Member.Member.repository;


import com.ssf.domain.Member.Member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface MemberRepository extends JpaRepository<Member,Long> {
    Optional<Member> findById(final Long id);
    void deleteById(Long id);

    List<Member> findByIdIn(final Set list);


}
