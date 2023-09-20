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
    
    // 친구 요청
    public Friends requestFriendService(Long fromUserId, Long toUserId){
        checkUserId(fromUserId, toUserId);
        Optional<Friends> friendsOptional = friendsRepository.findByFromUserIdAndToUserId(fromUserId, toUserId);

        if (friendsOptional.isPresent()) {
            throw new IllegalArgumentException("이미 요청을 했습니다");
        }

        Friends friends1 = Friends.builder()
                .fromUserId(fromUserId)
                .toUserId(toUserId)
                .build();

        return friends1;
    }

    //친구 수락
    public Friends acceptFriend(Long fromUserId, Long toUserId){
        checkUserId(fromUserId,toUserId);

        Optional<Friends> friendsOptional = friendsRepository.findByFromUserIdAndToUserId(toUserId,fromUserId);
        friendsOptional.orElseThrow(()->new IllegalArgumentException("들어온 친구 요청이 없습니다"));

        Optional<Friends> friendsOptional1 = friendsRepository.findByFromUserIdAndToUserId(fromUserId, toUserId);
        if (friendsOptional1.isPresent()) {
            throw new IllegalArgumentException("이미 친구 입니다");
        }

        Friends friends1 = Friends.builder()
                .id(friendsOptional.get().getId())
                .fromUserId(fromUserId)
                .toUserId(toUserId)
                .activated(true)
                .build();

        return friends1;
    }



    public void checkUserId(Long fromUserId, Long toUserId){
        memberRepository.findById(fromUserId).orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다"));
        memberRepository.findById(toUserId).orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다"));
    }

    // 친구 목록 조회
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

    // 친구 삭제
    public Optional<Friends> delete(Long fromUserId, Long toUserId){
        checkUserId(fromUserId, toUserId);
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
