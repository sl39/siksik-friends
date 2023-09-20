package com.ssf.domain.Member.Friends.service;

import com.ssf.domain.Member.Friends.entity.Friends;
import com.ssf.domain.Member.Friends.repository.FriendsRepository;
import com.ssf.domain.Member.Member.entity.Member;
import com.ssf.domain.Member.Member.entity.dto.MemberFriendDTO;
import com.ssf.domain.Member.Member.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FriendsService {
    private final FriendsRepository friendsRepository;
    private final MemberRepository memberRepository;

    public FriendsService(FriendsRepository friendsRepository, MemberRepository memberRepository) {
        this.friendsRepository = friendsRepository;
        this.memberRepository = memberRepository;
    }

    public Friends requestFriendService(Long fromUserId, Long toUserId){
        Optional<Friends> friends = friendsRepository.findByFromUserIdAndToUserId(fromUserId, toUserId)
                .ifPresentOrElse(
                        m -> {throw new IllegalArgumentException("해당 이메일이 이미 존재합니다");},
                        () ->{
                            Friends friends1 =  Friends.builder()
                                    .fromUserId(fromUserId)
                                    .toUserId(toUserId)
                                    .build();
                        }
                );

    }



    public List<MemberFriendDTO> getFriends(Long userId){
        List<Friends> friendsList = friendsRepository.findByActivatedAndFromUserIdOrActivatedAndToUserId(true,userId,true, userId);
        Set<Long> friendIds = new HashSet<>();
        for (Friends friends1 : friendsList){
            friendIds.add(friends1.getFromUserId());
            friendIds.add(friends1.getToUserId());
        }
        friendIds.remove(userId);
        List<Member> members = memberRepository.findByIdIn(friendIds);

        List<MemberFriendDTO> friends = new ArrayList<>();
        for(Member member : members){
            MemberFriendDTO memberFriendDTO = new MemberFriendDTO(member);
            friends.add(memberFriendDTO);
        }
        return friends;
    }

    public Optional<Friends> delete(Long fromUserId, Long toUserId){
        memberRepository.findById(fromUserId).orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다"));
        memberRepository.findById(toUserId).orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다"));
        Optional<Friends> friends1 = friendsRepository.findByFromUserIdAndToUserIdAndActivated(fromUserId, toUserId, true);
        Optional<Friends> friends2 = friendsRepository.findByFromUserIdAndToUserIdAndActivated(toUserId,fromUserId, true);

        if (friends1.isEmpty()){
            if(friends2.isEmpty()){
                throw new IllegalArgumentException("친구가 아닙니다");
            }
            return friends2;
        }
        return friends1;
    }

}
