package com.ssf.domain.Member.Friends.service;

import com.ssf.domain.Member.Friends.entity.Friends;
import com.ssf.domain.Member.Friends.repository.FriendsRepository;
import com.ssf.domain.Member.Member.entity.Member;
import com.ssf.domain.Member.Member.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FriendsService {
    private final FriendsRepository friendsRepository;
    private final MemberRepository memberRepository;

    public FriendsService(FriendsRepository friendsRepository, MemberRepository memberRepository) {
        this.friendsRepository = friendsRepository;
        this.memberRepository = memberRepository;
    }

    private boolean findById(Long fromUserId,Long toUserId){
        Optional<Friends> friends = friendsRepository.findByFromUserAndToUserId(fromUserId, toUserId);
        if (friends.isEmpty()){
            return true;
        }
        return false;
    }

    public Friends save(Long fromUserId, Long toUserId){
        if(findById(fromUserId,toUserId)){
            if(findById(toUserId,fromUserId)){
                Optional<Member> member = memberRepository.findById(fromUserId);
                return Friends.builder()
                        .fromUser(member)
                        .toUserId(toUserId)
                        .build();
            }
        }
    }


}
