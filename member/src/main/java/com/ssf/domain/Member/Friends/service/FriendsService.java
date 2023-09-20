package com.ssf.domain.Member.Friends.service;

import com.ssf.domain.Member.Friends.entity.Friends;
import com.ssf.domain.Member.Friends.repository.FriendsRepository;
import com.ssf.domain.Member.Member.entity.Member;
import com.ssf.domain.Member.Member.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;
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
        Optional<Friends> friends = friendsRepository.findByFromUserIdAndToUserId(fromUserId, toUserId);
        if (friends.isEmpty()){
            return true;
        }
        return false;
    }

    public Friends save(Long fromUserId, Long toUserId){
        if(findById(fromUserId,toUserId)){
            if(findById(toUserId,fromUserId)){
                return Friends.builder()
                        .fromUserId(fromUserId)
                        .toUserId(toUserId)
                        .activated(false)
                        .build();
            }
            Optional<Friends> friends = friendsRepository.findByFromUserIdAndToUserId(toUserId,fromUserId);
            Friends setFriends = Friends.builder()
                    .id(friends.get().getId())
                    .fromUserId(toUserId)
                    .toUserId(fromUserId)
                    .activated(true)
                    .build();
            return setFriends;
        }
        else{
            if(findById(toUserId,fromUserId)){
                throw new IllegalArgumentException("이미 친구요청을 하셨습니다");
            }
            throw new IllegalArgumentException("이미 친구 입니다");
                        
        }
    }

    public List<Friends> getFriends(Long userId){
        List<Friends> friends = friendsRepository.findByActivatedAndFromUserIdOrActivatedAndToUserId(true,userId,true, userId);

        return friends;
    }




}
